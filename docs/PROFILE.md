# PROFILE

## Name
สุรเดช

## Headline
Programmer@WALAI AutoLib

## Bio
ผมเป็น DBA, Programmer และ System Admin ประจำมหาวิทยาลัยวลัยลักษณ์ ดูแลงานตั้งแต่ฐานข้อมูล ตัวแอปพลิเคชัน ไปจนถึงเซิร์ฟเวอร์ที่ระบบทำงานอยู่

ผมเริ่มต้นเส้นทางสายโปรแกรมมิ่งตั้งแต่สมัยเรียนที่มหาวิทยาลัยรัตนบัณฑิต และได้เข้าร่วมงานที่นี่หลังสำเร็จการศึกษา

ปัจจุบันผมทำงานเป็นโปรแกรมเมอร์ของระบบห้องสมุดอัตโนมัติ WALAI AutoLib

## Audience
เพื่อนร่วมวงการ IT และห้องสมุด, ทีมงานในมหาวิทยาลัย, ห้องสมุดอื่นที่สนใจระบบ WALAI AutoLib, นักศึกษา และผู้ว่าจ้าง/บริษัท

## Interests
- Oracle
- Linux
- .NET
- Docker
- k8s
- JavaScript

## Contact
- email: demo@example.com
- github: https://github.com/luffa

## Tone
- สีหลัก / บรรยากาศ: แดง · ชมพู · ขาว
- น้ำเสียง: มืออาชีพ

## Knowledge
ความรู้พื้นฐานของเทคโนโลยีที่ผมใช้และสนใจ สรุปจากเอกสารทางการของแต่ละโครงการ

