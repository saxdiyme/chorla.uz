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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/');
  }

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: 32, border: '1px solid #e2e8f0', borderRadius: 12 }}>
      <h2 style={{ marginBottom: 20 }}>Kirish</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input style={inputStyle} type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={inputStyle} type="password" placeholder="Parol" value={password} onChange={e => setPassword(e.target.value)} />
        <button style={btnStyle} onClick={handleSubmit}>Kirish</button>
        {error && <p style={{ color: '#e11d48', fontSize: 14, marginTop: 8 }}>{error}</p>}
      </div>
      <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14 }}>
        Hisob yo'qmi? <a href="/register">Ro'yxatdan o'tish</a>
      </p>
    </div>
  );
}
