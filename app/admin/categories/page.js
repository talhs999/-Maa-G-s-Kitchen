'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const SAMPLE = [
  { id: 1, name: 'Sauces', description: 'Hot sauces and dips', product_count: 8, status: true },
  { id: 2, name: 'Pickles', description: 'Hand-made pickles', product_count: 5, status: true },
  { id: 3, name: 'Masalas', description: 'Spice blends', product_count: 6, status: true },
  { id: 4, name: 'Chutneys', description: 'Fresh chutneys', product_count: 4, status: false },
];

export default function CategoriesPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', status: true });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('admin_session')) router.push('/admin');
    else fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    if (!supabase) { setItems(SAMPLE); setLoading(false); return; }
    const { data } = await supabase.from('categories').select('*, products(count)').order('name');
    setItems(data || SAMPLE);
    setLoading(false);
  };

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const openAdd = () => { setEditing(null); setForm({ name: '', description: '', status: true }); setShowModal(true); };
  const openEdit = (c) => { setEditing(c); setForm({ name: c.name, description: c.description || '', status: c.status !== false }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.name.trim()) return showToast('Name is required', 'error');
    setSaving(true);
    if (!supabase) {
      if (editing) setItems(p => p.map(c => c.id === editing.id ? { ...c, ...form } : c));
      else setItems(p => [{ id: Date.now(), ...form, product_count: 0 }, ...p]);
      showToast(editing ? 'Updated!' : 'Created!'); setShowModal(false); setSaving(false); return;
    }
    const { error } = editing
      ? await supabase.from('categories').update(form).eq('id', editing.id)
      : await supabase.from('categories').insert([form]);
    if (error) showToast(error.message, 'error');
    else { showToast(editing ? 'Updated!' : 'Created!'); fetchData(); setShowModal(false); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this category?')) return;
    if (!supabase) { setItems(p => p.filter(c => c.id !== id)); showToast('Deleted!'); return; }
    await supabase.from('categories').delete().eq('id', id);
    showToast('Deleted!'); fetchData();
  };

  return (
    <div>
      {toast && <div style={{ position: 'fixed', top: 80, right: 20, zIndex: 999, background: toast.type === 'error' ? '#FEE2E2' : '#D1FAE5', color: toast.type === 'error' ? '#DC2626' : '#059669', padding: '0.75rem 1.25rem', borderRadius: 8, fontWeight: 600, fontSize: '0.88rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>{toast.msg}</div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div><h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Categories</h1><p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 2 }}>{items.length} categories</p></div>
        <button onClick={openAdd} style={{ padding: '0.65rem 1.25rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>+ Add Category</button>
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead><tr style={{ background: '#f8fafc' }}>
            {['CATEGORY', 'DESCRIPTION', 'PRODUCTS', 'STATUS', 'ACTIONS'].map(h => <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading...</td></tr>
              : items.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>{c.name}</td>
                  <td style={{ padding: '0.85rem 1rem', color: '#64748b', fontSize: '0.85rem' }}>{c.description || '—'}</td>
                  <td style={{ padding: '0.85rem 1rem' }}><span style={{ background: '#EDE9FE', color: '#7C3AED', padding: '2px 8px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 700 }}>{c.product_count ?? c.products?.[0]?.count ?? 0}</span></td>
                  <td style={{ padding: '0.85rem 1rem' }}><span style={{ background: c.status !== false ? '#D1FAE5' : '#FEE2E2', color: c.status !== false ? '#059669' : '#DC2626', padding: '2px 8px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 700 }}>{c.status !== false ? 'Active' : 'Inactive'}</span></td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => openEdit(c)} style={{ padding: '4px 10px', background: '#EFF6FF', color: '#2563EB', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>Edit</button>
                      <button onClick={() => handleDelete(c.id)} style={{ padding: '4px 10px', background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', width: '100%', maxWidth: 460 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{editing ? 'Edit Category' : 'Add Category'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}>×</button>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: 4, textTransform: 'uppercase' }}>Name *</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Category name" style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: 4, textTransform: 'uppercase' }}>Description</label>
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.9rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '1.5rem' }}>
              <input type="checkbox" checked={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.checked }))} style={{ accentColor: '#10B981' }} /> Active
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '0.7rem', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: '0.7rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>{saving ? 'Saving...' : (editing ? 'Save Changes' : 'Add Category')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
