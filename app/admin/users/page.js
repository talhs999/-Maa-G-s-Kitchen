'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const SAMPLE_USERS = [
  { id: '1', email: 'admin@kitchen.com', raw_user_meta_data: { full_name: 'GMGP Admin' }, role: 'Super Admin', created_at: new Date().toISOString() },
  { id: '2', email: 'talha@test.com', raw_user_meta_data: { full_name: 'Muhammad Talha Khan' }, role: 'Customer', created_at: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', email: 'zaud@test.com', raw_user_meta_data: { full_name: 'zaud' }, role: 'Customer', created_at: new Date(Date.now() - 172800000).toISOString() },
];

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('admin_session')) router.push('/admin');
    else fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    if (!supabase || !supabase.auth.admin) { setUsers(SAMPLE_USERS); setLoading(false); return; }
    
    // In a real app, you need a backend route or service_role key to list users
    // This is a placeholder for the UI
    const { data: { users }, error } = await supabase.auth.admin.listUsers();
    setUsers(users?.length ? users.map(u => ({ ...u, role: u.email === 'admin@kitchen.com' ? 'Super Admin' : 'Customer' })) : SAMPLE_USERS);
    setLoading(false);
  };

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const updateRole = (id, role) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
    showToast(`Role updated to ${role}`);
  };

  const handleDelete = (id) => {
    if (!confirm('Permanently delete this user?')) return;
    setUsers(p => p.filter(u => u.id !== id));
    showToast('User deleted');
  };

  const filtered = users.filter(u => 
    u.email?.toLowerCase().includes(search.toLowerCase()) || 
    u.raw_user_meta_data?.full_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {toast && <div style={{ position: 'fixed', top: 80, right: 20, zIndex: 999, background: toast.type === 'error' ? '#FEE2E2' : '#D1FAE5', color: toast.type === 'error' ? '#DC2626' : '#059669', padding: '0.75rem 1.25rem', borderRadius: 8, fontWeight: 600, fontSize: '0.88rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>{toast.msg}</div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div><h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Users</h1><p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 2 }}>{filtered.length} registered accounts</p></div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." style={{ width: '100%', maxWidth: 300, padding: '0.6rem 1rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.88rem', outline: 'none' }} />
      </div>

      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead><tr style={{ background: '#f8fafc' }}>
            {['USER', 'EMAIL', 'ROLE', 'JOINED', 'ACTIONS'].map(h => <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #e2e8f0' }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading...</td></tr>
              : filtered.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                  <td style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg,#D4A853,#B8860B)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', fontWeight: 700, fontSize: '0.8rem' }}>
                      {u.raw_user_meta_data?.full_name?.[0] || 'U'}
                    </div>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{u.raw_user_meta_data?.full_name || 'Anonymous'}</span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{u.email}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <select value={u.role || 'Customer'} onChange={e => updateRole(u.id, e.target.value)} style={{ padding: '3px 6px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: '0.78rem', background: '#fff', cursor: 'pointer', fontWeight: u.role === 'Super Admin' ? 700 : 400, color: u.role === 'Super Admin' ? '#0f172a' : '#64748b' }}>
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>{new Date(u.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <button onClick={() => handleDelete(u.id)} style={{ padding: '4px 10px', background: '#FEF2F2', color: '#DC2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
