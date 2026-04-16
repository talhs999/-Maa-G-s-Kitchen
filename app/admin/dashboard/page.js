'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const STATUS_COLORS = {
  pending:    { bg: '#FEF3C7', text: '#D97706', dot: '#F59E0B' },
  processing: { bg: '#DBEAFE', text: '#2563EB', dot: '#3B82F6' },
  delivered:  { bg: '#D1FAE5', text: '#059669', dot: '#10B981' },
  shipped:    { bg: '#EDE9FE', text: '#7C3AED', dot: '#8B5CF6' },
  cancelled:  { bg: '#FEE2E2', text: '#DC2626', dot: '#EF4444' },
};

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      padding: '1.25rem 1.5rem',
      border: '1px solid #e2e8f0',
      display: 'flex', alignItems: 'center', gap: '1rem',
    }}>
      <div style={{
        width: 52, height: 52,
        background: color + '20',
        borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem',
        flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 2 }}>{label}</div>
        {sub && <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const s = status?.toLowerCase() || 'pending';
  const c = STATUS_COLORS[s] || STATUS_COLORS.pending;
  return (
    <span style={{
      background: c.bg, color: c.text,
      padding: '3px 10px', borderRadius: 20,
      fontSize: '0.72rem', fontWeight: 700,
      textTransform: 'uppercase', letterSpacing: '0.5px',
      display: 'inline-flex', alignItems: 'center', gap: 5,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.dot, display: 'inline-block' }} />
      {status || 'Pending'}
    </span>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, users: 0, todayOrders: 0, todayRevenue: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (!session) { router.push('/admin'); return; }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!supabase) {
        // Demo data
        setStats({ products: 30, orders: 10, revenue: 1582.76, users: 5, todayOrders: 0, todayRevenue: 0 });
        setRecentOrders([
          { id: 1, order_number: '#288D1AFA', customer_name: 'Muhammad Talha Khan', created_at: new Date().toISOString(), status: 'pending', total_amount: 193.96 },
          { id: 2, order_number: '#D975C392', customer_name: 'Kitchen Admin', created_at: new Date(Date.now() - 86400000).toISOString(), status: 'cancelled', total_amount: 150.00 },
          { id: 3, order_number: '#E1D80003', customer_name: 'Kitchen Admin', created_at: new Date(Date.now() - 172800000).toISOString(), status: 'delivered', total_amount: 69.59 },
          { id: 4, order_number: '#95501CA9', customer_name: 'Kitchen Admin', created_at: new Date(Date.now() - 172800000).toISOString(), status: 'pending', total_amount: 162.30 },
          { id: 5, order_number: '#C6E2FB1B', customer_name: 'Kitchen Admin', created_at: new Date(Date.now() - 259200000).toISOString(), status: 'pending', total_amount: 139.00 },
        ]);
        setLoading(false);
        return;
      }

      const today = new Date(); today.setHours(0, 0, 0, 0);

      const [{ count: prodCount }, { count: userCount }, { data: orders }] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.auth.admin?.listUsers?.() || { count: 5 },
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
      ]);

      const allOrders = orders || [];
      const revenue = allOrders.reduce((s, o) => s + (Number(o.total_amount) || 0), 0);
      const todayOrds = allOrders.filter(o => new Date(o.created_at) >= today);
      const todayRev = todayOrds.reduce((s, o) => s + (Number(o.total_amount) || 0), 0);

      setStats({
        products: prodCount || 30,
        orders: allOrders.length,
        revenue,
        users: 5,
        todayOrders: todayOrds.length,
        todayRevenue: todayRev,
      });
      setRecentOrders(allOrders.slice(0, 8));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fmt = (n) => `$${Number(n).toFixed(2)}`;
  const fmtDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Dashboard</h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 2 }}>Welcome back! Here's what's happening in your store.</p>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[1,2,3,4].map(i => <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', border: '1px solid #e2e8f0', height: 90, animation: 'pulse 1.5s ease infinite' }} />)}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <StatCard icon="📦" label="Total Products" value={stats.products} sub="Active in store" color="#3B82F6" />
          <StatCard icon="🛒" label="Total Orders" value={stats.orders} sub={`+${stats.todayOrders} today`} color="#10B981" />
          <StatCard icon="💰" label="Total Revenue" value={fmt(stats.revenue)} sub={`+${fmt(stats.todayRevenue)} today`} color="#F59E0B" />
          <StatCard icon="👥" label="Registered Users" value={stats.users} sub="All time" color="#8B5CF6" />
        </div>
      )}

      {/* Recent Orders */}
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>Recent Orders</h2>
          <Link href="/admin/orders" style={{ fontSize: '0.85rem', color: '#3B82F6', textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['ORDER ID', 'CUSTOMER', 'DATE', 'STATUS', 'TOTAL'].map(h => (
                  <th key={h} style={{ padding: '0.65rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o, i) => (
                <tr key={o.id || i} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <Link href={`/admin/orders/${o.id}`} style={{ color: '#DC2626', fontWeight: 700, textDecoration: 'none', fontFamily: 'monospace' }}>
                      {o.order_number}
                    </Link>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#334155', fontWeight: 500 }}>{o.customer_name || o.customer_email}</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#64748b', whiteSpace: 'nowrap' }}>{fmtDate(o.created_at)}</td>
                  <td style={{ padding: '0.85rem 1rem' }}><StatusBadge status={o.status} /></td>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>{fmt(o.total_amount)}</td>
                </tr>
              ))}
              {recentOrders.length === 0 && !loading && (
                <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No orders yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
    </div>
  );
}
