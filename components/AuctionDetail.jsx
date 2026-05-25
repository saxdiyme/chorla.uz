'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { placeBid } from '@/lib/client-queries';
import { formatPrice } from '@/lib/utils';
import { condLabels } from '@/lib/data';

function formatCountdown(sec) {
  if (sec <= 0) return null;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return [h, m, s].map(n => String(n).padStart(2, '0')).join(':');
}

export default function AuctionDetail({ initialAuction }) {
  const supabase = useMemo(() => createClient(), []);
  const listing = initialAuction.listings;
  const profile = initialAuction.profiles;

  const [currentPrice, setCurrentPrice] = useState(initialAuction.current_price);
  const [bidsCount, setBidsCount] = useState(initialAuction.bids_count);
  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, Math.floor((new Date(initialAuction.ends_at) - Date.now()) / 1000))
  );
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    const channel = supabase
      .channel(`auction:${initialAuction.id}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'auctions',
        filter: `id=eq.${initialAuction.id}`,
      }, (payload) => {
        setCurrentPrice(payload.new.current_price);
        setBidsCount(payload.new.bids_count);
      })
      .subscribe();

    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(timer);
    };
  }, []);

  async function handleBid() {
    const amount = parseInt(bidAmount);
    if (isNaN(amount) || amount <= 0) { setError("To'g'ri summa kiriting"); return; }
    setLoading(true);
    setError(null);
    const result = await placeBid(supabase, initialAuction.id, user.id, amount);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setBidAmount('');
    }
  }

  const ended = timeLeft <= 0;
  const minBid = currentPrice + initialAuction.min_increment;
  const cond = condLabels[listing?.condition] ?? null;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>

      {listing?.images?.length > 0 ? (
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', marginBottom: 24 }}>
          {listing.images.map((url, i) => (
            <Image key={i} src={url} alt={listing.title} width={600} height={400} style={{ objectFit: 'cover', borderRadius: 8 }} />
          ))}
        </div>
      ) : (
        <div style={{ height: 320, background: '#f8fafc', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, marginBottom: 24 }}>
          📦
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        {cond && (
          <span className={cond.cls} style={{ fontSize: 13, padding: '3px 12px', borderRadius: 20, marginBottom: 8, display: 'inline-block' }}>
            {cond.label}
          </span>
        )}
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>{listing?.title ?? ''}</h1>
      </div>

      <div style={{ padding: 24, border: '1px solid #e2e8f0', borderRadius: 12, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ background: '#e11d48', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>LIVE</span>
          <span style={{ fontSize: 14, color: 'var(--muted)' }}>{bidsCount} ta stavka</span>
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--green)', marginBottom: 10 }}>
          {formatPrice(currentPrice)} so'm
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: ended ? '#e11d48' : 'inherit' }}>
          {ended ? 'Tugadi' : `⏱ ${formatCountdown(timeLeft)}`}
        </div>
      </div>

      {initialAuction.buy_now_price && !ended && (
        <button style={{ width: '100%', marginBottom: 16, padding: '12px 24px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 600 }}>
          Hozir sotib oling: {formatPrice(initialAuction.buy_now_price)} so'm
        </button>
      )}

      <div style={{ padding: 24, background: '#f8fafc', borderRadius: 12, marginBottom: 24 }}>
        {user ? (
          <>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>
              Minimal stavka: {formatPrice(minBid)} so'm
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <input
                type="number"
                value={bidAmount}
                onChange={e => setBidAmount(e.target.value)}
                placeholder={String(minBid)}
                disabled={ended || loading}
                style={{ flex: 1, padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, fontFamily: 'inherit', fontSize: 14 }}
              />
              <button
                onClick={handleBid}
                disabled={ended || loading}
                style={{ background: 'var(--green)', color: 'white', padding: '10px 20px', borderRadius: 8, border: 'none', cursor: ended || loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, opacity: ended || loading ? 0.7 : 1, whiteSpace: 'nowrap' }}
              >
                {loading ? 'Yuklanmoqda...' : "Stavka qo'yish"}
              </button>
            </div>
            {error && <p style={{ color: '#e11d48', fontSize: 14, marginTop: 8 }}>{error}</p>}
          </>
        ) : (
          <a href="/login" style={{ color: 'var(--green)', fontWeight: 600, fontSize: 15 }}>
            Stavka qo'yish uchun kiring →
          </a>
        )}
      </div>

      <div style={{ padding: 20, border: '1px solid #e2e8f0', borderRadius: 12 }}>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 700 }}>Sotuvchi</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, flexShrink: 0 }}>
            {(profile?.username ?? 'C')[0].toUpperCase()}
          </span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{profile?.username ?? 'chorla'}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>
              ⭐ {profile?.rating ?? 0}
              {profile?.is_verified && (
                <span style={{ marginLeft: 8, color: 'var(--green)' }}>✓ Tasdiqlangan</span>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
