'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

const NAV_ITEMS = [
  { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/admin/products', icon: '📦', label: 'Products' },
  { href: '/admin/orders', icon: '🛒', label: 'Orders' },
  { href: '/admin/categories', icon: '🏷️', label: 'Categories' },
  { href: '/admin/header-categories', icon: '📌', label: 'Header Categories' },
  { href: '/admin/coupons', icon: '🎟️', label: 'Coupons' },
  { href: '/admin/shipping', icon: '🚚', label: 'Shipping' },
  { href: '/admin/reviews', icon: '⭐', label: 'Reviews' },
  { href: '/admin/users', icon: '👥', label: 'Users' },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/auth');
        return;
      }

      const userEmail = session.user.email;
      
      // Strict role check: Admin email list or check user_roles table
      const adminEmails = ['admin@kitchen.com', 'superadmin@kitchen.com'];
      
      // Fallback for demo, but we should check user_roles table too
      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      const userRole = roleData?.role || (adminEmails.includes(userEmail) ? 'Super Admin' : null);

      if (!userRole) {
        // Not an admin, redirect to homepage
        router.push('/');
        return;
      }

      setAdmin({
        id: session.user.id,
        name: session.user.user_metadata?.full_name || userEmail.split('@')[0],
        email: userEmail,
        role: userRole
      });
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    localStorage.removeItem('admin_session'); 
    router.push('/');
  };

  if (loading || !admin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
        <div style={{ color: '#D4A853', fontSize: '1.2rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem', fontSize: '2rem' }}>🍳</div>
          Verifying Admin Access...
        </div>
      </div>
    );
  }

  const sidebarStyle = {
    width: 256,
    minHeight: '100vh',
    background: '#0f172a',
    borderRight: '1px solid #1e293b',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    transition: 'transform 0.3s ease',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        ...sidebarStyle,
        transform: sidebarOpen ? 'translateX(0)' : undefined,
        '@media (max-width: 768px)': { transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)' },
      }}>
        {/* Logo */}
        <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#D4A853,#B8860B)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🍳</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', lineHeight: 1.2 }}>Maa G's Kitchen</div>
              <div style={{ color: '#475569', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.65rem 1.25rem',
                  margin: '0.1rem 0.75rem',
                  borderRadius: '8px',
                  color: active ? '#D4A853' : '#94a3b8',
                  background: active ? 'rgba(212,168,83,0.1)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: active ? 600 : 400,
                  transition: 'all 0.15s',
                  borderLeft: active ? '3px solid #D4A853' : '3px solid transparent',
                }}
              >
                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid #1e293b' }}>
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.65rem 0.5rem',
            color: '#64748b', textDecoration: 'none', fontSize: '0.85rem',
            transition: 'color 0.15s',
          }}>
            ← Back to Store
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div style={{ marginLeft: 256, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Top Bar */}
        <header style={{
          height: 64,
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 1.5rem',
          position: 'sticky', top: 0, zIndex: 50,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontSize: '1.3rem', display: 'none' }}
            >
              ☰
            </button>
            <div style={{ position: 'relative' }}>
              <input
                placeholder="Search..."
                style={{
                  padding: '0.5rem 1rem 0.5rem 2.5rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.875rem', outline: 'none',
                  width: 240, background: '#f8fafc',
                  color: '#0f172a',
                }}
              />
              <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>🔍</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#64748b' }}>🔔</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 36, height: 36, background: 'linear-gradient(135deg,#D4A853,#B8860B)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#0f172a', fontWeight: 800, fontSize: '0.85rem',
              }}>
                {admin.name?.[0] || 'A'}
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.2 }}>{admin.name}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{admin.role}</div>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  padding: '0.4rem 0.85rem',
                  background: 'transparent', border: '1px solid #e2e8f0',
                  borderRadius: '6px', cursor: 'pointer',
                  fontSize: '0.8rem', color: '#64748b',
                  transition: 'all 0.15s',
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '1.5rem', overflowX: 'hidden' }}>
          {children}
        </main>
      </div>

      {/* Mobile sidebar responsiveness */}
      <style>{`
        @media (max-width: 768px) {
          aside { transform: ${sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'} !important; }
          div[style*="margin-left: 256"] { margin-left: 0 !important; }
          button[onClick] { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
