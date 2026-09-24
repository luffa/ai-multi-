# Agents — Build AI Multi-Agent Lab (V4) · seed

กติการ่วมสำหรับ **Claude Code** และ **OpenCode** (Claude โหลดไฟล์นี้ผ่าน `CLAUDE.md` → `@AGENTS.md`)
สินค้า = เว็บ personal branding (Astro SSR) ใน root นี้ · Labs 00–08 เริ่มที่ [`SETUP.md`](./SETUP.md)
หลัง Lab 00: `/init` แล้วต้อง **merge** — อย่าลบ Ownership / สี่เสา / Native harness

## สี่เสาหลัก

1. **Multi-Agent** — หน้าที่และความจำแยก (ไฟล์ใน `.claude/agents/`, `.opencode/agents/` + คนละ CLI)
2. **Sub-Agent** — spawn ใช้แล้วทิ้ง; สิ่งที่ต้องจำต่อ = เขียนลง `docs/` เท่านั้น
3. **การประสานงาน** — handoff ผ่าน docs / issues / PR / review สำคัญกว่าแชทเดียว
4. **Swarm** — หลายตัวได้; **เพดาน 20 turns** แล้วหยุดสรุปช่องว่าง (Lab 05b)

ใช้ skill **`public-site-safe`** ทุกงาน implement / swarm / ship

## Start-of-session (≤ 8 บรรทัด)

ก่อนเริ่มงานทุกครั้ง:

1. อ่าน Hot state: `docs/STATUS.md` · `docs/OPEN_LOOPS.md` · handoff ล่าสุดใน `docs/handoffs/` ที่ส่งถึงคุณ
   — สองไฟล์แรกสร้างจาก `docs/*.md.example` ใน Lab 00; ถ้ายังไม่มี **อย่ามโน state** แทน
2. สรุปให้คนดู: Current goal · Latest D-id (ถ้ามี) · Open loops · Blockers — **ไม่เกิน 8 บรรทัด**
3. ข้อมูลขัดแย้งระหว่างไฟล์ → หยุดวิเคราะห์ก่อนแก้โค้ด
4. **ห้าม**สมมุติว่ารู้เหตุการณ์ในแชทของ CLI อีกฝั่ง — ถ้าไม่ได้เขียนใน `docs/` = ถือว่าไม่มี
5. จบงานที่เปลี่ยนสถานะ → อัปเดต `STATUS.md` / `OPEN_LOOPS.md` (และ handoff ถ้าสลับ harness)

อ่านตามงาน: `COURSE.md` (ชั้นความรู้ + Hot/Warm/Cold) · `docs/PROFILE.md` · `docs/DECISIONS.md`
**Proposed vs Approved:** `DEBATE.md` = ยังไม่ปิด · `DECISIONS.md` = อนุมัติแล้วเท่านั้น

### Single-writer (ไฟล์ร่วม)

- `docs/STATUS.md` และ `docs/OPEN_LOOPS.md` มี **writer คนเดียวต่อรอบ** — สลับ Claude ↔ OpenCode หลัง commit หรือหลังเขียน handoff
- Ownership โค้ดตามตารางด้านล่าง — reviewer อ่านอย่างเดียวจนกว่าจะโอนงานชัดใน handoff
- อย่าให้สอง agent แก้ไฟล์เดียวกันพร้อมกันโดยไม่แยก branch

## Ownership

| Artifact | Owner |
|---|---|
| UI (`src/pages/*.astro`, `src/layouts/`, styles) | Claude · agent `frontend` |
| API + SQLite (`src/lib/db.ts`, `src/pages/api/*`) | OpenCode · agent `backend` |
| E2E / a11y (`docs/QA.md`) | Playwright MCP + either CLI |
| Profile / debate docs | Claude (Lab 01–02 · subagents) |
| Hot state (`STATUS.md` · `OPEN_LOOPS.md`) | ผู้ถืองานรอบนั้น (single-writer) |
| Handoffs (`docs/handoffs/`) | ผู้ส่งงานก่อนสลับ harness |
| Review artifacts | Lab 07 · agent `reviewer` (Claude) / OpenCode review |
| Ship (`docs/SHIP.md`) | Lab 08 |

