import type { APIRoute } from 'astro';
import { insertGuestbook, listGuestbook } from '../../lib/db';

export const prerender = false;

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > RATE_LIMIT_MAX;
}

export const GET: APIRoute = async () => {
  try {
    const rows = listGuestbook();
    // #6/D6: never expose email — rows already omit it (guestbook table has no email column).
    const entries = rows.map(({ name, message, created_at }) => ({ name, message, created_at }));
    return new Response(JSON.stringify({ entries }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    const raw = err instanceof Error ? err.message : 'error';
    if (raw.startsWith('NOT_IMPLEMENTED')) {
      return new Response(JSON.stringify({ error: raw }), {
        status: 501,
        headers: { 'content-type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: 'internal error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let clientKey = 'unknown';
  try {
    clientKey = clientAddress ?? 'unknown';
  } catch {
    clientKey = 'unknown';
  }

  if (isRateLimited(clientKey)) {
    return new Response(JSON.stringify({ error: 'rate limited' }), {
      status: 429,
      headers: { 'content-type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const row = insertGuestbook(body);
    return new Response(JSON.stringify(row), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    const raw = err instanceof Error ? err.message : 'error';
    if (raw.startsWith('NOT_IMPLEMENTED')) {
      return new Response(JSON.stringify({ error: raw }), {
        status: 501,
        headers: { 'content-type': 'application/json' },
      });
    }
    const message = raw.startsWith('VALIDATION') ? raw : 'invalid request';
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }
};
