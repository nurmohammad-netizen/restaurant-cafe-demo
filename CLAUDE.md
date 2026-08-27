# COD Landing Page Series — Master Blueprint
*একবার সেট করো, প্রতিটা প্রজেক্টে reuse করো। এই ফাইলটা প্রতিটা প্রজেক্ট ফোল্ডারে `CLAUDE.md` নামে কপি রাখো — Claude Code প্রতি session শুরুতেই এটা পড়ে নেবে, বারবার explain করা লাগবে না।*

---

## 🎯 Vision
৫টা COD (Cash on Delivery) landing page demo বানানো হচ্ছে বাংলাদেশি লোকাল দোকানদের জন্য। উদ্দেশ্য: শেখা + demo হিসেবে দেখানো + ভালো লাগলে বিক্রি করা → পরবর্তীতে একটা professional e-commerce service হিসেবে বড় করা।

## 📋 প্রজেক্ট সিকোয়েন্স (সহজ → জটিল)

| # | Business | নতুন যা শিখবে | Tool |
|---|---|---|---|
| 1 | Restaurant/Cafe | Full base system (order form + admin + auth) | Desktop App |
| 2 | Medicine/Pharmacy | File upload (prescription), OTC vs Rx আলাদা করা | Desktop App |
| 3 | Hardware/Electric | Multiple products + simple cart | VS Code |
| 4 | Mudi Dokan (Grocery) | অনেক প্রোডাক্ট + দ্রুত দাম আপডেট | VS Code |
| 5 | Clothing | Relational DB (size/color variants, multi-image) | VS Code |

## 🔧 Common Tech Stack (সব ৫টাতেই একই)
- **Frontend:** Next.js 14+ (App Router) + Tailwind CSS
- **Database/Auth/Storage:** Supabase (Postgres)
- **Hosting:** Vercel
- **Editor:** VS Code বা Claude Desktop App (দুটোই সমান কার্যকর — যেটা comfortable সেটা ব্যবহার করা যাবে)

## 🗄️ Database Convention (সব ৫টাতেই মানতে হবে)
- **প্রতিটা টেবিলে `shop_id` কলাম বাধ্যতামূলক**, এমনকি একটামাত্র দোকান থাকলেও — ভবিষ্যতে multi-tenant migration সহজ করার জন্য
- **Row Level Security (RLS) সবসময় enable** — public শুধু read করতে পারবে active প্রোডাক্ট, admin (authenticated) সব করতে পারবে
- Orders টেবিলে অবশ্যই `status` ফিল্ড থাকবে (pending → confirmed → preparing/processing → delivered)

## 🧩 Component Convention (সব ৫টাতেই মানতে হবে)
- `ProductCard` / `MenuItemCard` — প্রোডাক্ট দেখানোর জন্য, আলাদা ফাইল
- `OrderForm` / `CartDrawer` — অর্ডার নেওয়ার জন্য, আলাদা ফাইল
- `AdminTable` — admin panel এ ডেটা ম্যানেজ করার জন্য, আলাদা ফাইল
- Business logic ও UI যতটা সম্ভব আলাদা রাখা

## 🔐 Security Checklist (সব ৫টাতেই মানতে হবে)
- [ ] Admin route middleware দিয়ে protected (`/admin/*`)
- [ ] Supabase RLS policy সেট করা প্রতিটা টেবিলে
- [ ] Input validation (Zod/Yup) admin ও order form দুই জায়গাতেই
- [ ] `.env.local` এ সব secret key, `.gitignore` এ `.env*` যোগ করা

## 🎨 যা প্রতিটা প্রজেক্টে আলাদা হবে (business-specific)

| Business | বিশেষ ফিচার | Color Theme Direction |
|---|---|---|
| Restaurant/Cafe | Category-wise menu, order status tracking | Warm/Amber (আন্তরিক, ক্ষুধা জাগানো) |
| Medicine/Pharmacy | Prescription image upload, OTC/Rx ট্যাগ, disclaimer | সবুজ/নীল (বিশ্বাসযোগ্য, ক্লিনিক্যাল) |
| Hardware/Electric | Model/spec ফিল্ড, "custom query" ছবি আপলোড | ধূসর/হলুদ (industrial) |
| Mudi Dokan | Quantity/weight selector, দ্রুত price edit admin এ | সবুজ/প্রাকৃতিক |
| Clothing | Size + color variant, multi-image gallery, exchange policy section | Brand অনুযায়ী কাস্টম |

## 🔄 Continuity Rule (চ্যাট/সেশন লম্বা হলে করণীয়)
- Claude Code সেশনে ৪৫-৬০ মিনিট পার হলে বা repetition/ভুল দেখা দিলে → `/compact` কমান্ড চালাও
- নতুন প্রজেক্ট শুরু করার আগে → নতুন session/`/clear` ব্যবহার করো
- এই Claude.ai চ্যাটে বড় সিদ্ধান্ত নেওয়ার আগে → এই ফাইলটা reference হিসেবে উল্লেখ করো ("Master Blueprint অনুযায়ী...")
- প্রতিটা demo সম্পূর্ণ হলে → screenshot/link শেয়ার করে review করানো, তারপর পরেরটায় যাওয়া

## 💰 Business Side (পরে আলোচনা হবে, এখন noted রাখা হলো)
- Pricing model ঠিক হবে প্রথম ২টা ডেমো শেষ হওয়ার পর (real time/cost ডেটা লাগবে)
- One-time vs retainer maintenance — decision pending
- Reusable template approach বিবেচনায় রাখা হচ্ছে যাতে future client customization সহজ হয়