## ความจำ (ห้ามสร้างชั้นเอง)

- ร่วม (shared) = `docs/` + git/PR — สิ่งที่ต้องโชว์ข้ามคน/CLI ต้องอยู่ในไฟล์ เท่านั้น
- แยก (agent-local) = เซสชัน + ไฟล์ agent (frontend ไม่ถือ context backend) · Sub-Agent = ใช้แล้วทิ้ง
- **ห้ามสร้าง memory bus เอง** (เลิกแนว V1 · ห้ามติด plugin memory แข่ง harness)
- Harness persistent: Claude = `memory: project` → `.claude/agent-memory/<name>/` + `/memory` ·
  OpenCode = `AGENTS.md` + ไฟล์ agent + **resume session** (เซสชันใหม่ไม่บังคับ recall ปากเปล่า)
- Adapter (`AGENTS.md` / `CLAUDE.md`) ต้อง**ชี้ไป**ไฟล์กลาง — อย่าคัดลอก STATUS/DECISIONS ซ้ำใน adapter

## Workflow · Native harness only

```text
00 Init → 01 Interview → 02 Debate → 03 Issues → 04 FE → 05 BE → 05b Swarm(≤20) → 06 QA → 07 Review → 08 Ship
```

- Plugins project scope: superpowers · `oh-my-openagent@4.19.4`
- Cross-CLI **เฉพาะ Lab 07** · MCP = งานผลิต — **ไม่ใช่**ท่อระหว่างสอง CLI · ห้าม JSON bus / Swarm หยุดเมื่อ done **หรือ** ครบ **20 turns**

## Commands

Docs ของคอร์สเขียนเป็น PowerShell (Windows); บน macOS/Linux ใช้ POSIX (`cp` แทน `copy`) · Node `>=22.12` (engines) — แต่ `test:labs` ต้องใช้ Node ที่มี N-API ≥ 10 ดูข้อ Architecture ด้านล่าง

```bash
npm install                # ไม่มีใน template (Lab 00) · better-sqlite3 = native — ห้าม copy node_modules ข้ามเครื่อง
npm run dev                # Astro SSR → http://localhost:4321
npm test                   # vitest tests/** ยกเว้น tests/labs/ — ตัวเดียวกับที่ CI รัน
npm run test:labs          # contract Lab 05 — fresh template ต้องแดงด้วย NOT_IMPLEMENTED (Lab 05 ทำให้เขียว)
npm run test:e2e           # playwright/ — ต้อง (1) npx playwright install ครั้งแรก (2) server รันอยู่แล้ว (config ไม่มี webServer)
npm run build && npm start # แล้วรัน dist/server/entry.mjs (standalone adapter)
npm run sync:mcp           # .mcp.json → mcp.servers ของ opencode.json — อย่าแก้ opencode.json มือ; ตรวจ: npm run sync:mcp -- --check
npm run create-issues      # .github/course-issues/*.md → gh issues — ต้อง gh repo set-default = repo ผู้เรียน
```

Single test: `npx vitest run tests/smoke.test.ts -t "loads a profile"` · lab: `npx vitest run --config vitest.labs.config.ts tests/labs/lab05-api.test.ts` · e2e: `npx playwright test -g "contact"` (`PLAYWRIGHT_BASE_URL` default `http://127.0.0.1:4321`)

**ไม่มี lint / format / typecheck script ใน repo** (และไม่ได้ติดตั้ง typescript) — อย่าเดาคำสั่งที่ไม่มี · verification = `npm test` (+ `npm run build` ตาม CI: `.github/workflows/ci.yml` = `npm ci` → `npm test` → `npm run build`)

## Architecture

