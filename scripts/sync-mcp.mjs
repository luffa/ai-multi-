#!/usr/bin/env node
/**
 * Sync MCP servers from .mcp.json (Claude Code format) into opencode.json (OpenCode format).
 * .mcp.json is the single source of truth — edit there, then run:
 *   node scripts/sync-mcp.mjs          # write opencode.json mcp.servers
 *   node scripts/sync-mcp.mjs --check  # exit 1 if out of sync (CI-friendly)
 *
 * Conversions:
 *   mcpServers          -> mcp.servers
 *   type "http"/"sse"   -> type "remote"   (stdio/none -> "local")
 *   command + args      -> command: [command, ...args]
 *   ${VAR} / $VAR       -> {env:VAR}
 *   remote + Authorization header -> oauth: false (PAT auth, no OAuth flow)
 * Only the `mcp.servers` section of opencode.json is replaced; other settings are preserved.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');

function envSub(value) {
  if (typeof value === 'string') {
    return value.replace(/\$\{(\w+)\}/g, '{env:$1}').replace(/\$([A-Z_]\w*)/gi, '{env:$1}');
  }
  if (Array.isArray(value)) return value.map(envSub);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, envSub(v)]));
  }
  return value;
}

function convert(def) {
  const type = def.type || (def.url ? 'http' : 'stdio');
  if (type === 'http' || type === 'https' || type === 'sse' || def.url) {
    const out = { type: 'remote', url: def.url };
    if (def.headers) {
      out.headers = envSub(def.headers);
      const hasAuth = Object.keys(def.headers).some((k) => k.toLowerCase() === 'authorization');
      if (hasAuth) out.oauth = false; // header credential — skip OAuth (V2 docs guidance)
    }
    if (def.disabled) out.disabled = true;
    return out;
  }
  const command = [def.command, ...(def.args || [])];
  const out = { type: 'local', command };
  if (def.cwd) out.cwd = def.cwd;
  if (def.env) out.environment = envSub(def.env);
  if (def.disabled) out.disabled = true;
  return out;
}

const mcpRaw = JSON.parse(await readFile(join(root, '.mcp.json'), 'utf8'));
const servers = Object.fromEntries(
  Object.entries(mcpRaw.mcpServers || {}).map(([name, def]) => [name, convert(def)]),
);

if (Object.keys(servers).length === 0) {
  console.error('No mcpServers found in .mcp.json');
  process.exit(1);
}

const ocPath = join(root, 'opencode.json');
const oc = JSON.parse(await readFile(ocPath, 'utf8'));
const next = { ...oc, mcp: { ...oc.mcp, servers } };

const current = JSON.stringify(oc.mcp?.servers ?? {});
const wanted = JSON.stringify(servers);
const inSync = current === wanted;

if (check) {
  if (inSync) {
    console.log('opencode.json mcp.servers is in sync with .mcp.json');
    process.exit(0);
  }
  console.error('out of sync: run `npm run sync:mcp`');
  process.exit(1);
}

if (inSync) {
  console.log('Already in sync:', Object.keys(servers).join(', '));
  process.exit(0);
}

await writeFile(ocPath, `${JSON.stringify(next, null, 2)}\n`);
console.log('Synced from .mcp.json -> opencode.json:', Object.keys(servers).join(', '));
