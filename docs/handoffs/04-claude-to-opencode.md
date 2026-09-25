# Handoff: Claude (frontend) → OpenCode (backend)

> Lab 04 → Lab 05 · อ่านคู่กับ `docs/STATUS.md` · `docs/OPEN_LOOPS.md` · `docs/DECISIONS.md`

Timestamp: 2026-09-25 12:15 +07:00  
Task: Lab 04 Frontend — issues #1 #2 #3 #4 #5 #7 (branch `lab-04-frontend`, commit `870ff23`)  
Status: NEEDS_REVIEW (PR `[Lab 04] Frontend pages`)

## What changed

- `profile.ts` อ่านทุกบรรทัดของแต่ละ section แล้ว (D12) · เพิ่มฟิลด์ `tagline`, `github`, `knowledge` ใน type `Profile` (เพิ่มอย่างเดียว ไม่ได้เปลี่ยนหรือลบฟิลด์เดิม · D14)
- ธีม D9: พื้นขาว สีหลักแดง สีรองชมพู ผ่าน contrast AA และเห็น focus ชัด
- เมนู 4 ข้อเป็นภาษาไทย · ลิงก์ Guestbook และหมายเหตุ "ความเห็นส่วนตัว" อยู่ใน footer (D7/D10)
- Home มี tagline และปุ่ม CTA · About แสดง Bio ครบ · หน้า "เทคโนโลยีที่ใช้" แบ่ง 3 กลุ่ม พร้อม Knowledge (D1/D4/D5)
- Contact v1 = ลิงก์ GitHub อย่างเดียว **UI ไม่เรียก `POST /api/contact` แล้ว** (D3)
- Guestbook แสดงผลด้วย `textContent` และแสดงเฉพาะข้อความกลาง ไม่โชว์ `error` จาก API (D6/D11)

## Files

- `src/lib/profile.ts` · `tests/profile.test.ts` (ใหม่)
- `src/layouts/BaseLayout.astro`
- `src/pages/index.astro` · `about.astro` · `interests.astro` · `contact.astro` · `guestbook.astro`
- `playwright/smoke.spec.ts`
- `docs/DECISIONS.md` (D14) · `AGENTS.md` (แถว Ownership ของ `profile.ts`)

## Verification

- Unit / smoke: PASS — `npm test` 8/8 · `npm run build` ผ่าน
- Labs (`npm run test:labs`): FAIL **ตามที่ออกแบบไว้** — 2/2 แดงด้วย `NOT_IMPLEMENTED: insertContact` / `insertGuestbook` (รันบน Node 22.23.3 · N-API 10)
- Manual / localhost: ทุกหน้าตอบ 200 · Playwright e2e ผ่าน 2/2 บน build · ลองส่ง payload XSS ใน guestbook แล้วแสดงเป็นข้อความธรรมดา ไม่มี alert

## สัญญาที่ UI Guestbook คาดหวังจาก API (`src/pages/guestbook.astro`)

| Endpoint | สำเร็จ | UI แสดงเมื่อ error |
|---|---|---|
| `GET /api/guestbook` | 200 `{ entries: [{ name, message, created_at }] }` · **ห้ามมี email** | 501 → "ยังไม่เปิด" · อื่น → "โหลดไม่สำเร็จ" |
| `POST /api/guestbook` body `{ name, message }` | 2xx (ตอนนี้ route คืน 201) | 501 → "ยังไม่เปิด" · **429 → "ส่งถี่เกินไป"** · อื่น → "ส่งไม่สำเร็จ" |

- ฟอร์มมี `maxlength` name 80 / message 500 แต่นี่เป็นแค่ฝั่ง client — **server ต้อง validate เองด้วย** (D6)
- UI ไม่อ่าน `error` จาก body เลย เพราะฉะนั้นเปลี่ยนข้อความ error ให้เป็นข้อความกลางได้ตามสบาย (D11)

## Assumptions to challenge

1. ใช้ **429** เป็นสถานะของ rate limit — ถ้า backend เลือกรหัสอื่น ให้แจ้งใน handoff ขากลับ เพราะ UI จะแสดงข้อความ "ส่งไม่สำเร็จ" แทน
2. ไม่มีการตัด/escape `name` / `message` ฝั่ง server ก่อนเก็บ — UI ปลอดภัยเพราะใช้ `textContent` แต่ API อาจถูกเรียกจากที่อื่นด้วย
3. `created_at` แสดงตามรูปแบบที่ SQLite คืนมา (`datetime('now')` = UTC) — ยังไม่ได้แปลงเวลาเป็นเวลาไทย

## Request to next agent

**Lab 05 · OpenCode `backend` — implement API อย่างเดียว อย่าแก้ UI**

1. Implement `insertContact` / `listGuestbook` / `insertGuestbook` ใน `src/lib/db.ts` → `npm run test:labs` เขียว
2. Issue #6 (D6/D11): validate ความยาวฝั่ง server · rate limit `POST /api/guestbook` · `GET` ไม่คืน email · ไม่ส่ง `err.message` ดิบ/SQL ให้ผู้ใช้ — แต่ยังคง convention `NOT_IMPLEMENTED` → 501, อื่น → 400 (POST) / 500 (GET) ไว้
3. `/api/contact` implement ได้ตาม contract test แต่ **ยังไม่เปิดฟอร์มบนเว็บ** (D3 · L11)
4. ใช้ Node ≥ 22.23 (`nvm use 22.23.3` หรือ 24) — Node 22.13.1 ที่เป็น default ของเครื่องนี้ทำให้ `test:labs` SIGSEGV
5. ถ้าต้องเปลี่ยน shape ของ response ให้แจ้งใน handoff ขากลับ — ห้ามแก้ `guestbook.astro` เอง

## Canonical state updated

- [x] `docs/STATUS.md`
- [x] `docs/OPEN_LOOPS.md`
- [x] `docs/DECISIONS.md` — D14 (อยู่ใน commit `870ff23`)
- [x] อื่น ๆ: `AGENTS.md` แถว Ownership ของ `profile.ts`

## Single-writer note

Writer รอบถัดไปของ STATUS/OPEN_LOOPS = **OpenCode** (Lab 05) — Claude อ่านอย่างเดียวจนกว่าจะมี handoff ขากลับ
