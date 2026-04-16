'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const ADMIN_EMAILS = ['admin@kitchen.com', 'superadmin@kitchen.com'];

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!ADMIN_EMAILS.includes(email.toLowerCase())) {
        setError('Access denied. Not an admin account.');
        setLoading(false);
        return;
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        // Fallback: check hardcoded credentials for demo
        const validCreds = (
          (email === 'admin@kitchen.com' && password === 'Admin@123') ||
          (email === 'superadmin@kitchen.com' && password === 'SuperAdmin@123')
        );
        if (!validCreds) {
          setError('Invalid email or password.');
          setLoading(false);
          return;
        }
        // Store mock session
        localStorage.setItem('admin_session', JSON.stringify({
          email,
          role: email === 'superadmin@kitchen.com' ? 'superadmin' : 'admin',
          name: email === 'superadmin@kitchen.com' ? 'Super Admin' : 'Admin',
          token: btoa(email + ':' + Date.now()),
        }));
      } else {
        localStorage.setItem('admin_session', JSON.stringify({
          email: data.user.email,
          role: email === 'superadmin@kitchen.com' ? 'superadmin' : 'admin',
          name: data.user.user_metadata?.full_name || 'Admin',
          token: data.session?.access_token || btoa(email + ':' + Date.now()),
        }));
      }

      router.push('/admin/dashboard');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: 420, padding: '0 1.5rem' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 64, height: 64,
            background: 'linear-gradient(135deg, #D4A853, #B8860B)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '2rem',
          }}>🍳</div>
          <h1 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>Maa G's Kitchen</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>Admin Dashboard</p>
        </div>

        {/* Card */}
        <div style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '16px',
          padding: '2rem',
        }}>
          <h2 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>Sign In</h2>
          <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Use your admin credentials to continue</p>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', color: '#f87171',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '8px', padding: '0.75rem 1rem',
              fontSize: '0.88rem', marginBottom: '1.25rem',
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@kitchen.com"
                required
                style={{
                  width: '100%', padding: '0.75rem 1rem',
                  background: '#0f172a', border: '1px solid #334155',
                  borderRadius: '8px', color: '#fff', fontSize: '0.95rem',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '0.75rem 1rem',
                  background: '#0f172a', border: '1px solid #334155',
                  borderRadius: '8px', color: '#fff', fontSize: '0.95rem',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input type="checkbox" id="remember" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: '#D4A853' }} />
              <label htmlFor="remember" style={{ color: '#94a3b8', fontSize: '0.88rem', cursor: 'pointer' }}>Remember me</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '0.85rem',
                background: loading ? '#334155' : 'linear-gradient(135deg, #D4A853, #B8860B)',
                color: loading ? '#64748b' : '#0f172a',
                border: 'none', borderRadius: '8px',
                fontWeight: 700, fontSize: '0.95rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem', marginTop: '1.5rem' }}>
          <a href="/" style={{ color: '#D4A853', textDecoration: 'none' }}>← Back to Store</a>
        </p>
      </div>
    </div>
  );
}
