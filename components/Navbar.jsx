import { Search, Plus } from "lucide-react";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="/" className="logo">
          <span className="logo-mark">C</span>
          Chorla
        </a>

        <div className="search">
          <select aria-label="Kategoriya">
            <option>Barchasi</option>
            <option>Telefonlar</option>
            <option>Avtomobillar</option>
            <option>Moda</option>
          </select>
          <input placeholder="Mahsulot, brend yoki kategoriya qidiring..." />
          <button aria-label="Qidirish">
            <Search size={18} />
          </button>
        </div>

        <nav className="nav-actions">
          <a className="nav-link" href="/login">
            Kirish
          </a>
          <a className="nav-link" href="/register">
            Ro'yxatdan o'tish
          </a>
          <a className="btn-sell" href="/sell">
            <Plus size={16} />
            Sotish
          </a>
        </nav>
      </div>
    </header>
  );
}
