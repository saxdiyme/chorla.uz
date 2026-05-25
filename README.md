# Chorla.uz — Homepage (Next.js)

O'zbekiston uchun e'lonlar va auktsion bozori. Bu — bosh sahifa (homepage),
Visily dizayni asosida qurilgan. Next.js 14 (App Router) + React.

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda oching: http://localhost:3000

Production build:

```bash
npm run build
npm run start
```

## Struktura

```
app/
  layout.jsx        # shriftlar + meta
  page.jsx          # bosh sahifa (barcha seksiyalar)
  globals.css       # dizayn tokenlar + barcha stillar
components/
  Navbar.jsx        # yuqori panel (logo, qidiruv, Sotish)
  ProductCard.jsx   # oddiy mahsulot kartasi (holat bejisi bilan)
  AuctionCard.jsx   # auktsion kartasi (jonli taymer bilan)
lib/
  data.js           # TEST ma'lumotlar — keyin API/DB ga almashtiring
```

## Keyingi qadamlar

1. `lib/data.js` dagi test ma'lumotlarni real API yoki bazaga ulang
   (masalan, Next.js API routes — `app/api/...`).
2. Rasm o'rniga hozir emoji turibdi — `card-img` ichiga `<img>` qo'ying.
3. Sahifalar qo'shing: `/auctions`, `/listing/[id]`, `/sell`, `/login`.
4. Auktsion taymeri hozir frontda ishlaydi — real loyihada server vaqtidan
   (`endsAt` sanasi) hisoblang, toki foydalanuvchi vaqtini o'zgartira olmasin.

## Dizayn

- Brend rang: yashil (#16a34a), aksent: qizil (auktsion), to'q sariq (chegirma)
- Shriftlar: Manrope (asosiy), Sora (logo/sarlavha)
- To'liq responsive: desktop / planshet / mobil
