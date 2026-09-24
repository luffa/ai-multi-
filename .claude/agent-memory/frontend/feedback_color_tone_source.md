---
name: color-tone-source
description: Where the site's main color/tone comes from — `## Tone` in docs/PROFILE.md, fallback to existing CSS tokens in BaseLayout.astro; never invent colors
metadata:
  type: feedback
---

สี/โทนหลักของเว็บยึดหัวข้อ `## Tone` ใน `docs/PROFILE.md` เป็นแหล่งจริงเสมอ
ถ้า `## Tone` ยังไม่มี (PROFILE ยังเป็น stub ก่อน Lab 01) ให้ใช้ CSS tokens เดิมใน `src/layouts/BaseLayout.astro` (`:root` — `--bg`, `--card`, `--text`, `--muted`, `--accent`, `--border`) และ**ห้ามเดาสีเอง**

**Why:** ผู้เรียนสั่งให้จำ (2026-09-24) — โทนต้องสะท้อน PROFILE ที่ได้จาก Lab 01 interview ไม่ใช่รสนิยมของ agent
**How to apply:** ก่อนแตะสี/ธีม/สไตล์ ให้เช็คว่า PROFILE มี `## Tone` แล้วหรือยัง; ถ้ามีแล้วแต่ขัดกับ tokens เดิม ให้เสนอแก้ tokens ใน `:root` ตาม Tone (แก้ที่เดียว ไม่ hardcode สีในหน้า) และถ้า Tone ไม่ระบุค่าสีชัด ให้ถามผู้เรียนก่อน ดู [[public-site-safe]]
