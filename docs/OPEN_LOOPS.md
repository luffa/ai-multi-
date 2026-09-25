# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 12:10 +07:00

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L2 | แก้ parser `src/lib/profile.ts:37` ให้อ่านทุกบรรทัดของแต่ละ section + เพิ่ม test (Bio 3 ย่อหน้า, Interests 6 ข้อ) | รอ L3 | P0 | ก่อนเริ่ม Lab 04 | #1 · D12 · regex ใช้ flag `m` + `$` → อ่านได้แค่บรรทัดแรก ตอนนี้ Interests ขึ้นแค่ "Oracle" |
| L3 | ตัดสินว่าใครเป็นเจ้าของ `src/lib/profile.ts` (frontend หรือ backend) | human | P0 | ก่อนเริ่ม Lab 04 | ตาราง Ownership ใน `AGENTS.md` ไม่ได้ระบุไว้ · บันทึกผลใน handoff |
| L4 | Guestbook ฝั่ง UI: แสดงผลด้วย `textContent` แทน `innerHTML` | Claude | P0 | Lab 04 | #5 · D6 · XSS ที่ `src/pages/guestbook.astro:29` |
| L5 | Guestbook ฝั่ง API: validate ความยาวฝั่ง server + rate limit · ไม่คืนอีเมลผู้เขียน | OpenCode | P0 | Lab 05 | #6 · D6 · ต้องเสร็จก่อนเปิด Guestbook บนเว็บจริง |
| L6 | ไม่ส่ง error ดิบ (`err.message`) ถึงผู้ใช้ · ให้ผู้ใช้เห็นข้อความกลาง | OpenCode + Claude | P1 | Lab 04–05 | #6 (API) + #5 (UI) · D11 · API: `src/pages/api/contact.ts:19-21`, `guestbook.ts` · UI: `src/pages/contact.astro:36` · คง convention 501/400/500 ไว้ |
| L7 | ให้เว็บอ่าน `## Tagline`, Knowledge และลิงก์ GitHub จาก `PROFILE.md` | เจ้าของ L3 | P1 | Lab 04 | #1 · D1 / D3 / D5 · parser ตอนนี้อ่านแค่ 5 หัวข้อหลัก |
| L9 | ตรวจนโยบายต้นสังกัดเรื่องการใช้ชื่อ WALAI AutoLib / มหาวิทยาลัย บนเว็บส่วนตัว | human | P2 | ก่อน Lab 08 ship | ความเสี่ยงจาก Devil's Advocate ใน `DEBATE.md` |
| L10 | ตรวจบัญชี GitHub ก่อนลิงก์บนเว็บ (อีเมลใน commit, repo อื่นที่เปิดเผย) | human | P2 | ก่อน Lab 08 ship | #7 · D3 ใช้ GitHub เป็นช่องทางติดต่อเดียว · โปรไฟล์ GitHub แสดงชื่อเต็มพร้อมนามสกุล (ขัด D10) |
| L11 | ฟอร์ม Contact: เปิดได้เมื่อมีครบ validate ฝั่ง server · rate limit · error ไม่หลุด · ข้อความแจ้งการใช้ข้อมูล · ช่องทางแจ้งเจ้าของ | OpenCode + Claude | P2 | หลัง v1 | D3 · อยู่ใน Out of scope v1 |

## ปิดแล้ว (ย่อ — ย้ายหรือลบได้เมื่อรก)

| ID | Task | Closed |
|---|---|---|
| L1 | สร้าง STATUS + OPEN_LOOPS จาก example | 2026-09-25 |
| L8 | Lab 03: `gh repo set-default luffa/ai-multi-` + issues #1–#7 ผ่าน MCP (course issues จาก `npm run create-issues` ยังไม่ได้รัน — ไม่บังคับ) | 2026-09-25 |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
