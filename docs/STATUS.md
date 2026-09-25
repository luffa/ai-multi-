# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 12:21 +07:00
Updated by: OpenCode (Lab 05 · ส่งต่อให้ Claude)

## Current goal

- Lab 05 Backend เสร็จแล้ว: `insertContact` / `listGuestbook` / `insertGuestbook` implement จริงด้วย better-sqlite3 · issue #6 (validate + rate limit + no-email + no-raw-error) ปิดแล้ว · `test:labs` + `test` + `build` เขียวทั้งหมด

## Done

- Lab 00: preflight บน macOS ผ่าน · ตั้งความจำถาวรให้ agent `frontend` แล้ว (`.claude/agent-memory/frontend/`)
- Lab 01: สัมภาษณ์ 9 ข้อ → `docs/PROFILE.md` + Knowledge 6 เรื่อง (เรื่องละ 2 ลิงก์) + `## Brainstorm` (`a749675`, `389ac71`)
- Lab 02: subagents 3 บทบาท → `docs/DEBATE.md` · เจ้าของตัดสินข้อขัดแย้ง → `docs/DECISIONS.md` D1–D13 (`55048d4`)
- Lab 03: GitHub MCP สร้าง issues #1–#7 จาก D-id · ตาราง + `## Lab 03 — MCP vs gh` ท้าย `DECISIONS.md`
- Lab 04: branch `lab-04-frontend` (`870ff23`) closes #1 #2 #4 #5 · refs #3 #7 · D14 = `profile.ts` เป็นของ Claude/frontend · `npm test` 8/8 + build + e2e 2/2 ผ่าน · PR #8
- Lab 05: branch `lab-05-backend` — implement `src/lib/db.ts` (prepared statements) + validate ฝั่ง server (name ≤80, message ≤500, trim, ห้ามว่าง, email regex) + rate limit `POST /api/guestbook` (5 req/60s ต่อ `clientAddress` → 429) + `GET /api/guestbook` ไม่คืน email + error ที่ผู้ใช้เห็นเป็นข้อความกลางเสมอ (คง 501/400/500 convention) · ปิด #6 · `npm run test:labs` 2/2 PASS · `npm test` 8/8 PASS · `npm run build` PASS (Node 22.23.3)

## In progress

- PR #8 (Lab 04) รอ review/merge
- Lab 05 รอ commit + handoff กลับ Claude (ยังไม่ได้เปิด PR ใหม่ตามคำสั่ง)

## Blocked

- —

## Next actions

1. **Claude**: อ่าน `docs/handoffs/05-opencode-to-claude.md` — ไม่ต้องแก้ UI ใด ๆ (response shape ไม่เปลี่ยนจากที่ตกลงไว้ใน handoff 04)
2. merge PR #8 (Lab 04) เข้า `main` แล้วค่อย merge Lab 05 ตามลำดับ เพื่อลดโอกาส conflict
3. Lab 06 QA: ทดสอบ rate limit 429 จริงบน localhost/e2e (ยังไม่มี e2e coverage สำหรับ 429 กรณีนี้)

## Files changed in latest session

- `src/lib/db.ts` — implement `insertContact` / `listGuestbook` / `insertGuestbook` ด้วย prepared statements + validation helper
- `src/pages/api/contact.ts` — sanitize error message (VALIDATION เท่านั้นที่โชว์ raw, อื่น → "invalid request"), คง 501/400 convention
- `src/pages/api/guestbook.ts` — rate limit 429 ก่อน insert · GET เลือกเฉพาะ name/message/created_at (ไม่มี email column อยู่แล้ว) · sanitize error
- `docs/handoffs/05-opencode-to-claude.md` — ใหม่

## Notes

- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
- ห้ามใส่นามสกุลหรือปีที่เริ่มเรียน/ทำงานบนเว็บ (D10)
- `main` บน origin = `506cb20` · Lab 04 อยู่บน `lab-04-frontend` · Lab 05 อยู่บน `lab-05-backend`
- Rate limiter เป็น in-memory (Map) ต่อ process — รีเซ็ตเมื่อ restart server, พอสำหรับ v1 single-instance
