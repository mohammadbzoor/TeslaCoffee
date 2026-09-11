<div align="center">

# ☕ Tesla Coffee — Web Application & Digital Menu

[![React Version](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%7C%20Auth%20%7C%20Hosting-orange?logo=firebase)](https://firebase.google.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.7-purple?logo=bootstrap)](https://getbootstrap.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.19.1-pink?logo=framer)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**منصة إلكترونية متكاملة لإدارة وعرض منيو كافيه ومطعم "Tesla Coffee"، مدعومة بنظام طلبات سريعة، لوحة تحكم إدارية تفاعلية، ومزامنة سحابية فورية.**

[المميزات](#-المميزات-الرئيسية--key-features) •
[التقنيات المستخدمة](#-التقنيات-المستخدمة--tech-stack) •
[هيكل المشروع](#-هيكل-المشروع--project-structure) •
[طريقة التشغيل](#-طريقة-التثبيت-والتشغيل--getting-started) •
[لوحة التحكم](#-لوحة-التحكم-والإدارة--admin-dashboard) •
[النشر](#-النشر--deployment)

---

</div>

## 🌟 نبذة عن المشروع | Overview

تطبيق **Tesla Coffee** هو نظام ويب رقمي عصري مخصص للمقاهي والمطاعم الفاخرة. يتيح للعملاء استعراض قائمة المنتجات والمشروبات والحلويات والعروض الحصرية بتصميم داكن فاخر (Dark Luxury Theme)، مع إمكانية إضافة المنتجات إلى السلة وإرسال الطلبات مباشرة عبر الواتساب.

كما يشتمل على **لوحة تحكم للمدير (Admin Dashboard)** تتيح إدارة المنتجات (إضافة، تعديل، حذف)، رفع وقص الصور عبر السحابة، ومتابعة إحصائيات المبيعات اليومية في الوقت الفعلي عبر **Google Firebase Firestore**.

---

## ✨ المميزات الرئيسية | Key Features

### 🛍️ تجربة المستخدم والعملاء (Client Experience)
- **واجهة مستخدم عصرية (Dark & Luxury UI):** ألوان متناسقة بدرجات القهوة والكراميل الذهبية (`#df8b46`, `#b45b35`) وتأثيرات حركية تفاعلية باستخدام Framer Motion.
- **تصفح سريع وتصنيفات مرنة:** إمكانية تصفية المنتجات حسب الفئات (مشروبات ساخنة، مشروبات باردة، حلويات، عروض مميزة) وبحث لحظي فوري (Live Search).
- **عروض حصرية (Special Offers):** قسم خاص لعروض الخصم مع إبراز نسبة التوفير والسعر قبل وبعد الخصم.
- **سلة مشتريات ديناميكية (Interactive Cart):** حفظ المشتريات تلقائياً، تعديل الكميات بسهولة، وحساب الإجمالي فورياً.
- **طلب فوري عبر واتساب (WhatsApp Checkout):** تحويل سلة المشتريات إلى رسالة مهيأة ومنظمة تحتوي على تفاصيل الأصناف والكميات والعنوان ليتم إرسالها لرقم الكافيه بنقرة واحدة.

### 🔐 إدارة الحسابات والأمان (Authentication & Security)
- تسجيل دخول وإنشاء حساب للعملاء والمدراء عبر **Firebase Authentication**.
- حماية المسارات الحساسة (`ProtectedRoute`) لحظر الوصول غير المصرح به لصفحات الإدارة.
- مزامنة سلة المشتريات وسجل الحركات مع هوية المستخدم (User UID).

### 🛠️ لوحة تحكم المدير (Admin Dashboard)
- **إدارة المنيو:** إضافة أصناف جديدة، تعديل الأسعار، تغيير الصور والتفاصيل، وحذف الأصناف.
- **معالجة وقص الصور السحابية:** أداة مدمجة لقص وضبط قياسات صور المنتجات (`react-easy-crop`) ورفعها مباشرة إلى **Firebase Storage**.
- **مزامنة فورية (Real-time Firestore):** تنعكس أي تعديلات على قائمة المنتجات لحظياً لدى جميع العملاء دون الحاجة لإعادة تحميل الصفحة (`onSnapshot`).
- **تحليلات وتقارير يومية:** جداول وإحصائيات لملخص الطلبات والإيرادات.

---

## 💻 التقنيات المستخدمة | Tech Stack

| المجال | التقنية | الوصف |
| :--- | :--- | :--- |
| **Frontend Framework** | `React 19` | مكتبة واجهة المستخدم التفاعلية |
| **Routing** | `React Router DOM v7` | إدارة المسارات والتنقل بين الصفحات |
| **Styling & UI** | `Bootstrap 5` & `React-Bootstrap` | نظام التصميم وتخطيط الصفحات المتجاوب |
| **Animations** | `Framer Motion` | الحركات والانتقالات الجمالية التفاعلية |
| **Icons** | `React Icons` & `FontAwesome` | حزم الأيقونات المتنوعة |
| **Backend & Database**| `Google Firebase` | قاعدة بيانات `Firestore` السحابية اللحظية |
| **Authentication** | `Firebase Auth` | إدارة المصادقة والمستخدمين |
| **Media Storage** | `Firebase Storage` | تخزين وسائط وصور المنتجات |
| **Image Processing** | `react-easy-crop` | قص وضبط أبعاد الصور قبل الرفع |

---

## 📁 هيكل المشروع | Project Structure

```text
MenuFood/
├── .gitignore                      # ملف استثناء الملفات والاعتماديات
├── README.md                       # التوثيق الشامل للمشروع
└── menu/                           # مجلد تطبيق React الأساسي
    ├── .firebaserc                 # إعدادات مشروع Firebase
    ├── firebase.json               # إعدادات الاستضافة Firebase Hosting
    ├── package.json                # التبعيات وأوامر التشغيل
    ├── public/                     # الملفات الثابتة (HTML, Favicon, Logos)
    └── src/
        ├── App.js                  # المكون الرئيسي وموزع المسارات
        ├── index.js                # نقطة الانطلاق لتطبيق React
        ├── index.css               # التنسيقات العامة والهوية البصرية
        ├── components/             # مكونات واجهة المستخدم
        │   ├── HeroSection.js      # قسم الترحيب والهوية البصرية الرئيسي
        │   ├── Navbar/             # شريط التنقل العلوي وسلة المشتريات
        │   ├── CardList/           # عرض قائمة كروت المنتجات
        │   ├── about/              # نبذة عن كافيه تسلا
        │   ├── admin/              # مكونات لوحة تحكم المدير
        │   ├── auth/               # نماذج تسجيل الدخول والحماية
        │   └── footer/             # تذييل الصفحة وروابط التواصل
        ├── pages/                  # الصفحات الأساسية
        │   ├── Home.js             # الصفحة الرئيسية
        │   ├── cart.js             # صفحة سلة المشتريات وإتمام الطلب
        │   ├── offers.js           # صفحة العروض والتخفيضات
        │   └── AdminDashboard.js   # لوحة تحكم الإدارة
        ├── firebase/               # ملف تهيئة Firebase SDK
        ├── utils/                  # دوال المساعدة والسياق (Contexts)
        │   ├── AuthContext.js      # سياق إدارة حالة المستخدم والجلسة
        │   ├── CartContext.js      # سياق إدارة محتويات السلة
        │   ├── functionFirebase.js # دوال الاتصال بقاعدة Firestore
        │   └── orderHelpers.js     # دوال معالجة الطلبات
        └── data/                   # بيانات البداية والبيانات الثابتة
```

---

## 🚀 طريقة التثبيت والتشغيل | Getting Started

### المتطلبات الأساسية (Prerequisites)
- [Node.js](https://nodejs.org/) (الإصدار 18 أو أحدث)
- [Git](https://git-scm.com/)

### 1. استنساخ المستودع (Clone Repository)
```bash
git clone https://github.com/mohammadbzoor/TeslaCoffee.git
cd TeslaCoffee/menu
```

### 2. تثبيت الحزم والاعتماديات (Install Dependencies)
```bash
npm install
```

### 3. إعداد Firebase (Firebase Setup)
الملف `menu/src/firebase/firebese.js` مهيأ مسبقاً بمشروع الـ Firebase الخاص بالتطبيق (`teslacoffee-04`). في حال رغبت بربط مشروعك الخاص:
1. أنشئ مشروعاً جديداً في [Firebase Console](https://console.firebase.google.com/).
2. قم بتفعيل:
   - **Authentication** (Email/Password).
   - **Cloud Firestore**.
   - **Cloud Storage**.
3. قم بتحديث بيانات الاتصال في `menu/src/firebase/firebese.js`.

### 4. تشغيل خادم التطوير المحلي (Run Locally)
```bash
npm start
```
سيفتح التطبيق تلقائياً في المتصفح على: [http://localhost:3000](http://localhost:3000)

### 5. بناء نسخة الإنتاج (Production Build)
```bash
npm run build
```

---

## 📊 لوحة التحكم والإدارة | Admin Dashboard

- للوصول إلى لوحة التحكم، توجه إلى الرابط: `/admin-dashboard` بعد تسجيل الدخول بحساب يحمل صلاحيات المدير (`isAdmin = true`).
- يمكن إضافة منتجات جديدة وتحديد فئتها وسعرها وصورتها من خلال صفحة `/add`.
- يتم احتساب التقارير اليومية وتحديث المخزون بشكل فوري.

---

## 🌐 النشر والاستضافة | Deployment

التطبيق جاهز بالكامل للنشر الفوري عبر **Firebase Hosting**:

1. تأكد من تثبيت Firebase CLI:
```bash
npm install -g firebase-tools
```

2. تسجيل الدخول إلى Firebase:
```bash
firebase login
```

3. بناء ونشر المشروع:
```bash
cd menu
npm run build
firebase deploy
```

---

## 📞 التواصل والدعم | Contact & Support

- **الموقع:** الأردن - المفرق - الخالدية
- **هاتف / واتساب:** `0785865610`
- **إنستغرام:** [@t.cofe.1](https://www.instagram.com/t.cofe.1?igsh=emMyeTZ2MWtoODA4)

---

<div align="center">
  <sub>تم تطوير وصيانة المشروع بكل شغف لتقديم أفضل تجربة لعشاق القهوة ☕ © Tesla Coffee</sub>
</div>