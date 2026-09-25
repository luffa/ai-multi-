# Open Loops

> งานค้างที่ยังไม่ปิด · ลบแถวเมื่อเสร็จ
> Owner = `Claude` | `OpenCode` | `human`

Last updated: 2026-09-25 12:28 +07:00

| ID | Task | Owner | Priority | Trigger / due | Notes |
|---|---|---|---|---|---|
| L9 | ตรวจนโยบายต้นสังกัดเรื่องการใช้ชื่อ WALAI AutoLib / มหาวิทยาลัย บนเว็บส่วนตัว | human | P2 | ก่อน Lab 08 ship | ความเสี่ยงจาก Devil's Advocate ใน `DEBATE.md` |
| L10 | ตรวจบัญชี GitHub ก่อนลิงก์บนเว็บ (อีเมลใน commit, repo อื่นที่เปิดเผย) | human | P2 | ก่อน Lab 08 ship | #7 · D3 ใช้ GitHub เป็นช่องทางติดต่อเดียว · โปรไฟล์ GitHub แสดงชื่อเต็มพร้อมนามสกุล (ขัด D10) |
| L11 | ฟอร์ม Contact: เปิดได้เมื่อมีครบ validate ฝั่ง server · rate limit · error ไม่หลุด · ข้อความแจ้งการใช้ข้อมูล · ช่องทางแจ้งเจ้าของ | OpenCode + Claude | P2 | หลัง v1 | D3 · API พร้อมแล้วรวม rate limit (Lab 05 round 1) แต่ยังไม่เปิด UI ตาม D3 · อยู่ใน Out of scope v1 |
| L12 | ทดสอบ 429 rate limit จริงด้วย Playwright/manual (`/api/contact` + `/api/guestbook`) — ยืนยัน manual แล้วด้วย curl (5×201 → 429) แต่ยังไม่มี e2e/Playwright coverage | OpenCode + Claude | P2 | Lab 06 QA | rate limiter เป็น in-memory ต่อ process, prune เองแล้ว — v1 พอสำหรับ single instance |
| L13 | ตั้ง `TRUST_PROXY=true` บน Coolify (หลัง Traefik) แล้วยืนยันจริงว่า rate limit แยกตาม client ไม่ใช่รวมทั้งเว็บ | OpenCode + human | P1 | Lab 08 ship | Traefik เติม X-Forwarded-For — ต้องใช้ entry ขวาสุดเท่านั้น (ซ้ายสุดปลอมได้) · `.env.example` มีคอมเมนต์แล้ว |

## ปิดแล้ว (ย่อ — ย้ายหรือลบได้เมื่อรก)

| ID | Task | Closed |
|---|---|---|
| L1 | สร้าง STATUS + OPEN_LOOPS จาก example | 2026-09-25 |
| L2 | Parser `profile.ts` อ่านทุกบรรทัด + test (#1 · D12) | 2026-09-25 |
| L3 | `profile.ts` เป็นของ Claude/frontend → D14 | 2026-09-25 |
| L4 | Guestbook UI แสดงผลด้วย `textContent` (#5) | 2026-09-25 |
| L5 | Guestbook ฝั่ง API: implement `db.ts` + validate ความยาวฝั่ง server + rate limit (429) · `GET` ไม่คืนอีเมล (#6 · D6) | 2026-09-25 |
| L6 | ไม่ส่ง error ดิบ (`err.message`) ถึงผู้ใช้ (#6 · D11) | 2026-09-25 |
| L7 | เว็บอ่าน Tagline / Knowledge / GitHub จาก PROFILE (#1) | 2026-09-25 |
| L8 | Lab 03: `gh repo set-default luffa/ai-multi-` + issues #1–#7 ผ่าน MCP (course issues จาก `npm run create-issues` ยังไม่ได้รัน — ไม่บังคับ) | 2026-09-25 |
| L14 | Review round 1 (#6): rate limit `/api/contact` ที่ขาดไป · limiter แยก per-route module · TRUST_PROXY-aware client key · prune Map · LIMIT 50 · unit test rate limiter | 2026-09-25 |

## กฎสั้น

- อย่าเก็บงานที่ปิดแล้วจำนวนมากในตารางบน
- เปลี่ยน owner เมื่อ handoff ข้าม harness (ดู `docs/handoffs/`)
- สอง agent ห้ามเป็น writer พร้อมกันบนไฟล์นี้ — single-writer ตาม `AGENTS.md`