### Oracle
Oracle Database เป็นระบบจัดการฐานข้อมูลเชิงสัมพันธ์ (RDBMS) ที่ใช้ภาษา SQL ในการเรียกดูและจัดการข้อมูล จุดเด่นคือการรับประกัน transaction แบบ "all or nothing" คือสำเร็จทั้งชุดหรือยกเลิกทั้งชุด และใช้กลไก lock ควบคุมการเข้าถึงข้อมูลพร้อมกันของผู้ใช้หลายคนโดยข้อมูลไม่เสียหาย สำหรับงาน DBA ความเข้าใจเรื่อง transaction และ concurrency คือหัวใจของการดูแลระบบให้ถูกต้องและเสถียร
อ่านต่อ: https://docs.oracle.com/en/database/
บทความประกอบ:
- [Introduction to Oracle Database](https://docs.oracle.com/en/database/oracle/oracle-database/23/cncpt/introduction-to-oracle-database.html) — ภาพรวม RDBMS, SQL และสถาปัตยกรรม
- [Transactions](https://docs.oracle.com/en/database/oracle/oracle-database/23/cncpt/transactions.html) — commit/rollback และหลัก "all or nothing"

### Linux
Linux เป็นระบบปฏิบัติการตระกูล Unix ที่ Linus Torvalds เริ่มพัฒนา ออกแบบให้สอดคล้องกับมาตรฐาน POSIX รองรับ multitasking, virtual memory และระบบเครือข่าย ทำงานได้บนสถาปัตยกรรมหน่วยประมวลผลหลากหลายทั้ง 32 และ 64 บิต จึงเป็นรากฐานของเซิร์ฟเวอร์และระบบคลาวด์ส่วนใหญ่ในปัจจุบัน
อ่านต่อ: https://www.kernel.org/linux.html
บทความประกอบ:
- [The Linux command line for beginners](https://ubuntu.com/tutorials/command-line-for-beginners) — เริ่มใช้ terminal ทีละขั้น
- [Ubuntu Server documentation](https://documentation.ubuntu.com/server/) — การดูแลเซิร์ฟเวอร์ Linux จริง

### .NET
.NET เป็นแพลตฟอร์มพัฒนาซอฟต์แวร์ที่ฟรี เป็น open source (MIT license) และทำงานข้ามแพลตฟอร์มได้ รองรับหลายภาษา โดย C# เป็นภาษาหลัก มีระบบจัดการหน่วยความจำอัตโนมัติ (garbage collector) และรองรับงานแบบ asynchronous ด้วย `async`/`await` ใช้สร้างได้ทั้ง web API (ASP.NET Core), แอปเดสก์ท็อป และบริการบนคลาวด์ โดยออกเวอร์ชันใหม่ทุกเดือนพฤศจิกายน
อ่านต่อ: https://learn.microsoft.com/dotnet/core/introduction
บทความประกอบ:
- [What is .NET?](https://dotnet.microsoft.com/en-us/learn/dotnet/what-is-dotnet) — ภาพรวมแพลตฟอร์มและประเภทแอป
- [Create a web API with ASP.NET Core](https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api) — ลงมือสร้าง API ตัวแรก

### Docker
Docker เป็นแพลตฟอร์มเปิดสำหรับพัฒนา ส่งมอบ และรันแอปพลิเคชัน โดยแยกแอปออกจากโครงสร้างพื้นฐานของเครื่อง image คือแม่แบบแบบอ่านอย่างเดียว ส่วน container คือตัวที่รันจริงจาก image นั้น ซึ่งบรรจุทุกอย่างที่แอปต้องใช้ไว้ครบ ผลคือแอปทำงานเหมือนกันทุกสภาพแวดล้อม และใช้ทรัพยากรน้อยกว่า virtual machine แบบดั้งเดิม
อ่านต่อ: https://docs.docker.com/get-started/docker-overview/
บทความประกอบ:
- [What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/) — container คืออะไร ต่างจาก VM อย่างไร
- [What is an image?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/) — image กับ layer

### k8s
Kubernetes (k8s) เป็นแพลตฟอร์ม open source สำหรับจัดการ workload และ service ที่รันเป็น container ผ่านการประกาศสถานะที่ต้องการ (declarative configuration) และระบบอัตโนมัติ ความสามารถหลักคือ self-healing (รีสตาร์ตหรือแทนที่ container ที่ล้มเหลว), การ scale ตามโหลด และการ rollout/rollback เวอร์ชันแบบค่อยเป็นค่อยไป รวมถึง service discovery, load balancing และการจัดการ secret
อ่านต่อ: https://kubernetes.io/docs/concepts/overview/
บทความประกอบ:
- [Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/) — tutorial deploy, scale และ update แอป
- [Pods](https://kubernetes.io/docs/concepts/workloads/pods/) — หน่วยที่เล็กที่สุดของ k8s

### JavaScript
JavaScript เป็นภาษาโปรแกรมที่มี first-class functions และรองรับหลายกระบวนทัศน์ ทั้งแบบ imperative, functional และ object-oriented เป็นที่รู้จักในฐานะภาษาของหน้าเว็บ แต่ก็ทำงานนอกเบราว์เซอร์ได้ด้วย เช่น Node.js โดยตัวภาษาอ้างอิงมาตรฐาน ECMAScript (ECMA-262)
อ่านต่อ: https://developer.mozilla.org/en-US/docs/Web/JavaScript
บทความประกอบ:
- [What is JavaScript?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript) — JS ทำอะไรบนหน้าเว็บ
- [JavaScript Guide: Introduction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction) — พื้นฐานภาษาและ ECMAScript

## Brainstorm

### Must
- หน้าแรก: ชื่อ + Headline + ปุ่ม "ดู GitHub" / "ติดต่อ"
- หน้า About: แสดง Bio ครบ 3 ย่อหน้า (ต้องแก้ parser `profile.ts` ก่อน)
- หน้า Interests: การ์ด 6 ใบ ลิงก์ไปเนื้อหา Knowledge ของแต่ละเรื่อง
- หน้า Contact: ฟอร์มบันทึกลง SQLite (Lab 05) + ลิงก์ GitHub
- ธีมแดง/ชมพู/ขาว ที่ contrast ผ่านเกณฑ์ a11y

### Nice
- หน้า Knowledge: สรุป 6 เรื่อง พร้อมบทความประกอบเรื่องละ 2 ลิงก์
- Guestbook ให้เพื่อนร่วมวงการทักทาย
- หน้า "WALAI AutoLib ในมุมผม" — บทบาทในระบบ เท่าที่เปิดเผยได้
- เส้นทางอาชีพแบบไม่ระบุปี: เรียน → เข้าร่วมงาน → บทบาทปัจจุบัน

### Later
- Notes / บทความสั้นเรื่องเทคนิค Oracle, Linux
- เวอร์ชันภาษาอังกฤษสำหรับผู้ว่าจ้าง
- ดึงรายการ repo จาก GitHub มาแสดงอัตโนมัติ
- Dark mode

### About angles
- สามบทบาทในคนเดียว — DBA + Programmer + SysAdmin (สำหรับผู้ว่าจ้าง)
- จากห้องเรียนสู่ห้องสมุด — รัตนบัณฑิต → วลัยลักษณ์ ไม่ระบุปี (สำหรับนักศึกษา)
- คนเบื้องหลังระบบห้องสมุด — เน้น WALAI AutoLib และผู้ใช้ (สำหรับห้องสมุดอื่น / ทีมในมหาวิทยาลัย)

### Avoid
- นามสกุล, ปีที่เริ่มเรียน/เริ่มงาน และตัวเลข "ทำงานมา X ปี"
- ข้อมูลระบบภายใน: hostname, IP, schema, เวอร์ชันซอฟต์แวร์, ภาพหน้าจอ admin, ข้อมูลผู้ใช้ห้องสมุด
- อีเมลจริง / เบอร์โทร · Guestbook ต้องกันสแปมและ XSS ไม่โชว์อีเมลผู้เขียน
- ใช้โลโก้หรือพูดแทนมหาวิทยาลัย — ระบุว่าเป็นความเห็นส่วนตัว
- คัดลอกเอกสารทั้งท่อน — สรุปแล้วใส่ลิงก์แทน
- Scope บวม: CMS/blog, ระบบ login/admin, หลายภาษา — ยังไม่ทำรอบนี้
