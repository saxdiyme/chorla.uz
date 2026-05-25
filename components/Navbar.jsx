'use client';

import { Search, Plus } from "lucide-react";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  }

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
          {user ? (
            <>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>
                  {user.email[0].toUpperCase()}
                </span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>
                  {user.user_metadata?.username || user.email}
                </span>
              </span>
              <button className="nav-link" onClick={handleSignOut} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                Chiqish
              </button>
            </>
          ) : (
            <>
              <a className="nav-link" href="/login">Kirish</a>
              <a className="nav-link" href="/register">Ro'yxatdan o'tish</a>
            </>
          )}
          <a className="btn-sell" href="/sell">
            <Plus size={16} />
            Sotish
          </a>
        </nav>
      </div>
    </header>
  );
}
