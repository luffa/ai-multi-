# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 12:15 +07:00
Updated by: Claude (ส่งต่อให้ OpenCode · Lab 05)

## Current goal

- Lab 04 UI เสร็จแล้ว รอ review ใน PR · ถัดไปเป็น **Lab 05 Backend (OpenCode)** ทำ issue #6 และทำให้ `test:labs` เขียว

## Done

- Lab 00: preflight บน macOS ผ่าน · ตั้งความจำถาวรให้ agent `frontend` แล้ว (`.claude/agent-memory/frontend/`)
- Lab 01: สัมภาษณ์ 9 ข้อ → `docs/PROFILE.md` + Knowledge 6 เรื่อง (เรื่องละ 2 ลิงก์) + `## Brainstorm` (`a749675`, `389ac71`)
- Lab 02: subagents 3 บทบาท → `docs/DEBATE.md` · เจ้าของตัดสินข้อขัดแย้ง → `docs/DECISIONS.md` D1–D13 (`55048d4`)
- Lab 03: GitHub MCP สร้าง issues #1–#7 จาก D-id · ตาราง + `## Lab 03 — MCP vs gh` ท้าย `DECISIONS.md`
- Lab 04: branch `lab-04-frontend` (`870ff23`) closes #1 #2 #4 #5 · refs #3 #7 · D14 = `profile.ts` เป็นของ Claude/frontend · `npm test` 8/8 + build + e2e 2/2 ผ่าน · PR #8

## In progress

- PR #8 (Lab 04) รอ review/merge

## Blocked

- —

## Next actions

1. **OpenCode (Lab 05)**: อ่าน `docs/handoffs/04-claude-to-opencode.md` → implement `src/lib/db.ts` + issue #6 · ห้ามแก้ UI
2. รัน `test:labs` ด้วย Node ≥ 22.23 (`nvm use 22.23.3`) — ถ้าใช้ Node 22.13.1 ที่เป็น default จะ SIGSEGV
3. merge PR #8 เข้า `main` ก่อนหรือพร้อมกับ Lab 05 เพื่อลดโอกาส conflict

## Files changed in latest session

- `src/lib/profile.ts` + `tests/profile.test.ts` — parser อ่านครบทุกบรรทัด + ฟิลด์ tagline/github/knowledge
- `src/layouts/BaseLayout.astro`, `src/pages/*.astro` — ธีม D9 · เมนู 4 ข้อ · หน้า Home/About/เทคโนโลยี/Contact/Guestbook
- `playwright/smoke.spec.ts` — ปรับ e2e ตาม Contact แบบลิงก์ GitHub
- `docs/DECISIONS.md` (D14), `AGENTS.md` (Ownership)
- `docs/handoffs/04-claude-to-opencode.md` — ใหม่

## Notes

- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
- ห้ามใส่นามสกุลหรือปีที่เริ่มเรียน/ทำงานบนเว็บ (D10)
- `main` บน origin = `506cb20` · งาน Lab 04 อยู่บน `lab-04-frontend`
