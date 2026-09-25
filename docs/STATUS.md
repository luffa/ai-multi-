# Project Status

> อ่านทุก session · **สั้น** · single-writer ต่อรอบ
> ดู [`COURSE.md`](../COURSE.md) ชั้น State (Hot)

Last updated: 2026-09-25 12:28 +07:00
Updated by: OpenCode (Lab 05 review round 1 · ส่งต่อให้ Claude)

## Current goal

- Lab 05 Backend + review round 1 เสร็จแล้ว: `insertContact` / `listGuestbook` / `insertGuestbook` implement จริง · rate limit ครอบทั้ง `/api/contact` และ `/api/guestbook` ด้วย limiter กลาง (`src/lib/rate-limit.ts`) proxy-aware ผ่าน `TRUST_PROXY` · issue #6 ปิดแล้ว · `test:labs` + `test` + `build` เขียวทั้งหมด

## Done

- Lab 00: preflight บน macOS ผ่าน · ตั้งความจำถาวรให้ agent `frontend` แล้ว (`.claude/agent-memory/frontend/`)
- Lab 01: สัมภาษณ์ 9 ข้อ → `docs/PROFILE.md` + Knowledge 6 เรื่อง (เรื่องละ 2 ลิงก์) + `## Brainstorm` (`a749675`, `389ac71`)
- Lab 02: subagents 3 บทบาท → `docs/DEBATE.md` · เจ้าของตัดสินข้อขัดแย้ง → `docs/DECISIONS.md` D1–D13 (`55048d4`)
- Lab 03: GitHub MCP สร้าง issues #1–#7 จาก D-id · ตาราง + `## Lab 03 — MCP vs gh` ท้าย `DECISIONS.md`
- Lab 04: branch `lab-04-frontend` merge เข้า `main` แล้ว (`e4bd332`, PR #8 merged) closes #1 #2 #4 #5 · refs #3 #7 · D14 = `profile.ts` เป็นของ Claude/frontend · `npm test` 8/8 + build + e2e 2/2 ผ่าน
- Lab 05: branch `lab-05-backend` — implement `src/lib/db.ts` (prepared statements) + validate ฝั่ง server (name ≤80, message ≤500, trim, ห้ามว่าง, email regex) + rate limit ทั้ง `POST /api/guestbook` และ `POST /api/contact` (5 req/60s ต่อ client key แยก bucket ต่อ route → 429) + `GET /api/guestbook` ไม่คืน email + `LIMIT 50` + error ที่ผู้ใช้เห็นเป็นข้อความกลางเสมอ (คง 501/400/500 convention) · ปิด #6 · commit `318d2ac`
- Lab 05 review round 1: แยก rate limiter เป็น `src/lib/rate-limit.ts` ใช้ร่วมกัน 2 route · เพิ่ม `TRUST_PROXY` (เลือก X-Forwarded-For entry ขวาสุดเมื่อ `true`) · prune key เก่าไม่ให้ Map โตไม่จำกัด · unit test `tests/rate-limit.test.ts` (ไม่แตะ better-sqlite3) · `npm run test:labs` 2/2 PASS · `npm test` 16/16 PASS · `npm run build` PASS (Node 22.23.3) · ยืนยัน manual: contact 7 ครั้ง → 5×201 แล้ว 429×2

## In progress

- Lab 05 รอเปิด PR (ยังไม่ได้เปิดตามคำสั่ง — commit อยู่บน `lab-05-backend` เท่านั้น)

## Blocked

- —

## Next actions

1. **Claude**: อ่าน `docs/handoffs/05-opencode-to-claude.md` (รวมหัวข้อ "Review round 1") — ไม่ต้องแก้ UI ใด ๆ (response shape ไม่เปลี่ยน)
2. Lab 08: ต้องตั้ง `TRUST_PROXY=true` บน Coolify (หลัง Traefik) แล้วยืนยันจริงว่า rate limit แยกตาม client ไม่ใช่รวมทั้งเว็บ — ยังไม่ได้ทดสอบใน production environment
3. Lab 06 QA: ทดสอบ 429 จริงบน localhost/e2e ทั้ง `/api/contact` และ `/api/guestbook` (L12)
4. เปิด PR สำหรับ `lab-05-backend` เมื่อเจ้าของพร้อม

## Files changed in latest session

- `src/lib/rate-limit.ts` — ใหม่: `createRateLimiter` (sliding window + prune) และ `resolveClientKey` (TRUST_PROXY-aware)
- `src/pages/api/contact.ts` — เพิ่ม rate limit 429 (bucket แยกจาก guestbook)
- `src/pages/api/guestbook.ts` — ใช้ limiter กลางแทนโค้ด inline เดิม
- `src/lib/db.ts` — `listGuestbook` เพิ่ม `LIMIT 50`
- `.env.example` — เพิ่ม `TRUST_PROXY` พร้อมคอมเมนต์
- `tests/rate-limit.test.ts` — ใหม่: หน้าต่าง/เกินเพดาน/แยก bucket/prune/TRUST_PROXY
- `docs/handoffs/05-opencode-to-claude.md` — เพิ่มหัวข้อ Review round 1

## Notes

- Proposed vs Approved: brainstorm อยู่ใน `DEBATE.md` — สิ่งที่ปิดแล้วอยู่ใน `DECISIONS.md`
- ห้ามใส่นามสกุลหรือปีที่เริ่มเรียน/ทำงานบนเว็บ (D10)
- `main` บน origin = `e4bd332` (Lab 04 merged) · Lab 05 อยู่บน `lab-05-backend` ยังไม่ merge
- Rate limiter เป็น in-memory (Map) ต่อ process — รีเซ็ตเมื่อ restart server, ไม่ sync ข้าม instance, พอสำหรับ v1 single-instance · prune เองแล้วไม่โตไม่จำกัด
