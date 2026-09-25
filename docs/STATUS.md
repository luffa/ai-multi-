# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 12:10 +07:00
Updated by: Claude

## Current goal

- จบ Lab 03 แล้ว → ถัดไปคือ Lab 04 (Frontend) เริ่มจาก issue #1

## Done

- Lab 00: preflight บน macOS ผ่าน · ตั้งความจำถาวรให้ agent `frontend` แล้ว (`.claude/agent-memory/frontend/`)
- Lab 01: สัมภาษณ์ 9 ข้อ → `docs/PROFILE.md` + Knowledge 6 เรื่อง (เรื่องละ 2 ลิงก์) + `## Brainstorm` (`a749675`, `389ac71`)
- Lab 02: subagents 3 บทบาท → `docs/DEBATE.md` · เจ้าของตัดสินข้อขัดแย้ง → `docs/DECISIONS.md` D1–D13 (`55048d4`)
- Lab 03: GitHub MCP สร้าง issues #1–#7 จาก D-id · ตาราง + `## Lab 03 — MCP vs gh` ท้าย `DECISIONS.md`

## In progress

- —

## Blocked

- — (ตอนนี้ไม่มี · แต่ D12 parser `profile.ts` จะ block Lab 04 ดู L2/L3 ใน `OPEN_LOOPS.md`)

## Next actions

1. push `main` ขึ้น origin — ลิงก์ `docs/DECISIONS.md` ใน issues จะ 404 จนกว่าจะ push
2. ตัดสินว่าใครเป็นเจ้าของ `src/lib/profile.ts` (L3) แล้วทำ #1
3. Lab 04 (Claude · `frontend`): #2–#5, #7 ตาม "เกณฑ์พร้อม Frontend" ใน `DECISIONS.md`

## Files changed in latest session

- `docs/PROFILE.md` — Tagline (D1) + Tone (D8/D9)
- `docs/DEBATE.md` — ใหม่ · Brand / UX / Devil
- `docs/DECISIONS.md` — ใหม่ · D1–D13, Out of scope, เกณฑ์ Lab 04
- `docs/STATUS.md`, `docs/OPEN_LOOPS.md` — เปลี่ยนจาก template เป็นสถานะจริง · ผูกเลข issue
- `docs/DECISIONS.md` — เพิ่มตาราง issues + `## Lab 03 — MCP vs gh`

## Notes

- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
- ห้ามใส่นามสกุลหรือปีที่เริ่มเรียน/ทำงานบนเว็บ (D10)
- ทุก commit ถึงตอนนี้อยู่บน `main` · ยังไม่ได้ push
