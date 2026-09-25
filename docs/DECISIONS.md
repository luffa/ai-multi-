# Decisions — Personal Site

> Lab 02 · สถานะ **Approved** — เจ้าของเว็บตัดสินข้อที่ขัดแย้งเองในแชท (คำตอบ `1ก 2ก 3ข 4ข 5ก 6ก`)
> ความเห็นดิบอยู่ใน [`DEBATE.md`](DEBATE.md) · ไฟล์นี้เก็บเฉพาะสิ่งที่อนุมัติแล้ว

## สรุปการโต้วาที

Brand Strategist ผลักให้ขายจุดเด่นว่าดูแลระบบห้องสมุดครบทั้งฐานข้อมูล แอป และเซิร์ฟเวอร์ และให้เน้นกลุ่มคนสายห้องสมุดเป็นหลัก
UX Critic ชี้ว่าข้อมูลยังพร้อมแค่ครึ่งเดียว เพราะ parser อ่านแค่บรรทัดแรก จึงเสนอเมนู 4 หน้า ใช้ป้ายภาษาไทย และค้าน Brand เรื่องคำซ้ำกับชื่อกลุ่ม
Devil's Advocate ชี้ความเสี่ยงที่มีอยู่ในโค้ดจริง คือ XSS ใน Guestbook และ error ดิบหลุดถึงผู้ใช้ รวมถึงการย้อนหาตัวตนและการอ้างเกินจริง และเสนอให้ตัด Must ลง
เจ้าของเลือกตาม Brand ในเรื่องข้อความ (tagline และการเก็บชื่อสถาบัน) เลือกตาม UX ในเรื่องโครงหน้า และเลือกตาม Devil ในเรื่องช่องทางติดต่อ
ส่วน Guestbook เก็บไว้ใน v1 แต่ต้องผ่านเงื่อนไขความปลอดภัยของ Devil ก่อน

## การตัดสินใจ (ตาราง)

