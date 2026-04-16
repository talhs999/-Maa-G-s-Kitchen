'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ShippingPage() {
  const router = useRouter();
  const [regions, setRegions] = useState([
    { id: 1, name: 'Lahore (Local)', cost: 150, days: '1-2 Days', status: true },
    { id: 2, name: 'Karachi', cost: 350, days: '3-4 Days', status: true },
    { id: 3, name: 'Islamabad/Rawalpindi', cost: 250, days: '2-3 Days', status: true },
    { id: 4, name: 'Other Cities', cost: 400, days: '4-5 Days', status: true },
  ]);

  useEffect(() => {
    if (!localStorage.getItem('admin_session')) router.push('/admin');
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div><h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Shipping Regions</h1><p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 2 }}>Manage delivery costs</p></div>
        <button style={{ padding: '0.65rem 1.25rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>+ Add Region</button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead><tr style={{ background: '#f8fafc' }}>
            {['REGION NAME', 'SHIPPING COST', 'EST. DELIVERY', 'STATUS', 'ACTIONS'].map(h => <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {regions.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>{r.name}</td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>Rs. {r.cost}</td>
                <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{r.days}</td>
                <td style={{ padding: '0.85rem 1rem' }}><span style={{ background: r.status ? '#D1FAE5' : '#FEE2E2', color: r.status ? '#059669' : '#DC2626', padding: '2px 8px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 700 }}>{r.status ? 'Active' : 'Inactive'}</span></td>
                <td style={{ padding: '0.85rem 1rem' }}><button style={{ padding: '4px 10px', background: '#EFF6FF', color: '#2563EB', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
