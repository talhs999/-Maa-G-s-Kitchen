'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const STATUSES = ['', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const STATUS_COLORS = {
  pending:    { bg: '#FEF3C7', text: '#D97706' },
  processing: { bg: '#DBEAFE', text: '#2563EB' },
  shipped:    { bg: '#EDE9FE', text: '#7C3AED' },
  delivered:  { bg: '#D1FAE5', text: '#059669' },
  cancelled:  { bg: '#FEE2E2', text: '#DC2626' },
};

function Badge({ status }) {
  const c = STATUS_COLORS[status?.toLowerCase()] || STATUS_COLORS.pending;
  return <span style={{ background: c.bg, color: c.text, padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing:'0.5px' }}>{status}</span>;
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);
  const PER_PAGE = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    if (!supabase) { setOrders([]); setLoading(false); return; }
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    setOrders(data || []);
    setLoading(false);
  };

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const updateStatus = async (id, status) => {
    if (!supabase) { setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o)); if (selected?.id === id) setSelected(p => ({ ...p, status })); showToast('Status updated!'); return; }
    await supabase.from('orders').update({ status }).eq('id', id);
    showToast('Status updated!'); fetchOrders(); if (selected?.id === id) setSelected(p => ({ ...p, status }));
  };

  const deleteOrder = async (id) => {
    if (!confirm('Delete this order?')) return;
    if (!supabase) { setOrders(prev => prev.filter(o => o.id !== id)); showToast('Deleted!'); setSelected(null); return; }
    await supabase.from('orders').delete().eq('id', id);
    showToast('Deleted!'); fetchOrders(); setSelected(null);
  };

  const fmt = n => `Rs. ${Number(n).toLocaleString()}`;
  const fmtDate = d => new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    return (!q || o.order_number?.toLowerCase().includes(q) || o.customer_name?.toLowerCase().includes(q) || o.customer_email?.toLowerCase().includes(q))
      && (!statusFilter || o.status?.toLowerCase() === statusFilter);
  });
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <div>
      {toast && (
        <div style={{ position: 'fixed', top: 80, right: 20, zIndex: 999, background: toast.type === 'error' ? '#FEE2E2' : '#D1FAE5', color: toast.type === 'error' ? '#DC2626' : '#059669', padding: '0.75rem 1.25rem', borderRadius: 8, fontWeight: 600, fontSize: '0.88rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          {toast.msg}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Orders</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 2 }}>{filtered.length} orders found</p>
        </div>
        <button onClick={() => {
          const csv = ['Order ID,Customer,Date,Status,Total', ...filtered.map(o => `${o.order_number},${o.customer_name || o.customer_email},${fmtDate(o.created_at)},${o.status},${o.total}`)].join('\n');
          const a = document.createElement('a'); a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv); a.download = 'orders.csv'; a.click();
        }} style={{ padding: '0.65rem 1.25rem', background: '#fff', color: '#334155', border: '1px solid #e2e8f0', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem' }}>
          📥 Export CSV
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search by order ID or customer..." style={{ flex: '1 1 240px', padding: '0.6rem 1rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.88rem', outline: 'none' }} />
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} style={{ padding: '0.6rem 1rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.88rem', outline: 'none', background: '#fff' }}>
          {STATUSES.map(s => <option key={s} value={s}>{s ? s.charAt(0).toUpperCase() + s.slice(1) : 'All Statuses'}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '1rem' }}>
        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['ORDER ID', 'CUSTOMER', 'DATE', 'STATUS', 'TOTAL', 'ACTIONS'].map(h => (
                    <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading...</td></tr>
                ) : paginated.map((o, i) => (
                  <tr key={o.id || i} style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', background: selected?.id === o.id ? '#f0f9ff' : '#fff' }}
                    onClick={() => setSelected(o)}
                    onMouseEnter={e => { if (selected?.id !== o.id) e.currentTarget.style.background = '#f8fafc'; }}
                    onMouseLeave={e => { if (selected?.id !== o.id) e.currentTarget.style.background = '#fff'; }}
                  >
                    <td style={{ padding: '0.85rem 1rem' }}><span style={{ color: '#DC2626', fontWeight: 700, fontFamily: 'monospace' }}>{o.order_number}</span></td>
                    <td style={{ padding: '0.85rem 1rem', color: '#334155', fontWeight: 500 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {o.customer_name || o.customer_email}
                        <span style={{ 
                          fontSize: '0.65rem', 
                          padding: '2px 6px', 
                          borderRadius: '4px', 
                          fontWeight: 700,
                          background: o.is_guest ? '#f1f5f9' : '#DBEAFE', 
                          color: o.is_guest ? '#64748b' : '#2563EB',
                          textTransform: 'uppercase'
                        }}>
                          {o.is_guest ? 'Guest' : 'User'}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: '#64748b', whiteSpace: 'nowrap' }}>{fmtDate(o.created_at)}</td>
                    <td style={{ padding: '0.85rem 1rem' }}><Badge status={o.status} /></td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700 }}>{fmt(o.total)}</td>
                    <td style={{ padding: '0.85rem 1rem' }} onClick={e => e.stopPropagation()}>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} style={{ padding: '3px 6px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: '0.78rem', background: '#fff', cursor: 'pointer' }}>
                          {STATUSES.filter(Boolean).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <button onClick={() => deleteOrder(o.id)} style={{ padding: '3px 8px', background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>Del</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)} style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid #e2e8f0', background: page === n ? '#0f172a' : '#fff', color: page === n ? '#fff' : '#334155', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>{n}</button>
              ))}
            </div>
          )}
        </div>

        {/* Order Detail Panel */}
        {selected && (
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: '1.5rem', height: 'fit-content' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>Order Details</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: '1.3rem', cursor: 'pointer', color: '#94a3b8' }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Order ID</span>
                <span style={{ fontWeight: 700, color: '#DC2626', fontFamily: 'monospace' }}>{selected.order_number}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Customer</span>
                <span style={{ fontWeight: 600 }}>{selected.customer_name || 'N/A'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Email</span>
                <span style={{ fontSize: '0.82rem', color: '#334155' }}>{selected.customer_email}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Date</span>
                <span>{fmtDate(selected.created_at)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748b' }}>Status</span>
                <select value={selected.status} onChange={e => updateStatus(selected.id, e.target.value)} style={{ padding: '4px 8px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: '0.82rem', background: '#fff', cursor: 'pointer' }}>
                  {STATUSES.filter(Boolean).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {selected.shipping_address && (
                <div>
                  <div style={{ color: '#64748b', marginBottom: 4 }}>Address</div>
                  <div style={{ fontSize: '0.82rem', color: '#334155', background: '#f8fafc', padding: '0.5rem', borderRadius: 6 }}>{selected.shipping_address}</div>
                </div>
              )}
              {selected.phone && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Phone</span>
                  <span>{selected.phone}</span>
                </div>
              )}
              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1rem' }}>
                <span>Total</span>
                <span style={{ color: '#0f172a' }}>{fmt(selected.total)}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button onClick={() => window.print()} style={{ flex: 1, padding: '0.6rem', background: '#f1f5f9', color: '#334155', border: '1px solid #e2e8f0', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>🖨️ Print</button>
                <button onClick={() => deleteOrder(selected.id)} style={{ flex: 1, padding: '0.6rem', background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}>Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
