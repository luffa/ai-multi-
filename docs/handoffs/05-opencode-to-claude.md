# Handoff: OpenCode (backend) → Claude (frontend)

> Lab 05 → Lab 06 · อ่านคู่กับ `docs/STATUS.md` · `docs/OPEN_LOOPS.md` · `docs/DECISIONS.md`

Timestamp: 2026-09-25 12:21 +07:00
Task: Lab 05 Backend — closes #6 · branch `lab-05-backend`
Status: IMPLEMENTED

## What changed

- `src/lib/db.ts`: implement `insertContact` / `listGuestbook` / `insertGuestbook` ด้วย **prepared statements** เท่านั้น (`better-sqlite3`) — ไม่มี string-concat SQL
- Validation ฝั่ง server (#6/D6): `name` ≤ 80, `message` ≤ 500, trim แล้วห้ามว่าง ทั้ง contact และ guestbook · `email` ตรวจรูปแบบด้วย regex ก่อน insert
- `src/pages/api/guestbook.ts`: เพิ่ม rate limit **429** บน `POST` — in-memory sliding window 5 คำขอ/60 วินาที ต่อ `clientAddress` (ตรวจ **ก่อน** insert ทุกครั้ง ไม่ใช่หลัง)
- `GET /api/guestbook` เลือกคอลัมน์ตรง ๆ (`name, message, created_at`) — **ไม่มี email column ในตาราง `guestbook` อยู่แล้ว** จึงไม่มีทาง leak
- Error message ที่ผู้ใช้เห็นถูก sanitize (#6/D11): เฉพาะข้อความที่ขึ้นต้นด้วย `VALIDATION` หรือ `NOT_IMPLEMENTED` เท่านั้นที่โชว์ตรง ๆ (เป็นข้อความที่เราตั้งใจเขียนเอง ไม่ใช่ raw SQL/stack) ส่วน error อื่น (เช่น DB busy, unexpected) → ข้อความกลาง `"invalid request"` (400) / `"internal error"` (500) — **ไม่มี `err.message` ดิบ, ไม่มี SQL, ไม่มี stack หลุดออกไปเลย**
- คง convention เดิม: `NOT_IMPLEMENTED` → 501, validation/อื่น → 400 (POST) / 500 (GET), ตอบ JSON `{error}` เสมอ

## Files

- `src/lib/db.ts`
- `src/pages/api/contact.ts`
- `src/pages/api/guestbook.ts`
- `docs/STATUS.md` · `docs/OPEN_LOOPS.md` (L5/L6 ปิดแล้ว, เพิ่ม L12)

## Verification

- Unit / smoke (`npm test`): PASS 8/8
- Labs (`npm run test:labs`): PASS 2/2 (Node 22.23.3, N-API 10 — ยืนยันด้วย `node -p process.versions.napi`)
- `npm run build`: PASS
- Manual: ยังไม่ได้รัน `npm run dev` เทียบ curl จริง (ไม่ได้อยู่ในสโคปคำสั่งรอบนี้) — แนะนำให้ Lab 06 QA ยิง `curl` จริงกับ 429 และ validation error เพื่อยืนยัน happy-path + error-path ครบ

## Response shape — เปลี่ยนหรือไม่เปลี่ยน

**ไม่เปลี่ยน shape ที่ตกลงไว้ใน `docs/handoffs/04-claude-to-opencode.md`:**

| Endpoint | สำเร็จ | Error |
|---|---|---|
| `GET /api/guestbook` | 200 `{ entries: [{ name, message, created_at }] }` (ไม่มี email) | 501 `NOT_IMPLEMENTED...` (ไม่เกิดแล้วตอนนี้) · 500 `{error:"internal error"}` |
| `POST /api/guestbook` | 201 `{ id, name, message, created_at }` | 429 `{error:"rate limited"}` · 400 `{error:"VALIDATION: ..."}` หรือ `{error:"invalid request"}` |
| `POST /api/contact` | 201 `{ id, name, email, message, created_at }` | 400 `{error:"VALIDATION: ..."}` หรือ `{error:"invalid request"}` |

- **429 ใช้ตามที่ Claude เสนอไว้ใน assumption #1 ของ handoff 04 — ยืนยันแล้ว ไม่ต้องเปลี่ยนอะไรฝั่ง UI**
- UI ไม่อ่าน `error` body อยู่แล้ว (D11) จึงไม่กระทบ แต่ถ้าจะเพิ่ม debug logging ฝั่ง client ระวังอย่า log `error` field ตรง ๆ เพราะข้อความ `VALIDATION: ...` อาจมีชื่อ field ภายใน (ไม่ sensitive แต่ไม่ใช่ข้อความที่ตั้งใจให้ user เห็นตาม D11)

## Assumptions to challenge

1. Rate limit เป็น in-memory `Map` ต่อ process (ไม่ persist, รีเซ็ตเมื่อ restart, ไม่ sync ข้าม instance) — พอสำหรับ v1 single-instance ตาม Dockerfile/Coolify ปัจจุบัน แต่ถ้า scale เป็นหลาย instance ต้องย้ายไป store กลาง (Redis) — บันทึกไว้ที่ L12
2. `email` validate ด้วย regex ง่าย ๆ (`local@domain.tld`) ไม่ใช่ RFC 5322 เต็มรูปแบบ — เพียงพอสำหรับกันข้อมูลมั่ว ไม่ใช่ mail deliverability check
3. `/api/contact` implement ตาม contract test แล้ว แต่ **ฟอร์มยังไม่เปิดบนเว็บ** ตาม D3/L11 — ยังไม่มีอะไรต้องแก้ฝั่ง UI

## Request to next agent

**Lab 06 QA (either CLI) / Claude ถ้าต้องแตะ UI**

1. ไม่ต้องแก้ UI ใด ๆ จาก handoff นี้ — response shape ตรงกับที่ตกลงไว้ทุกจุด
2. Lab 06: ทดสอบ manual/e2e กรณี 429 จริง (ยิงเกิน 5 ครั้งใน 60 วิ) และกรณี validation error (name/message เกินความยาว, email ผิดรูปแบบ) เพื่อยืนยันว่า UI แสดงข้อความกลางตามที่ออกแบบไว้ (L12)
3. ถ้าจะเปิดฟอร์ม Contact ใน v1 (L11) ต้องอัปเดต DECISIONS.md ก่อน (D3 ยังบอกว่าไม่เปิด)

## Canonical state updated

- [x] `docs/STATUS.md`
- [x] `docs/OPEN_LOOPS.md`
- [ ] `docs/DECISIONS.md` — ไม่มี decision ใหม่ที่ต้องอนุมัติรอบนี้
- [x] อื่น ๆ: —

## Single-writer note

Writer รอบถัดไปของ STATUS/OPEN_LOOPS = **Claude** (Lab 06 หรือเมื่อกลับมาแตะ UI) — OpenCode อ่านอย่างเดียวจนกว่าจะมี handoff ขากลับ

## Review round 1 (2026-09-25 12:28 +07:00)

เจ้าของทดสอบด้วย server จริง (`dist` + `DATA_DIR` ชั่วคราว) แล้วสั่งแก้ก่อนเปิด PR — สิ่งที่ยืนยันว่าใช้ได้อยู่แล้ว (validation 400, malformed JSON → "invalid request", 429 ที่ครั้งที่ 6, GET ไม่มี email) **ไม่แตะ** ให้ถดถอย

แก้แล้ว:

1. **`POST /api/contact` ไม่มี rate limit** — เพิ่มแล้ว โดยแยก rate-limit logic ออกเป็น `src/lib/rate-limit.ts` (`createRateLimiter`) ใช้ร่วมกันทั้ง `contact.ts` และ `guestbook.ts` แต่ **คนละ instance/bucket ต่อ route** (สร้าง limiter แยกในแต่ละไฟล์) — ยืนยัน manual: ยิง 7 ครั้ง → 5×201, 2×429
2. **Rate limit key พึ่ง `clientAddress` อย่างเดียว (เสี่ยงหลัง Traefik)** — เพิ่ม `resolveClientKey()` ใน `rate-limit.ts`: อ่าน env `TRUST_PROXY`; ถ้า `"true"` ใช้ entry **ขวาสุด** ของ header `X-Forwarded-For` (ค่าที่ proxy ที่เราเชื่อถือเติมล่าสุด — ไม่ใช้ซ้ายสุดเพราะ client ปลอมได้) ไม่งั้น fallback ไป `clientAddress` · เพิ่ม `TRUST_PROXY=false` ใน `.env.example` พร้อมคอมเมนต์อธิบาย · **ไม่ได้แตะ** `astro.config.mjs` หรือ `Dockerfile` ตามคำสั่ง — บันทึกไว้ที่ `docs/OPEN_LOOPS.md` L13 ว่า **Lab 08 ต้องตั้ง `TRUST_PROXY=true` บน Coolify จริง แล้วยืนยันว่ารายบุคคลจริง** (ยังไม่ได้ทดสอบใน production)
3. **`hits` Map โตไม่จำกัด** — `createRateLimiter` มี `prune()` ภายในที่ลบ key ที่ไม่มี timestamp เหลือในหน้าต่างแล้ว ทำงานทุกครั้งที่เรียก `isRateLimited()` (ไม่ต้อง cron แยก)
4. **`listGuestbook()` ไม่มี LIMIT** — เพิ่ม `LIMIT 50` (เรียงจากใหม่สุด `ORDER BY id DESC`) · shape ของ response ไม่เปลี่ยน (`{ entries: [{ name, message, created_at }] }`)
5. **เพิ่ม unit test** — `tests/rate-limit.test.ts` (ไม่ import `better-sqlite3` เลย จึงไม่เสี่ยง SIGSEGV บน CI): ครอบคลุมหน้าต่าง/เกินเพดาน, แยก bucket ต่อ key, prune คืน key ว่าง, และ `resolveClientKey` เลือก entry ขวาสุดเมื่อ `TRUST_PROXY=true` + fallback ทุกกรณี · `tests/labs/**` ไม่ถูกแตะ

Verification รอบนี้: `npm run test:labs` 2/2 PASS · `npm test` 16/16 PASS (เพิ่ม 8 จาก rate-limit.test.ts) · `npm run build` PASS · manual curl ยืนยัน contact rate limit (5×201 → 429×2)

Files เพิ่ม/แก้รอบนี้: `src/lib/rate-limit.ts` (ใหม่), `src/pages/api/contact.ts`, `src/pages/api/guestbook.ts`, `src/lib/db.ts` (LIMIT), `.env.example` (`TRUST_PROXY`), `tests/rate-limit.test.ts` (ใหม่), `docs/STATUS.md`, `docs/OPEN_LOOPS.md` (L13/L14)
