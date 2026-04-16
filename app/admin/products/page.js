'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const CATEGORIES = ['Sauces', 'Pickles', 'Masalas', 'Chutneys'];

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', category: 'Sauces', price: '', inventory_count: '', is_featured: false, in_stock: true, slug: '', image_url: '' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  useEffect(() => {
    if (!localStorage.getItem('admin_session')) router.push('/admin');
    else fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    if (!supabase) {
      // Sample data
      setProducts([
        { id: 1, name: 'Green Chilli Sauce', category: 'Sauces', price: 299, inventory_count: 50, in_stock: true, is_featured: true, image_url: '', slug: 'green-chilli-sauce' },
        { id: 2, name: 'Red Chilli Sauce', category: 'Sauces', price: 299, inventory_count: 30, in_stock: true, is_featured: false, image_url: '', slug: 'red-chilli-sauce' },
        { id: 3, name: 'Garlic Mayo', category: 'Sauces', price: 349, inventory_count: 20, in_stock: true, is_featured: true, image_url: '', slug: 'garlic-mayo' },
        { id: 4, name: 'Imli Aloo Bahara', category: 'Sauces', price: 299, inventory_count: 15, in_stock: true, is_featured: false, image_url: '', slug: 'imli-aloo-bahara' },
        { id: 5, name: 'Mixed Pickle', category: 'Pickles', price: 450, inventory_count: 25, in_stock: true, is_featured: true, image_url: '', slug: 'mixed-pickle' },
      ]);
      setLoading(false);
      return;
    }
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openAdd = () => {
    setEditProduct(null);
    setForm({ name: '', description: '', category: 'Sauces', price: '', inventory_count: '', is_featured: false, in_stock: true, slug: '', image_url: '' });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({ name: p.name, description: p.description || '', category: p.category, price: p.price, inventory_count: p.inventory_count || 0, is_featured: p.is_featured, in_stock: p.in_stock, slug: p.slug, image_url: p.image_url || '' });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return showToast('Name and Price are required', 'error');
    setSaving(true);
    const payload = { ...form, price: Number(form.price), inventory_count: Number(form.inventory_count), slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-') };
    if (!supabase) {
      if (editProduct) setProducts(prev => prev.map(p => p.id === editProduct.id ? { ...p, ...payload } : p));
      else setProducts(prev => [{ id: Date.now(), ...payload }, ...prev]);
      showToast(editProduct ? 'Product updated!' : 'Product added!');
      setShowModal(false);
      setSaving(false);
      return;
    }
    const { error } = editProduct
      ? await supabase.from('products').update(payload).eq('id', editProduct.id)
      : await supabase.from('products').insert([payload]);
    if (error) showToast(error.message, 'error');
    else { showToast(editProduct ? 'Updated!' : 'Added!'); fetchProducts(); setShowModal(false); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    if (!supabase) { setProducts(prev => prev.filter(p => p.id !== id)); showToast('Deleted!'); return; }
    await supabase.from('products').delete().eq('id', id);
    showToast('Deleted!');
    fetchProducts();
  };

  const filtered = products.filter(p =>
    (p.name?.toLowerCase().includes(search.toLowerCase())) &&
    (!filterCat || p.category === filterCat)
  );
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <div>
      {toast && (
        <div style={{ position: 'fixed', top: 80, right: 20, zIndex: 999, background: toast.type === 'error' ? '#FEE2E2' : '#D1FAE5', color: toast.type === 'error' ? '#DC2626' : '#059669', padding: '0.75rem 1.25rem', borderRadius: 8, fontWeight: 600, fontSize: '0.88rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          {toast.type === 'error' ? '❌' : '✅'} {toast.msg}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Products</h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 2 }}>{filtered.length} products found</p>
        </div>
        <button onClick={openAdd} style={{ padding: '0.65rem 1.25rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
          + Add Product
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search products..." style={{ flex: '1 1 200px', padding: '0.6rem 1rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.88rem', outline: 'none' }} />
        <select value={filterCat} onChange={e => { setFilterCat(e.target.value); setPage(1); }} style={{ padding: '0.6rem 1rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.88rem', outline: 'none', background: '#fff' }}>
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Image', 'Name', 'Category', 'Price', 'Stock', 'Status', 'Featured', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading...</td></tr>
              ) : paginated.length === 0 ? (
                <tr><td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No products found</td></tr>
              ) : paginated.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ width: 44, height: 44, background: '#f1f5f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', overflow: 'hidden' }}>
                      {p.image_url ? <img src={p.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📦'}
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#0f172a' }}>{p.name}</td>
                  <td style={{ padding: '0.75rem 1rem' }}><span style={{ background: '#EDE9FE', color: '#7C3AED', padding: '2px 8px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 600 }}>{p.category}</span></td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0f172a' }}>Rs. {p.price}</td>
                  <td style={{ padding: '0.75rem 1rem', color: p.inventory_count < 10 ? '#DC2626' : '#334155' }}>{p.inventory_count || 0}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{ background: p.in_stock ? '#D1FAE5' : '#FEE2E2', color: p.in_stock ? '#059669' : '#DC2626', padding: '2px 8px', borderRadius: 10, fontSize: '0.75rem', fontWeight: 700 }}>
                      {p.in_stock ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{ fontSize: '1rem' }}>{p.is_featured ? '⭐' : '—'}</span>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => openEdit(p)} style={{ padding: '4px 10px', background: '#EFF6FF', color: '#2563EB', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>Edit</button>
                      <button onClick={() => handleDelete(p.id)} style={{ padding: '4px 10px', background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)} style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid #e2e8f0', background: page === n ? '#0f172a' : '#fff', color: page === n ? '#fff' : '#334155', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>{n}</button>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#64748b' }}>×</button>
            </div>

            {[
              { label: 'Product Name *', key: 'name', type: 'text', placeholder: 'e.g. Green Chilli Sauce' },
              { label: 'Price (PKR) *', key: 'price', type: 'number', placeholder: '299' },
              { label: 'Stock Quantity', key: 'inventory_count', type: 'number', placeholder: '50' },
              { label: 'URL Slug', key: 'slug', type: 'text', placeholder: 'green-chilli-sauce' },
              { label: 'Image URL', key: 'image_url', type: 'text', placeholder: '/images/products/...' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.label}</label>
                <input type={f.type} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                  style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.9rem', outline: 'none', background: '#fff' }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Description</label>
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} placeholder="Product description..."
                style={{ width: '100%', padding: '0.65rem 0.85rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.9rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#334155' }}>
                <input type="checkbox" checked={form.in_stock} onChange={e => setForm(p => ({ ...p, in_stock: e.target.checked }))} style={{ accentColor: '#10B981' }} />
                In Stock
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#334155' }}>
                <input type="checkbox" checked={form.is_featured} onChange={e => setForm(p => ({ ...p, is_featured: e.target.checked }))} style={{ accentColor: '#F59E0B' }} />
                Featured
              </label>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '0.7rem', background: '#f1f5f9', color: '#334155', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: '0.7rem', background: '#0f172a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
                {saving ? 'Saving...' : (editProduct ? 'Save Changes' : 'Add Product')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
