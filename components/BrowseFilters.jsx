'use client';

function buildUrl(current, updates) {
  const merged = { ...current, ...updates, page: '' };
  const params = new URLSearchParams();
  Object.entries(merged).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') params.set(k, String(v));
  });
  return '/browse?' + params.toString();
}

const selectStyle = {
  padding: '10px 14px',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  fontFamily: 'inherit',
  fontSize: 14,
  background: 'white',
  cursor: 'pointer',
};

export default function BrowseFilters({ currentParams, categories }) {
  function navigate(key, value) {
    window.location.href = buildUrl(currentParams, { [key]: value });
  }

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
      <select style={selectStyle} value={currentParams.category ?? ''} onChange={e => navigate('category', e.target.value)}>
        <option value="">Barcha kategoriyalar</option>
        {categories.map(c => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>

      <select style={selectStyle} value={currentParams.condition ?? ''} onChange={e => navigate('condition', e.target.value)}>
        <option value="">Holati</option>
        <option value="new">Yangi</option>
        <option value="open">Ochilgan</option>
        <option value="used">Ishlatilgan</option>
        <option value="damaged">Shikastlangan</option>
      </select>

      <select style={selectStyle} value={currentParams.sort ?? 'newest'} onChange={e => navigate('sort', e.target.value)}>
        <option value="newest">Yangi</option>
        <option value="price_asc">Arzon</option>
        <option value="price_desc">Qimmat</option>
        <option value="popular">Mashhur</option>
      </select>
    </div>
  );
}