| ID | หัวข้อ | ตัดสินใจ | เหตุผลสั้น | ใครเสนอ (Brand/UX/Devil) |
|----|--------|----------|------------|---------------------------|
| D1 | Tagline | ใต้ headline `Programmer@WALAI AutoLib` (คงเดิม) ใส่ tagline "ดูแลระบบห้องสมุดครบทั้งสาย — ฐานข้อมูล · แอปพลิเคชัน · เซิร์ฟเวอร์" | คำว่า "Programmer" คำเดียวบอกความสามารถน้อยกว่าจริง และคนนอกวงการไม่รู้จัก WALAI AutoLib · เจ้าของรับความเสี่ยง overclaim ที่ Devil ชี้ | Brand (Devil ค้าน · เจ้าของเลือก Brand) |
| D2 | ชื่อสถาบันใน Bio | เก็บ "มหาวิทยาลัยรัตนบัณฑิต" ไว้ใน Bio | เจ้าของยินดีเปิดเผย · รับความเสี่ยงย้อนหาตัวตนที่ Devil ชี้ | Brand (Devil ค้าน · เจ้าของเลือกเก็บ) |
| D3 | ช่องทางติดต่อ v1 | ใช้ **ลิงก์ GitHub อย่างเดียว** · ฟอร์ม Contact ยังไม่เปิดจนกว่าจะผ่านเงื่อนไขใน Out of scope | ฟอร์มเก็บข้อมูลส่วนบุคคล แต่ยังไม่มี validate ฝั่ง server, rate limit หรือช่องทางแจ้งเจ้าของ และ error ยังหลุด | Devil (UX เสนอให้ฟอร์มเป็นช่องทางหลัก) |
| D4 | หน้า Interests | จัด 6 ข้อเป็น 3 กลุ่ม **ฐานข้อมูล** (Oracle) · **แอปพลิเคชัน** (.NET, JavaScript) · **เซิร์ฟเวอร์** (Linux, Docker, k8s) · ป้ายหน้าบนเว็บ = "เทคโนโลยีที่ใช้" (route เดิม `/interests`) | ทำให้เห็นสามบทบาทด้วยตา · ใช้ชื่อกลุ่มของ UX เพราะชัดกว่า "ข้อมูล/สร้าง/รัน" และตรงกับ tagline | Brand + UX (Devil ค้านว่า overclaim) |
| D5 | Knowledge | รวมอยู่ในหน้า "เทคโนโลยีที่ใช้" ตั้งแต่ v1 · แต่ละเรื่องแสดงสรุปสั้นและบทความประกอบ 2 ลิงก์ | เจ้าของขอเนื้อหานี้เองตั้งแต่ Lab 01 · ไม่ต้องเพิ่มหน้าใหม่ | UX (Devil เสนอเลื่อนไป Later) |
| D6 | Guestbook | **มีใน v1** ลิงก์อยู่ที่ footer ไม่อยู่ในเมนูหลัก แต่ต้องผ่านเงื่อนไขทั้งหมด: แสดงผลแบบ escape (`textContent` ไม่ใช้ `innerHTML`) · validate ความยาวฝั่ง server · rate limit · ไม่โชว์อีเมลผู้เขียน | Guestbook คือช่องให้เพื่อนร่วมวงการทักทาย · XSS ที่ `guestbook.astro:29` มีอยู่จริง | เจ้าของ + เงื่อนไขจาก Devil · ตำแหน่ง footer จาก UX |
| D7 | เมนูหลัก (IA) | 4 เมนู: หน้าแรก · เกี่ยวกับผม · เทคโนโลยีที่ใช้ · ติดต่อ · Guestbook อยู่ที่ footer | ลด cognitive load และตรงกับ 4 หน้าที่มีอยู่แล้ว | UX |
| D8 | น้ำเสียง | "มืออาชีพแบบคนหน้างาน": ใช้ "ผม" (เปลี่ยนจาก "ฉัน" ในหน้าแรก) ประโยคสั้น ไม่ใช้คำโฆษณาเกินจริง ห้ามใช้คำว่า "คนเดียว" ศัพท์เทคนิคคงเป็นภาษาอังกฤษ | ให้บทบาทพูดแทนตัวเอง · ลด overclaim | Brand + Devil |
| D9 | สี | ขาวเป็นพื้นหลัก · แดงเป็นสีเน้น (ปุ่ม, ลิงก์, หัวข้อ) · ชมพูเป็นสีรองแบบเบาเท่านั้น · ห้ามตัวหนังสือหรือปุ่มชมพูบนพื้นขาว · contrast ต้องผ่าน WCAG AA | ชมพูเสี่ยงดูไม่จริงจังและอ่านยาก | Brand + UX |
| D10 | ความเป็นส่วนตัว | ไม่มีนามสกุล · ไม่มีปีที่เริ่มเรียน/ทำงาน · ไม่มีตัวเลข "ทำงานมา X ปี" · ไม่มีรายละเอียดระบบภายใน (hostname, IP, schema, เวอร์ชัน) · footer ทุกหน้ามีข้อความ "ความเห็นส่วนตัว ไม่ได้พูดแทนมหาวิทยาลัย" | ตามที่เจ้าของกำหนดใน Lab 01 และข้อ Avoid | ทั้ง 3 มุมเห็นตรงกัน |
| D11 | ข้อความที่ห้ามโชว์บนเว็บ | ไม่แสดง `demo@example.com`, บรรทัด Audience หรือ error ดิบ (`err.message`) · ผู้ใช้เห็นแค่ข้อความกลาง เช่น "ส่งไม่สำเร็จ ลองใหม่อีกครั้ง" | Audience เป็นข้อมูลภายใน · อีเมลเป็น placeholder · error อาจทำให้ชื่อตาราง/SQL หลุด (`public-site-safe`) | UX + Devil |
| D12 | Parser `profile.ts` | ต้องแก้ให้อ่านทุกบรรทัดของแต่ละ section ก่อน ship · เป็น blocker ของ Lab 04 | ตอนนี้ Interests ขึ้นแค่ "Oracle" และ Bio ขึ้นแค่ย่อหน้าแรก ซึ่งทำให้คนอ่านเข้าใจผิด | UX (ทั้ง 3 มุมเห็นตรงกัน) |
| D13 | ลำดับผู้อ่าน | หลัก: คนสาย IT ห้องสมุด + ห้องสมุดอื่น + ทีมในมหาวิทยาลัย · รอง: ผู้ว่าจ้าง · เสริม: นักศึกษา · แต่โครงเว็บต้องใช้ได้กับคนนอกวงการ | ความเฉพาะทางด้านห้องสมุดคือจุดต่าง · UX เตือนว่าคนนอกวงการหลงง่ายที่สุด | Brand + UX |
| D14 | เจ้าของ `src/lib/profile.ts` | **Claude / frontend** เป็นเจ้าของ parser · `src/pages/api/interests.ts` ยังเป็นของ OpenCode / backend · type `Profile` คือสัญญาร่วม: เพิ่มฟิลด์ได้ · เปลี่ยนหรือลบฟิลด์เดิม (`name`, `headline`, `bio`, `audience`, `interests`) ต้องแจ้งใน handoff | ไฟล์นี้ไม่มี SQLite หรือ logic ของ API · แยกตามหน้าที่แทนการแยกไฟล์ เพื่อไม่ให้มี parser ซ้ำสองชุด (ปิด L3) | เจ้าของ (Lab 04) |

## การแก้ PROFILE.md รอบนี้

- เพิ่ม `## Tagline` ต่อจาก Headline ตาม D1 (parser ยังไม่อ่านหัวข้อนี้ → Lab 04)
- ปรับ `## Tone` ตาม D8/D9: น้ำเสียงเป็น "มืออาชีพแบบคนหน้างาน" และระบุลำดับสี ขาว/แดง/ชมพู
- **ไม่แก้** Headline, Bio, Interests (list ยังเรียงแบบเดิม · การจัดกลุ่มตาม D4 เป็นงานแสดงผลของ Lab 04)

## สิ่งที่เลื่อนออก (Out of scope v1)

