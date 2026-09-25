# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 12:15 +07:00

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L5 | Guestbook ฝั่ง API: implement `db.ts` (`test:labs` เขียว) + validate ความยาวฝั่ง server + rate limit (429) · `GET` ไม่คืนอีเมล | OpenCode | P0 | Lab 05 | #6 · D6 · สัญญา response อยู่ใน `docs/handoffs/04-claude-to-opencode.md` · ใช้ Node ≥ 22.23 |
| L6 | ไม่ส่ง error ดิบ (`err.message`) ถึงผู้ใช้ · ให้ผู้ใช้เห็นข้อความกลาง | OpenCode | P1 | Lab 05 | #6 · D11 · API: `src/pages/api/contact.ts`, `guestbook.ts` · คง convention 501/400/500 ไว้ · ฝั่ง UI เสร็จแล้วใน Lab 04 |
| L9 | ตรวจนโยบายต้นสังกัดเรื่องการใช้ชื่อ WALAI AutoLib / มหาวิทยาลัย บนเว็บส่วนตัว | human | P2 | ก่อน Lab 08 ship | ความเสี่ยงจาก Devil's Advocate ใน `DEBATE.md` |
| L10 | ตรวจบัญชี GitHub ก่อนลิงก์บนเว็บ (อีเมลใน commit, repo อื่นที่เปิดเผย) | human | P2 | ก่อน Lab 08 ship | #7 · D3 ใช้ GitHub เป็นช่องทางติดต่อเดียว · โปรไฟล์ GitHub แสดงชื่อเต็มพร้อมนามสกุล (ขัด D10) |
| L11 | ฟอร์ม Contact: เปิดได้เมื่อมีครบ validate ฝั่ง server · rate limit · error ไม่หลุด · ข้อความแจ้งการใช้ข้อมูล · ช่องทางแจ้งเจ้าของ | OpenCode + Claude | P2 | หลัง v1 | D3 · อยู่ใน Out of scope v1 |

## ปิดแล้ว (ย่อ — ย้ายหรือลบได้เมื่อรก)

| ID | Task | Closed |
|---|---|---|
| L1 | สร้าง STATUS + OPEN_LOOPS จาก example | 2026-09-25 |
| L2 | Parser `profile.ts` อ่านทุกบรรทัด + test (#1 · D12) | 2026-09-25 |
| L3 | `profile.ts` เป็นของ Claude/frontend → D14 | 2026-09-25 |
| L4 | Guestbook UI แสดงผลด้วย `textContent` (#5) | 2026-09-25 |
| L7 | เว็บอ่าน Tagline / Knowledge / GitHub จาก PROFILE (#1) | 2026-09-25 |
| L8 | Lab 03: `gh repo set-default luffa/ai-multi-` + issues #1–#7 ผ่าน MCP (course issues จาก `npm run create-issues` ยังไม่ได้รัน — ไม่บังคับ) | 2026-09-25 |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
