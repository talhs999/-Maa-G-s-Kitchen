'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CouponsPage() {
  const router = useRouter();
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'WELCOME10', type: 'percentage', value: 10, min_purchase: 1000, usage_count: 45, status: true },
    { id: 2, code: 'FREESHIP', type: 'fixed', value: 200, min_purchase: 2500, usage_count: 12, status: true },
  ]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('admin_session')) router.push('/admin');
  }, []);

  const handleDelete = (id) => {
    if (confirm('Delete coupon?')) setCoupons(p => p.filter(c => c.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div><h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Coupons</h1><p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 2 }}>{coupons.length} active coupons</p></div>
        <button onClick={() => setShowModal(true)} style={{ padding: '0.65rem 1.25rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>+ Add Coupon</button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead><tr style={{ background: '#f8fafc' }}>
            {['CODE', 'DISCOUNT', 'MIN PURCHASE', 'USAGE', 'STATUS', 'ACTIONS'].map(h => <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {coupons.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, fontFamily: 'monospace', color: '#2563EB' }}>{c.code}</td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{c.type === 'percentage' ? `${c.value}%` : `Rs. ${c.value}`}</td>
                <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>Rs. {c.min_purchase}</td>
                <td style={{ padding: '0.85rem 1rem' }}>{c.usage_count} times</td>
                <td style={{ padding: '0.85rem 1rem' }}><span style={{ background: c.status ? '#D1FAE5' : '#FEE2E2', color: c.status ? '#059669' : '#DC2626', padding: '2px 8px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 700 }}>{c.status ? 'Active' : 'Inactive'}</span></td>
                <td style={{ padding: '0.85rem 1rem' }}><button onClick={() => handleDelete(c.id)} style={{ padding: '4px 10px', background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', width: 400 }}>
            <h2 style={{ marginTop: 0 }}>Add Coupon</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Table schema for coupons not yet in Supabase. This is a UI placeholder.</p>
            <button onClick={() => setShowModal(false)} style={{ width: '100%', padding: '0.85rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
