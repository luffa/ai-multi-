# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

# Claude Code — seed คอร์ส (อย่าลบตอน /init)

หลัง Lab 00 ให้ `/init` **merge** — เก็บกฎด้านล่างไว้เสมอ

## สี่เสา (ย่อ)

1. Multi-Agent แยกหน้าที่/ความจำ · 2. Sub-Agent ใช้แล้วทิ้ง · 3. ประสานผ่าน docs/PR · 4. Swarm เพดาน **20 turns**

## Ownership (บังคับ)

| Artifact | Owner |
|---|---|
| UI | Claude · `.claude/agents/frontend.md` |
| API + SQLite | OpenCode · `.opencode/agents/backend.md` |
| docs PROFILE / DEBATE / DECISIONS | Claude (Lab 01–02) |
| Hot state STATUS / OPEN_LOOPS | ผู้ถืองานรอบนั้น (single-writer) |

## Canonical context (อ่านก่อน · อย่าคัดลอกซ้ำในไฟล์นี้)

ก่อนลงมือ:

1. `docs/STATUS.md`
2. `docs/OPEN_LOOPS.md`
3. handoff ล่าสุดใน `docs/handoffs/` (ถ้ามี)
4. ตามงาน: `docs/PROFILE.md` · `docs/DECISIONS.md`

สรุป Goal / Latest D-id / Open loops / Blockers **ไม่เกิน 8 บรรทัด**  
ห้ามสมมุติจากแชท OpenCode ถ้าไม่มีใน `docs/`  
จบงานที่เปลี่ยนสถานะ → อัปเดต STATUS / OPEN_LOOPS · สลับ harness → เขียน handoff จาก [`docs/handoffs/TEMPLATE.md`](docs/handoffs/TEMPLATE.md)

## กฎสั้น

- Root เท่านั้น · plugin **project scope**
- Skill **`public-site-safe`**
- Agent ถาวรใช้ `memory: project` (harness) — ตรวจใน Lab 00 · ห้ามสร้าง memory bus เอง
- MCP ไม่ใช่ท่อ Claude ↔ OpenCode · Cross-CLI เฉพาะ Lab 07
- ห้าม commit `.env` · PR เข้า learner repo เท่านั้น
- Swarm: หยุดเมื่อ done หรือครบ 20 turns
- STATUS/OPEN_LOOPS = single-writer · commit ก่อนสลับ harness

## Labs

ดู [`labs/README.md`](labs/README.md) · เริ่ม [`lab-00-project-init`](labs/lab-00-project-init/README.md)

---

## Commands

Course docs show PowerShell (Windows labs); on macOS/Linux use the POSIX equivalents (`cp` for `copy`). Node `>=22.12`.

```bash
npm run dev                  # Astro SSR dev server → http://localhost:4321
npm test                     # Vitest, tests/**/*.test.ts EXCEPT tests/labs/** (this is what CI runs, plus build)
npm run test:labs            # Vitest with vitest.labs.config.ts — Lab 05 contract, RED until db.ts is implemented
npm run test:e2e             # Playwright (playwright/) — needs a server already running; no webServer in config
npm run build && npm start   # node ./dist/server/entry.mjs (standalone adapter)
npm run sync:mcp             # .mcp.json → opencode.json mcp section; add `-- --check` to only verify
npm run create-issues        # .github/course-issues/*.md → GitHub issues via `gh` (needs `gh repo set-default` = learner repo)
```

Single test: `npx vitest run tests/smoke.test.ts -t "loads a profile"` · lab file: `npx vitest run --config vitest.labs.config.ts tests/labs/lab05-api.test.ts` · e2e: `npx playwright test -g "contact"` (base URL from `PLAYWRIGHT_BASE_URL`, default `http://127.0.0.1:4321`).

## Architecture

- **Astro SSR**: `output: 'server'` + `@astrojs/node` standalone (`astro.config.mjs`). Pages and API routes declare `export const prerender = false`. `SITE_URL` env sets `site`.
- **Profile is a markdown contract**: `src/lib/profile.ts` regex-parses `docs/PROFILE.md` by the exact headings `## Name`, `## Headline`, `## Bio`, `## Audience`, `## Interests` (bullet list), falling back to stub values per field. Pages and `GET /api/interests` render from `loadProfile()` at request time — renaming those headings silently breaks the site. The Dockerfile copies `docs/` into the runtime image for this reason.
- **SQLite layer** (`src/lib/db.ts`, OpenCode-owned): `getDb()` is a lazy module-level singleton opening `$DATA_DIR/site.sqlite` (default `./data`, gitignored) and creating the `contact_messages` / `guestbook` tables inline. `insertContact` / `listGuestbook` / `insertGuestbook` are stubs throwing `NOT_IMPLEMENTED: ...`.
- **API error convention** (`src/pages/api/contact.ts`, `guestbook.ts`): routes catch errors and map messages starting with `NOT_IMPLEMENTED` → 501, other errors → 400 (POST) / 500 (GET), always JSON `{ error }`. Keep this when implementing Lab 05, but don't expose raw SQL/stack messages to users (`public-site-safe`).
- **Tests split by config**: `vitest.config.ts` excludes `tests/labs/**` so the template stays green in CI while the lab tests stay red. Because `getDb()` caches the connection, `DATA_DIR` must be set before the first `getDb()` call in a test process.
- **`better-sqlite3` is a native module** — `node_modules` must be installed per OS (never copied/committed); the Dockerfile installs `python3 make g++` for the build.
- **Deploy**: multi-stage `Dockerfile` → Coolify at `https://<STUDENT_SLUG>.9expert.online`; runtime `DATA_DIR=/data` volume, port 4321.

## Local-only config (gitignored)

`.env`, `.mcp.json`, `.claude/settings.json`, `.claude/settings.local.json`, `opencode.json` are per-learner and created from their `*.example` files. `.mcp.json` is the MCP source of truth (github HTTP with `${GITHUB_PERSONAL_ACCESS_TOKEN}`, playwright stdio); regenerate `opencode.json`'s MCP block with `npm run sync:mcp` rather than editing it by hand. `docs/STATUS.md` / `docs/OPEN_LOOPS.md` are created from `docs/*.md.example` in Lab 00.

## Lab material layout

Each `labs/lab-XX-*/README.md` is for the human; model prompts live in `labs/lab-XX-*/prompts/*.md` inside ```` ```text ```` blocks. `.github/course-issues/*.md` are the issue bodies for Lab 03.
