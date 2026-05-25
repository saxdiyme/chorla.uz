import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { formatPrice, timeAgo } from '@/lib/utils';
import { condLabels } from '@/lib/data';

export default async function ListingPage({ params }) {
  const supabase = await createClient();

  const { data: listing } = await supabase
    .from('listings')
    .select('*, profiles(username, avatar_url, city, rating, reviews_count, is_verified, created_at)')
    .eq('id', params.id)
    .eq('is_active', true)
    .single();

  if (!listing) notFound();

  await supabase
    .from('listings')
    .update({ views_count: listing.views_count + 1 })
    .eq('id', params.id);

  const cond = condLabels[listing.condition] ?? { label: listing.condition, cls: '' };
  const profile = listing.profiles;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>

      {listing.images && listing.images.length > 0 ? (
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', marginBottom: 24 }}>
          {listing.images.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={listing.title}
              style={{ height: 320, minWidth: 280, objectFit: 'cover', borderRadius: 12, flexShrink: 0 }}
            />
          ))}
        </div>
      ) : (
        <div style={{ height: 320, background: '#f8fafc', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, marginBottom: 24 }}>
          📦
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
          <span className={cond.cls} style={{ fontSize: 13, padding: '3px 12px', borderRadius: 20 }}>
            {cond.label}
          </span>
          {listing.is_protected && (
            <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 13, padding: '3px 12px', borderRadius: 20, fontWeight: 600 }}>
              Chorla himoyasi
            </span>
          )}
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 10 }}>{listing.title}</h1>
        <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--green)', marginBottom: 8 }}>
          {formatPrice(listing.price)} so'm
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 14 }}>
          {listing.city && <span>{listing.city} · </span>}
          <span>{timeAgo(listing.created_at)}</span>
        </div>
      </div>

      <div style={{ marginBottom: 24, padding: 20, background: '#f8fafc', borderRadius: 12 }}>
        <h3 style={{ marginBottom: 10, fontSize: 16, fontWeight: 700 }}>Tavsif</h3>
        <p style={{ lineHeight: 1.7, color: listing.description ? 'inherit' : 'var(--muted)', margin: 0 }}>
          {listing.description || "Tavsif yo'q"}
        </p>
      </div>

      <div style={{ marginBottom: 24, padding: 20, border: '1px solid #e2e8f0', borderRadius: 12 }}>
        <h3 style={{ marginBottom: 16, fontSize: 16, fontWeight: 700 }}>Sotuvchi</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, flexShrink: 0 }}>
            {(profile?.username ?? 'C')[0].toUpperCase()}
          </span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{profile?.username ?? 'chorla'}</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 2 }}>
              {profile?.city && <span>{profile.city} · </span>}
              <span>⭐ {profile?.rating ?? 0} ({profile?.reviews_count ?? 0} ta sharh)</span>
            </div>
            {profile?.created_at && (
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                A'zo: {new Date(profile.created_at).getFullYear()}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button style={{ flex: 1, background: 'var(--green)', color: 'white', padding: '14px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 600 }}>
          Sotuvchi bilan bog'lanish
        </button>
        <button style={{ padding: '14px 24px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontFamily: 'inherit', fontSize: 15 }}>
          ♡ Sevimlilar
        </button>
      </div>

    </div>
  );
}
