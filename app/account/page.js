'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { LogOut, Package, CreditCard, User, AlertCircle } from 'lucide-react';
import styles from './page.module.css';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'profile'
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          router.push('/auth');
          return;
        }

        setUser(session.user);

        // Fetch user's orders based on email
        const { data: ordersData, error } = await supabase
          .from('orders')
          .select('*')
          .eq('customer_email', session.user.email)
          .order('created_at', { ascending: false });

        if (!error && ordersData) {
          setOrders(ordersData);
        }
      } catch (err) {
        console.error("Supabase failed:", err);
        // Do not crash the app, safely fallback to auth
        router.push('/auth');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndOrders();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch(err) {
      console.log(err);
    }
    router.push('/auth');
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className="skeleton" style={{ width: '100%', height: '400px' }}></div>
      </div>
    );
  }

  return (
    <div className={styles.accountPage}>
      <div className="container">
        <div className={styles.accountHeader}>
          <h1>YOUR ACCOUNT</h1>
          <button className={styles.signOutBtn} onClick={handleSignOut}>
            <LogOut size={16} /> SIGN OUT
          </button>
        </div>

        <div className={styles.dashboardGrid}>
          {/* ---- Left Sidebar ---- */}
          <div className={styles.sidebar}>
            <div className={styles.profileBlock}>
              <div className={styles.avatar}>
                <User size={24} />
              </div>
              <h3 className={styles.profileName}>{user?.user_metadata?.full_name || 'Guest'}</h3>
              <p className={styles.profileEmail}>{user?.email}</p>
            </div>
            
            <nav className={styles.sidebarNav}>
              <button 
                className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <Package size={18} /> Order History
              </button>
              <button 
                className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <User size={18} /> Profile Details
              </button>
            </nav>

            <div className={styles.referralBlock}>
              <span className={styles.referralLabel}>YOUR REFERRAL CODE</span>
              <strong className={styles.referralCode}>GMGP-D414CD18</strong>
            </div>
          </div>

          {/* ---- Right Main Content ---- */}
          <div className={styles.mainContent}>
            {activeTab === 'orders' && (
              <div className={styles.tabContent}>
                <h2 className={styles.tabTitle}>RECENT ORDERS</h2>
                
                {orders.length === 0 ? (
                  <div className={styles.emptyState}>
                    <p>You haven&apos;t placed any orders yet.</p>
                    <button className="btn btn-dark" onClick={() => router.push('/shop')}>Start Shopping</button>
                  </div>
                ) : (
                  <div className={styles.ordersList}>
                    {orders.map(order => {
                      const statusClass = order.status ? order.status.toLowerCase() : 'pending';
                      return (
                        <div key={order.id} className={styles.orderRow}>
                          <div className={styles.orderInfo}>
                            <h4 className={styles.orderId}>{order.order_number}</h4>
                            <p className={styles.orderDate}>{new Date(order.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                          </div>
                          
                          <div className={styles.orderActions}>
                            <span className={`${styles.statusBadge} ${styles[statusClass]}`}>
                              {order.status || 'PENDING'}
                            </span>
                            
                            <strong className={styles.orderTotal}>
                              ${order.total_amount ? typeof order.total_amount === 'number' ? order.total_amount.toFixed(2) : order.total_amount : '0.00'}
                            </strong>
                            
                            <button className={styles.deleteBtn}>
                              <AlertCircle size={14} /> 
                              {statusClass === 'cancelled' ? 'Delete' : 'Cancel'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div className={styles.tabContent}>
                <h2 className={styles.tabTitle}>ACCOUNT DETAILS</h2>
                
                <form className={styles.profileForm}>
                  <div className={styles.inputGroup}>
                    <label>EMAIL</label>
                    <input type="email" value={user?.email || ''} readOnly className={styles.inputDisabled} />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label>FULL NAME</label>
                    <input type="text" defaultValue={user?.user_metadata?.full_name || ''} className={styles.input} />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label>PHONE</label>
                    <input type="tel" defaultValue="" className={styles.input} />
                  </div>
                  
                  <button type="button" className={`btn btn-dark ${styles.updateBtn}`}>UPDATE PROFILE</button>
                </form>

                <div className={styles.dangerZone}>
                  <h3 className={styles.dangerTitle}>DANGER ZONE</h3>
                  <p className={styles.dangerText}>
                    Permanently deactivate your account. This action cannot be undone, but will be reflected in the admin records.
                  </p>
                  <button className={styles.dangerBtn}>DELETE MY ACCOUNT</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
