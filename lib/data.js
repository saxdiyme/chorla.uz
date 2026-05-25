// Тестовые данные для homepage. Позже заменишь на данные из API / БД.

export const categories = [
  { name: "Chegirmalar", icon: "Tag", color: "#e11d48" },
  { name: "Uy & Xizmat", icon: "Home", color: "#16a34a" },
  { name: "Ko'chmas mulk", icon: "Building2", color: "#f97316" },
  { name: "Avtomobillar", icon: "Car", color: "#2563eb" },
  { name: "Telefon & Gadjet", icon: "Smartphone", color: "#0f172a" },
  { name: "Ayollar modasi", icon: "Shirt", color: "#db2777" },
  { name: "Erkaklar modasi", icon: "ShoppingBag", color: "#0891b2" },
  { name: "Hashamat", icon: "Gem", color: "#f59e0b" },
];

export const trendingChips = [
  "Velosiped",
  "Stol",
  "iPhone",
  "Gaming Laptop",
  "Krossovka",
  "PlayStation",
];

// condition: new | open | used | damaged
export const trending = [
  { id: 1, emoji: "🚲", title: "Specialized tog' velosipedi 29\"", seller: "akmaljon", time: "15 daq", price: "8 500 000", cond: "new", protect: false },
  { id: 2, emoji: "🪑", title: "Yog'och qahva stoli", seller: "dilnoza", time: "1 soat", price: "1 250 000", cond: "used", protect: true },
  { id: 3, emoji: "🚗", title: "Chevrolet Cobalt 2021", seller: "avto_uz", time: "3 soat", price: "168 000 000", cond: "used", protect: false },
  { id: 4, emoji: "📱", title: "iPhone 15 Pro Max 256GB", seller: "tech_store", time: "5 soat", price: "15 400 000", cond: "new", protect: true },
  { id: 5, emoji: "💻", title: "Gaming Laptop RTX 4060", seller: "sardor_b", time: "1 kun", price: "18 900 000", cond: "open", protect: true },
];

export const auctions = [
  { id: 101, emoji: "⌚", title: "Klassik mexanik soat — original", seller: "soatlar", endsInSec: 2 * 3600 + 15 * 60, bid: "1 200 000", bids: 7, buyNow: "3 500 000" },
  { id: 102, emoji: "📷", title: "Vintage plyonkali fotoapparat", seller: "retro_uz", endsInSec: 45 * 60, bid: "560 000", bids: 12, buyNow: "1 100 000" },
  { id: 103, emoji: "🏍️", title: "Royxatdan o'tgan mototsikl", seller: "moto_market", endsInSec: 5 * 3600, bid: "9 800 000", bids: 23, buyNow: "14 000 000" },
  { id: 104, emoji: "🪑", title: "Dizayner stuli — qo'l ishi", seller: "design_home", endsInSec: 26, bid: "780 000", bids: 4, buyNow: null },
];

export const slashed = [
  { id: 201, emoji: "👟", title: "Nike Air Max — cheklangan seriya", seller: "sneak_uz", time: "4 kun", price: "850 000", old: "1 200 000", cond: "new", protect: true },
  { id: 202, emoji: "📸", title: "Polaroid Now Gen 2", seller: "foto_dukon", time: "2 kun", price: "950 000", old: "1 300 000", cond: "open", protect: true },
  { id: 203, emoji: "👟", title: "Adidas Samba OG", seller: "shop_88", time: "1 kun", price: "640 000", old: "900 000", cond: "used", protect: true },
  { id: 204, emoji: "🎧", title: "Audio-Technica naushnik", seller: "audio_uz", time: "3 kun", price: "1 200 000", old: "1 800 000", cond: "used", protect: true },
];

export const recommended = [
  { id: 301, emoji: "📦", title: "Premium model X400 — pro nashr", seller: "Sotuvchi 1", time: "2 kun", price: "1 500 000", cond: "new", protect: true },
  { id: 302, emoji: "🧊", title: "Premium model X402 — pro nashr", seller: "Sotuvchi 2", time: "2 kun", price: "3 000 000", cond: "open", protect: false },
  { id: 303, emoji: "🚙", title: "Premium model X403 — pro nashr", seller: "Sotuvchi 3", time: "3 kun", price: "4 500 000", cond: "used", protect: true },
  { id: 304, emoji: "🎮", title: "Premium model X404 — pro nashr", seller: "Sotuvchi 4", time: "4 kun", price: "6 800 000", cond: "new", protect: true },
  { id: 305, emoji: "📺", title: "Premium model X405 — pro nashr", seller: "Sotuvchi 5", time: "5 kun", price: "7 500 000", cond: "damaged", protect: false },
  { id: 306, emoji: "🔧", title: "Premium model X406 — pro nashr", seller: "Sotuvchi 6", time: "5 kun", price: "5 000 000", cond: "used", protect: true },
  { id: 307, emoji: "📦", title: "Premium model X407 — pro nashr", seller: "Sotuvchi 7", time: "6 kun", price: "10 500 000", cond: "open", protect: true },
  { id: 308, emoji: "🖥️", title: "Premium model X408 — pro nashr", seller: "Sotuvchi 8", time: "6 kun", price: "12 000 000", cond: "used", protect: true },
];

export const reviews = [
  { who: "Jasur R.", city: "Toshkent", text: "Sotuvchi 2 kun ichida topildi! Interfeys O'zbekistondagi eng toza platformalardan biri." },
  { who: "Alisher K.", city: "Samarqand", text: "Vintage fotoapparatni auktsionda yutib oldim. Xaridor himoyasi har doim xotirjamlik beradi." },
  { who: "Zuhra M.", city: "Buxoro", text: "Buyumlarimni shu yerda sotaman. Tasdiqlangan sotuvchilar — eng katta afzallik." },
];

export const condLabels = {
  new: { label: "Yangi", cls: "cond-new" },
  open: { label: "Ochilgan", cls: "cond-open" },
  used: { label: "Ishlatilgan", cls: "cond-used" },
  damaged: { label: "Shikastlangan", cls: "cond-damaged" },
};