- **Astro 7 SSR**: `output: 'server'` + `@astrojs/node` standalone (`astro.config.mjs`, port 4321, `SITE_URL` ตั้ง `site`) — ทุก page/API มี `export const prerender = false` (หน้าใหม่ใส่ตาม convention)
- **`docs/PROFILE.md` คือ contract**: `src/lib/profile.ts` แตกหัวข้อ `## Name` `## Headline` `## Bio` `## Audience` `## Interests` (bullet) **ตรงตัวอักษร** — rename แล้วหน้าเว็บ + `GET /api/interests` เงียบเป็น stub โดยไม่ error · Dockerfile จึง `COPY docs ./docs` (อ่านตอน runtime)
- **SQLite** (`src/lib/db.ts` · OpenCode): `getDb()` lazy singleton → `$DATA_DIR/site.sqlite` (default `./data`, gitignored) สร้างตาราง inline · `insertContact` / `listGuestbook` / `insertGuestbook` = stub โยน `NOT_IMPLEMENTED: …` (Lab 05 ต้อง implement) · ใน test ต้องตั้ง `DATA_DIR` **ก่อน** `getDb()` ครั้งแรก (connection cache ตลอด process)
- **API error convention** (`contact.ts` / `guestbook.ts`): ข้อความขึ้น `NOT_IMPLEMENTED` → 501, อื่น → 400 (POST) / 500 (GET), JSON `{error}` เสมอ — รักษาไว้ตอน implement Lab 05 และห้าม leak stack/SQL ให้ผู้ใช้ (`public-site-safe`)
- **Split สอง vitest config**: `vitest.config.ts` exclude `tests/labs/**` → CI เขียวเสมอ ขณะที่ lab contract แดง by design — อย่า "แก้ให้เขียว" ด้วยการย้ายไฟล์ข้ามชุด
- **better-sqlite3 (native) ต้องการ N-API ≥ 10**: ถ้าน้อยกว่านั้น `npm run test:labs` จะ **SIGSEGV (exit 139)** ที่ `new Database(…)` แทนที่จะ fail แบบ `NOT_IMPLEMENTED` — ต้นเหตุคือ Node เวอร์ชัน ไม่ใช่โค้ด: พัง = Node 20.11 · 22.4 · 22.12 · 22.13.1 (N-API 9) · ผ่าน = Node 22.23.3 (N-API 10) และ Node 24 · fresh install ก็พัง = ไม่ใช่ node_modules เสีย · `npm rebuild better-sqlite3` ไม่ช่วย (binding.gyp ข้าม compile ตราบใดที่ `prebuilds/` ยังอยู่) · **วิธีใช้: Node ≥ 22.23 หรือ 24 (`nvm install 22` ได้ตัวล่าสุด)** · ตรวจเร็ว: `node -p process.versions.napi` (ต้อง ≥ 10) หรือ `node -e "new (require('better-sqlite3'))(':memory:')"` · `npm test` / `npm run build` ไม่กระทบ (ไม่มี test ไหนเปิด DB)
- **Deploy**: multi-stage `Dockerfile` → Coolify `https://<STUDENT_SLUG>.9expert.online` · runtime `DATA_DIR=/data` (volume), port 4321 · `.dockerignore` ตัด `labs/` กับ `.env` (`SITE_URL` เป็น build ARG)

## Local-only config (gitignored — สร้างจาก `*.example` ใน Lab 00)

`.env` · `.mcp.json` · `.claude/settings.json` / `settings.local.json` · `opencode.json` · `docs/STATUS.md` / `docs/OPEN_LOOPS.md`
`.mcp.json` = source of truth ของ MCP (github HTTP + `${GITHUB_PERSONAL_ACCESS_TOKEN}`, playwright stdio) → sync เข้า `opencode.json` ด้วย `npm run sync:mcp` เท่านั้น

## Lab material

`labs/lab-XX-*/README.md` = สำหรับคน · `labs/lab-XX-*/prompts/*.md` = คำสั่งโมเดล (อยู่ในกรอบ ``` ```text ``` ```) · `.github/course-issues/*.md` = issue body ของ Lab 03

## ห้าม

- Commit `.env`, PAT, Coolify webhook, `node_modules`, `.mcp.json`
- เคลม deploy สำเร็จโดยไม่มี URL 200 จริง
- บังคับ tmux บน Windows
- PR เข้า `Onto-IQ/*` — เข้า learner repo เท่านั้น
- ปล่อย swarm เกิน 20 turns โดยไม่สรุปหยุด

## Labs

[`SETUP.md`](./SETUP.md) → [`labs/lab-00-project-init`](./labs/lab-00-project-init/README.md) → [`labs/README.md`](./labs/README.md)
