'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  fontFamily: 'inherit',
  fontSize: 14,
  boxSizing: 'border-box',
};

const btnStyle = {
  background: 'var(--green)',
  color: 'white',
  padding: '10px 20px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  width: '100%',
  fontFamily: 'inherit',
  fontSize: 15,
  fontWeight: 600,
};

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, username } },
    });
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/');
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 32, border: '1px solid #e2e8f0', borderRadius: 12 }}>
      <h2 style={{ marginBottom: 20 }}>Ro'yxatdan o'tish</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input style={inputStyle} placeholder="To'liq ism" value={fullName} onChange={e => setFullName(e.target.value)} />
        <input style={inputStyle} placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input style={inputStyle} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={inputStyle} type="password" placeholder="Parol" value={password} onChange={e => setPassword(e.target.value)} />
        <button style={btnStyle} onClick={handleSubmit}>Ro'yxatdan o'tish</button>
        {error && <p style={{ color: '#e11d48', fontSize: 14, marginTop: 8 }}>{error}</p>}
      </div>
      <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14 }}>
        Hisobingiz bormi? <a href="/login">Kirish</a>
      </p>
    </div>
  );
}
