import {
  Tag, Home, Building2, Car, Smartphone, Shirt, ShoppingBag, Gem,
  ArrowRight, Search, Star, Apple, Play,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import AuctionCard from "@/components/AuctionCard";
import {
  categories as fallbackCategories,
  trendingChips,
  trending as fallbackTrending,
  auctions as fallbackAuctions,
  slashed as fallbackSlashed,
  recommended,
  reviews,
} from "@/lib/data";
import {
  getCategories,
  getTrendingListings,
  getActiveAuctions,
  getSlashedListings,
} from "@/lib/queries";

const ICONS = { Tag, Home, Building2, Car, Smartphone, Shirt, ShoppingBag, Gem };

export default async function HomePage() {
  const [dbCategories, dbTrending, dbAuctions, dbSlashed] = await Promise.all([
    getCategories(),
    getTrendingListings(),
    getActiveAuctions(),
    getSlashedListings(),
  ]);

  const categories = dbCategories.length ? dbCategories : fallbackCategories;
  const trending = dbTrending.length ? dbTrending : fallbackTrending;
  const auctions = dbAuctions.length ? dbAuctions : fallbackAuctions;
  const slashed = dbSlashed.length ? dbSlashed : fallbackSlashed;

  return (
    <>
      <Navbar />

      <main className="container">
        {/* HERO */}
        <section className="hero">
          <div className="hero-card hero-1">
            <span className="hero-tag">YANGI KOLEKSIYA</span>
            <div className="hero-body">
              <h2>Uslub va sifat shu yerda</h2>
              <p>O'zbekistondagi tasdiqlangan sotuvchilardan eng yaxshi takliflar.</p>
              <a className="hero-btn" href="/browse">Koleksiyani ko'rish</a>
            </div>
          </div>
          <div className="hero-card hero-2">
            <span className="hero-tag">FAQAT AUKTSION</span>
            <div className="hero-body">
              <h2>Auktsionda yutib oling</h2>
              <p>Noyob buyumlarga stavka qo'ying va eng yaxshi narxda qo'lga kiriting.</p>
              <a className="hero-btn solid" href="/auctions">Auktsionga o'tish</a>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="section">
          <div className="section-head">
            <h2>Nimani qidiryapsiz?</h2>
            <a className="section-link" href="/browse">Barcha kategoriyalar →</a>
          </div>
          <div className="cats">
            {categories.map((c) => {
              const Icon = ICONS[c.icon];
              return (
                <a key={c.name} className="cat" href={c.slug ? `/browse?category=${c.slug}` : '/browse'}>
                  <span className="cat-icon" style={{ background: c.color }}>
                    <Icon size={24} />
                  </span>
                  <span>{c.name}</span>
                </a>
              );
            })}
          </div>
        </section>

        {/* TRENDING */}
        <section className="section">
          <div className="section-head">
            <h2>Hozir mashhur</h2>
            <a className="section-link" href="/browse?sort=popular">Barchasini ko'rish →</a>
          </div>
          <div className="chips" style={{ marginBottom: 16 }}>
            {trendingChips.map((c) => (
              <button key={c} className="chip">{c}</button>
            ))}
          </div>
          <div className="row">
            {trending.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* AUCTIONS */}
        <section className="section">
          <div className="section-head">
            <h2>Jonli auktsionlar <span className="badge-new">YANGI</span></h2>
            <a className="section-link" href="/auctions">Barcha auktsionlar →</a>
          </div>
          <div className="grid">
            {auctions.map((item) => (
              <AuctionCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* SLASHED */}
        <section className="section">
          <div className="section-head">
            <h2>Chegirmali narxlar</h2>
            <a className="section-link" href="/browse?condition=new">Barchasini ko'rish →</a>
          </div>
          <div className="grid">
            {slashed.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* RECOMMENDED */}
        <section className="section">
          <div className="section-head">
            <h2>Siz uchun tavsiya</h2>
          </div>
          <div className="grid">
            {recommended.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 22 }}>
            <a className="chip" href="/browse" style={{ padding: "10px 28px" }}>
              Ko'proq ko'rish
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div>
            <h2>Chorla'da hamma narsani soting va sotib oling</h2>
            <p>
              O'zbekistonda har 2 kishidan 1 nafari Chorla'dan foydalanadi.
              Avtomobildan kosmetikagacha — keyingi xaridingizni shu yerdan toping.
            </p>
            <div className="cta-search">
              <input placeholder="Nimanidir qidiring..." />
              <button aria-label="Qidirish"><Search size={18} /></button>
            </div>
            <div className="cta-btns">
              <a className="primary" href="/sell">Hoziroq soting</a>
              <a className="ghost" href="/register">Kirish / Ro'yxatdan o'tish</a>
            </div>
          </div>
          <div className="cta-phone" aria-hidden>📱</div>
        </section>

        {/* TRUST */}
        <section className="trust">
          <h2>Ishonchli mahalliy hamjamiyat bilan savdo qiling</h2>
          <div className="stars">★★★★★ 4.9/5</div>
          <div className="reviews">
            {reviews.map((r) => (
              <div key={r.who} className="review">
                <div className="stars">★★★★★</div>
                <p>"{r.text}"</p>
                <div className="who">
                  <span className="seller-ava">{r.who.charAt(0)}</span>
                  <div>
                    <b>{r.who}</b>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{r.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* APP BANNER */}
        <section className="appbar">
          <div>
            <h2>Chorla'da hamma yutadi 🎉</h2>
            <p>Ilovani yuklab oling — tezkor narx ogohlantirishlari va eksklyuziv takliflar.</p>
            <div className="store-btns">
              <a className="store-btn" href="#"><Apple size={18} /> App Store</a>
              <a className="store-btn" href="#"><Play size={18} /> Google Play</a>
            </div>
          </div>
          <div className="qr">QR kod<br />skaner qiling</div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="foot-grid">
            <div className="foot-col foot-brand">
              <a href="/" className="logo">
                <span className="logo-mark">C</span> Chorla
              </a>
              <p>O'zbekistonning eng yirik e'lonlar va auktsion bozori. Sot, sotib ol, yut.</p>
            </div>
            <div className="foot-col">
              <h4>Mashhur</h4>
              <a href="#">iPhone</a><a href="#">Velosiped</a>
              <a href="#">Avtomobillar</a><a href="#">PlayStation</a>
            </div>
            <div className="foot-col">
              <h4>Kompaniya</h4>
              <a href="#">Biz haqimizda</a><a href="#">Karyera</a>
              <a href="#">Blog</a><a href="#">Reklama</a>
            </div>
            <div className="foot-col">
              <h4>Yordam</h4>
              <a href="#">Yordam markazi</a><a href="#">Xavfsizlik</a>
              <a href="#">Bog'lanish</a><a href="#">Qoidalar</a>
            </div>
            <div className="foot-col">
              <h4>Til & Hudud</h4>
              <select className="lang-select">
                <option>O'zbekcha</option>
                <option>Русский</option>
                <option>English</option>
              </select>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Chorla.uz — Barcha huquqlar himoyalangan</span>
            <span>Maxfiylik · Foydalanish shartlari</span>
          </div>
        </div>
      </footer>
    </>
  );
}
