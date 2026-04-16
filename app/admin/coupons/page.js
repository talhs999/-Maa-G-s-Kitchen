'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const SAMPLE_COUPONS = [
  { id: 1, code: 'WELCOME10', discount_type: 'percentage', discount_value: 10, min_purchase: 1000, usage_count: 45, status: true },
  { id: 2, code: 'FREESHIP', discount_type: 'fixed', discount_value: 200, min_purchase: 2500, usage_count: 12, status: true },
];

export default function CouponsPage() {
  const router = useRouter();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ code: '', discount_type: 'percentage', discount_value: '', min_purchase: '', status: true });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    if (!supabase) { setCoupons(SAMPLE_COUPONS); setLoading(false); return; }
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      setCoupons(SAMPLE_COUPONS);
    } else {
      setCoupons(data?.length ? data : SAMPLE_COUPONS);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!form.code) return alert('Code is required');
    if (!supabase) {
      setCoupons([{ id: Date.now(), ...form, usage_count: 0 }, ...coupons]);
      setShowModal(false);
      return;
    }
    const { error } = await supabase.from('coupons').insert([form]);
    if (error) {
      alert(error.message);
    } else {
      fetchCoupons();
      setShowModal(false);
      setForm({ code: '', discount_type: 'percentage', discount_value: '', min_purchase: '', status: true });
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete coupon?')) return;
    if (!supabase) { setCoupons(p => p.filter(c => c.id !== id)); return; }
    const { error } = await supabase.from('coupons').delete().eq('id', id);
    if (error) alert(error.message);
    else fetchCoupons();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Coupons</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 2 }}>{coupons.length} active coupons</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ padding: '0.65rem 1.25rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>+ Add Coupon</button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              {['CODE', 'DISCOUNT', 'MIN PURCHASE', 'USAGE', 'STATUS', 'ACTIONS'].map(h => (
                <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading...</td></tr>
            ) : coupons.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, fontFamily: 'monospace', color: '#2563EB' }}>{c.code}</td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{c.discount_type === 'percentage' ? `${c.discount_value}%` : `Rs. ${c.discount_value}`}</td>
                <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>Rs. {c.min_purchase}</td>
                <td style={{ padding: '0.85rem 1rem' }}>{c.usage_count || 0} times</td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <span style={{ background: c.status ? '#D1FAE5' : '#FEE2E2', color: c.status ? '#059669' : '#DC2626', padding: '2px 8px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 700 }}>
                    {c.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <button onClick={() => handleDelete(c.id)} style={{ padding: '4px 10px', background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', width: '100%', maxWidth: 400 }}>
            <h2 style={{ marginTop: 0, fontSize: '1.25rem', fontWeight: 800 }}>Add Coupon</h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: 4 }}>CODE</label>
              <input value={form.code} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} placeholder="E.g. WELCOME10" style={{ width: '100%', padding: '0.6rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.9rem' }} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: 4 }}>TYPE</label>
                <select value={form.discount_type} onChange={e => setForm({...form, discount_type: e.target.value})} style={{ width: '100%', padding: '0.6rem', border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff' }}>
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed (Rs.)</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: 4 }}>VALUE</label>
                <input type="number" value={form.discount_value} onChange={e => setForm({...form, discount_value: e.target.value})} placeholder="10" style={{ width: '100%', padding: '0.6rem', border: '1px solid #e2e8f0', borderRadius: 8 }} />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', marginBottom: 4 }}>MIN PURCHASE (Rs.)</label>
              <input type="number" value={form.min_purchase} onChange={e => setForm({...form, min_purchase: e.target.value})} placeholder="0" style={{ width: '100%', padding: '0.6rem', border: '1px solid #e2e8f0', borderRadius: 8 }} />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSave} style={{ flex: 1, padding: '0.75rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Save Coupon</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
