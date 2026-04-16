'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const SAMPLE_REVIEWS = [
  { id: 1, product_name: 'Hot Sauce', reviewer_name: 'Talha', rating: 5, comment: 'Amazing flavor!', created_at: new Date().toISOString(), is_approved: false },
  { id: 2, product_name: 'Garlic Mayo', reviewer_name: 'Ali', rating: 4, comment: 'Pretty good dip.', created_at: new Date(Date.now() - 86400000).toISOString(), is_approved: true },
];

export default function ReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('admin_session')) router.push('/admin');
    else fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    if (!supabase) { setReviews(SAMPLE_REVIEWS); setLoading(false); return; }
    const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
    setReviews(data || SAMPLE_REVIEWS);
    setLoading(false);
  };

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const toggleApproval = async (id, currentStatus) => {
    if (!supabase) { setReviews(p => p.map(r => r.id === id ? { ...r, is_approved: !currentStatus } : r)); showToast('Status updated'); return; }
    await supabase.from('reviews').update({ is_approved: !currentStatus }).eq('id', id);
    showToast('Status updated'); fetchReviews();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this review?')) return;
    if (!supabase) { setReviews(p => p.filter(r => r.id !== id)); showToast('Deleted!'); return; }
    await supabase.from('reviews').delete().eq('id', id);
    showToast('Deleted!'); fetchReviews();
  };

  const renderStars = (n) => '⭐'.repeat(n || 5);

  return (
    <div>
      {toast && <div style={{ position: 'fixed', top: 80, right: 20, zIndex: 999, background: toast.type === 'error' ? '#FEE2E2' : '#D1FAE5', color: toast.type === 'error' ? '#DC2626' : '#059669', padding: '0.75rem 1.25rem', borderRadius: 8, fontWeight: 600, fontSize: '0.88rem' }}>{toast.msg}</div>}

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Reviews</h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 2 }}>{reviews.length} product reviews</p>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead><tr style={{ background: '#f8fafc' }}>
            {['REVIEWER', 'PRODUCT', 'RATING', 'COMMENT', 'STATUS', 'ACTIONS'].map(h => <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e2e8f0' }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading...</td></tr> : reviews.map(r => (
              <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#0f172a' }}>{r.reviewer_name || r.name}</td>
                <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{r.product_name || `Product #${r.product_id}`}</td>
                <td style={{ padding: '0.85rem 1rem', fontSize: '0.8rem' }}>{renderStars(r.rating)}</td>
                <td style={{ padding: '0.85rem 1rem', color: '#334155', maxWidth: 200, WebkitLineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{r.comment}"</td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <span style={{ background: r.is_approved ? '#D1FAE5' : '#FEF3C7', color: r.is_approved ? '#059669' : '#D97706', padding: '2px 8px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 700 }}>
                    {r.is_approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td style={{ padding: '0.85rem 1rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => toggleApproval(r.id, r.is_approved)} style={{ padding: '4px 10px', background: r.is_approved ? '#FEF3C7' : '#D1FAE5', color: r.is_approved ? '#D97706' : '#059669', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>{r.is_approved ? 'Reject' : 'Approve'}</button>
                  <button onClick={() => handleDelete(r.id)} style={{ padding: '4px 10px', background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
