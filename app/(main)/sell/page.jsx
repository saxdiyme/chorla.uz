'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  fontFamily: 'inherit',
  fontSize: 14,
  marginBottom: 16,
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  marginBottom: 6,
  fontWeight: 600,
  fontSize: 14,
};

export default function SellPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [condition, setCondition] = useState('used');
  const [city, setCity] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.push('/login'); return; }
      setUser(user);
    });
    supabase
      .from('categories')
      .select('id, name_uz')
      .order('sort_order')
      .then(({ data }) => setCategories(data || []));
  }, []);

  async function handleSubmit() {
    if (!title.trim() || !price) {
      setError("Sarlavha va narx majburiy");
      return;
    }
    setError('');
    setLoading(true);
    const supabase = createClient();

    const urls = [];
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      const path = `${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from('listings').upload(path, file);
      if (uploadError) {
        setError('Rasm yuklashda xatolik: ' + uploadError.message);
        setLoading(false);
        return;
      }
      const { data: { publicUrl } } = supabase.storage.from('listings').getPublicUrl(path);
      urls.push(publicUrl);
    }

    const { data, error: insertError } = await supabase
      .from('listings')
      .insert({
        user_id: user.id,
        title: title.trim(),
        description: description.trim(),
        price: parseInt(price),
        category_id: categoryId || null,
        condition,
        city: city.trim(),
        images: urls,
        is_active: true,
      })
      .select('id')
      .single();

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push(`/listing/${data.id}`);
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 32, border: '1px solid #e2e8f0', borderRadius: 12 }}>
      <h2 style={{ marginBottom: 24 }}>E'lon berish</h2>

      <label style={labelStyle}>Sarlavha *</label>
      <input style={inputStyle} placeholder="Mahsulot nomi" value={title} onChange={e => setTitle(e.target.value)} />

      <label style={labelStyle}>Tavsif</label>
      <textarea
        style={{ ...inputStyle, resize: 'vertical' }}
        rows={4}
        placeholder="Mahsulot haqida batafsil..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <label style={labelStyle}>Narx (so'm) *</label>
      <input style={inputStyle} type="number" placeholder="1500000" value={price} onChange={e => setPrice(e.target.value)} />

      <label style={labelStyle}>Kategoriya</label>
      <select style={inputStyle} value={categoryId} onChange={e => setCategoryId(e.target.value)}>
        <option value="">Tanlang</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name_uz}</option>
        ))}
      </select>

      <label style={labelStyle}>Holat</label>
      <select style={inputStyle} value={condition} onChange={e => setCondition(e.target.value)}>
        <option value="new">Yangi</option>
        <option value="open">Ochilgan</option>
        <option value="used">Ishlatilgan</option>
        <option value="damaged">Shikastlangan</option>
      </select>

      <label style={labelStyle}>Shahar</label>
      <input style={inputStyle} placeholder="Toshkent" value={city} onChange={e => setCity(e.target.value)} />

      <label style={labelStyle}>Rasmlar (max 5)</label>
      <input
        type="file"
        multiple
        accept="image/*"
        style={{ marginBottom: 24 }}
        onChange={e => setImages(Array.from(e.target.files).slice(0, 5))}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ background: 'var(--green)', color: 'white', padding: '12px 24px', borderRadius: 8, border: 'none', cursor: loading ? 'not-allowed' : 'pointer', width: '100%', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Yuklanmoqda..." : "E'lon berish"}
      </button>

      {error && <p style={{ color: '#e11d48', fontSize: 14, marginTop: 8 }}>{error}</p>}
    </div>
  );
}