- ฟอร์ม Contact — เปิดได้เมื่อมีครบ: validate ฝั่ง server · rate limit · error ไม่หลุด · ข้อความแจ้งการใช้ข้อมูล · มีวิธีให้เจ้าของรู้ว่ามีข้อความเข้า (D3)
- หน้า "WALAI AutoLib ในมุมผม"
- Notes / บทความเทคนิค Oracle, Linux
- เวอร์ชันภาษาอังกฤษ
- ดึงรายการ repo จาก GitHub อัตโนมัติ
- Dark mode
- CMS / blog · ระบบ login / admin (รวมถึงหน้า moderation ของ Guestbook — v1 ลบข้อความโดยตรงที่ฐานข้อมูล)
- ประโยค "ผมใช้ X เพื่อ…" ใน Knowledge — ถ้าจะเพิ่มภายหลัง ต้องพูดแค่ระดับทักษะ ไม่ลงรายละเอียดระบบ

## เกณฑ์พร้อม Frontend (Lab 04)

- Parser แก้แล้ว (D12) และมี test ยืนยันว่า Bio ได้ครบ 3 ย่อหน้า และ Interests ได้ครบ 6 ข้อ
- 4 หน้าตามเมนู D7 render จาก `PROFILE.md` · หน้าแรกมี headline + tagline (D1) · หน้า "เทคโนโลยีที่ใช้" แสดง 3 กลุ่ม + Knowledge (D4/D5)
- ไม่มี `demo@example.com`, บรรทัด Audience, error ดิบ, ปี หรือนามสกุลบนหน้าเว็บ (D10/D11) · footer มีข้อความความเห็นส่วนตัว
- Guestbook แสดงผลด้วย `textContent` (D6 ฝั่ง UI) · ส่วน validate + rate limit ฝั่ง API เป็นงานของ OpenCode ใน Lab 05
- สีผ่าน contrast AA ตาม D9 · ข้อความใช้ "ผม" ตาม D8

## Lab 03 — Issues จาก Decisions

สร้างผ่าน GitHub MCP (`issue_write`) ทั้ง 7 ใบใน `luffa/ai-multi-` · ตรวจซ้ำด้วย `gh issue list`

| Issue # | Title | มาจาก Decision | ปิดใน Lab · Owner |
|---|---|---|---|
| #1 | [D12] Fix PROFILE parser to read multi-line sections | D12 (+D1, D5) | 04 · รอ L3 |
| #2 | [D1][D7][D8] Home hero, 4-item nav and "ผม" voice | D1, D7, D8, D13 | 04 · Claude |
| #3 | [D9] Theme: white base, red accent, AA contrast | D9 | 04 / 06 · Claude |
| #4 | [D4][D5] "เทคโนโลยีที่ใช้" page: 3 groups + Knowledge | D4, D5 | 04 · Claude |
| #5 | [D6] Guestbook UI: render entries with textContent | D6 (UI) | 04 · Claude |
| #6 | [D6][D11] Guestbook/Contact API: validation, rate limit, no raw errors | D6 (API), D11 | 05 · OpenCode |
| #7 | [D3][D10] Contact = GitHub link only · privacy footer · hide placeholders | D3, D10, D11 | 04 · Claude |

ลำดับทำ: #1 ก่อน (blocker) → #2–#5, #7 (Lab 04) · #6 (Lab 05)

## Lab 03 — MCP vs gh

- **ความเร็ว:** MCP สร้าง issue ได้ในคำสั่งเดียว ส่ง body markdown ภาษาไทยยาว ๆ ได้โดยไม่ต้อง escape shell · `gh` เร็วกว่าสำหรับงานสั้น (`gh issue list` / `view`) แต่ body ยาวควรใช้ `--body-file`
- **สิทธิ์:** MCP ใช้ PAT จาก `GITHUB_PERSONAL_ACCESS_TOKEN` (`.mcp.json`) · `gh` ใช้ OAuth login ใน keyring — เป็น credential คนละชุด scope ต่างกันได้ ต้องตรวจทั้งคู่ · repo ปลายทางต้องเป็นของผู้เรียน ไม่ใช่ `Onto-IQ/*`
- **Audit trail:** ทั้งสองทางสร้าง issue ในนามบัญชีเดียวกัน (`luffa`) บน GitHub แยกไม่ออกว่าใครสั่ง · ร่องรอยฝั่ง MCP อยู่ใน transcript ของ Claude session ส่วนฝั่ง `gh` อยู่ใน shell history — จึงควรอ้าง D-id ใน title/body เสมอ
- **ข้อผิดพลาดที่เจอ:** ตอน Lab 00 GitHub MCP โหลดรายการ tools ไม่ทันเวลา (timeout) ต้องเปิด `claude` ใหม่ · `gh repo set-default` ยังไม่ได้ตั้ง แต่ `gh` เดา repo จาก remote ได้ · ลิงก์ `docs/DECISIONS.md` ใน issue จะ 404 จนกว่าจะ push
- **เมื่อไหร่ใช้อะไร:** ใช้ MCP เมื่อให้ agent แปลงเอกสารเป็น issue ทีละหลายใบ · ใช้ `gh` สำหรับตรวจผล สคริปต์ (`npm run create-issues`) CI และงานที่คนทำเอง
