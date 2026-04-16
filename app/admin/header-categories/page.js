'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeaderCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([
    { id: 1, name: 'Sauces', priority: 1, status: true },
    { id: 2, name: 'Pickles', priority: 2, status: true },
    { id: 3, name: 'Masalas', priority: 3, status: true },
  ]);

  useEffect(() => {
    if (!localStorage.getItem('admin_session')) router.push('/admin');
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div><h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Header Categories</h1><p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 2 }}>Manage links in the top navigation bar</p></div>
        <button style={{ padding: '0.65rem 1.25rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>+ Add to Header</button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead><tr style={{ background: '#f8fafc' }}>
            {['SORT PRIORITY', 'CATEGORY', 'STATUS', 'ACTIONS'].map(h => <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: '#64748b' }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>#{c.priority}</td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{c.name}</td>
                <td style={{ padding: '0.85rem 1rem' }}><span style={{ background: c.status ? '#D1FAE5' : '#FEE2E2', color: c.status ? '#059669' : '#DC2626', padding: '2px 8px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 700 }}>{c.status ? 'Visible' : 'Hidden'}</span></td>
                <td style={{ padding: '0.85rem 1rem', display: 'flex', gap: '0.5rem' }}>
                  <button style={{ padding: '4px 10px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer' }}>↑</button>
                  <button style={{ padding: '4px 10px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer' }}>↓</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
