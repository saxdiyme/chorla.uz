import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import BrowseFilters from '@/components/BrowseFilters';
import { getBrowseListings, getCategories } from '@/lib/queries';

function buildUrl(base, overrides) {
  const merged = { ...base, ...overrides };
  const params = new URLSearchParams();
  Object.entries(merged).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') params.set(k, String(v));
  });
  return '/browse?' + params.toString();
}

const inputStyle = {
  padding: '10px 14px',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  fontFamily: 'inherit',
  fontSize: 14,
  flex: 1,
  minWidth: 140,
};

export default async function BrowsePage({ searchParams }) {
  const q = searchParams.q ?? '';
  const category = searchParams.category ?? '';
  const city = searchParams.city ?? '';
  const min_price = searchParams.min_price ?? '';
  const max_price = searchParams.max_price ?? '';
  const condition = searchParams.condition ?? '';
  const sort = searchParams.sort ?? 'newest';
  const page = Number(searchParams.page ?? 1);

  const [{ listings, total, pageSize }, categories] = await Promise.all([
    getBrowseListings({ q, category, city, min_price, max_price, condition, sort, page }),
    getCategories(),
  ]);

  const totalPages = Math.ceil(total / pageSize);
  const baseParams = { q, category, city, min_price, max_price, condition, sort };

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>

        <form method="get" action="/browse" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <input name="q" defaultValue={q} placeholder="Mahsulot qidirish..." style={inputStyle} />
            <input name="city" defaultValue={city} placeholder="Shahar" style={{ ...inputStyle, flex: 'none', width: 140 }} />
            <input name="min_price" defaultValue={min_price} type="number" placeholder="Min narx" style={{ ...inputStyle, flex: 'none', width: 120 }} />
            <input name="max_price" defaultValue={max_price} type="number" placeholder="Max narx" style={{ ...inputStyle, flex: 'none', width: 120 }} />
            {category && <input type="hidden" name="category" value={category} />}
            {condition && <input type="hidden" name="condition" value={condition} />}
            {sort && sort !== 'newest' && <input type="hidden" name="sort" value={sort} />}
            <button type="submit" style={{ padding: '10px 20px', background: 'var(--green)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600 }}>
              Qidirish
            </button>
          </div>
        </form>

        <BrowseFilters currentParams={{ q, category, city, min_price, max_price, condition, sort }} categories={categories} />

        <div style={{ marginBottom: 16, fontSize: 14, color: 'var(--muted)' }}>
          {total} ta e'lon topildi
        </div>

        {listings.length > 0 ? (
          <div className="grid">
            {listings.map(item => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ marginBottom: 16, fontSize: 18 }}>E'lonlar topilmadi</p>
            <a href="/browse" style={{ color: 'var(--green)', fontWeight: 600 }}>Filterni tozalash</a>
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20, marginTop: 40 }}>
            {page > 1 && (
              <a href={buildUrl(baseParams, { page: page - 1 })} style={{ color: 'var(--green)', fontWeight: 600 }}>
                ← Oldingi
              </a>
            )}
            <span style={{ fontSize: 14, color: 'var(--muted)' }}>Sahifa {page} / {totalPages}</span>
            {page < totalPages && (
              <a href={buildUrl(baseParams, { page: page + 1 })} style={{ color: 'var(--green)', fontWeight: 600 }}>
                Keyingi →
              </a>
            )}
          </div>
        )}

      </div>
    </>
  );
}
