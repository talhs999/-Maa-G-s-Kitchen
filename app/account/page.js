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
          <div>
            <h1>My Account</h1>
            <p>Welcome back, {user?.user_metadata?.full_name || 'Guest'}</p>
          </div>
          <button className={`btn btn-outline ${styles.signOutBtn}`} onClick={handleSignOut}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>

        <div className={styles.dashboardGrid}>
          {/* Profile Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <User size={24} className="yellow-accent" />
              <h3>Profile Details</h3>
            </div>
            <div className={styles.cardBody}>
              <p><strong>Name:</strong> {user?.user_metadata?.full_name || 'Not provided'}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Status:</strong> Active</p>
            </div>
          </div>

          {/* Orders Section */}
          <div className={`${styles.card} ${styles.ordersCard}`}>
            <div className={styles.cardHeader}>
              <Package size={24} className="yellow-accent" />
              <h3>Order History</h3>
            </div>
            <div className={styles.cardBody}>
              {orders.length === 0 ? (
                <div className={styles.emptyState}>
                  <AlertCircle size={48} className={styles.emptyIcon} />
                  <p>You haven&apos;t placed any orders yet.</p>
                  <button className="btn btn-primary btn-sm" onClick={() => router.push('/shop')}>Start Shopping</button>
                </div>
              ) : (
                <div className={styles.tableWrapper}>
                  <table className={styles.ordersTable}>
                    <thead>
                      <tr>
                        <th>Order #</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>{order.order_number}</td>
                          <td>{new Date(order.created_at).toLocaleDateString()}</td>
                          <td>Rs. {order.total_amount}</td>
                          <td>
                            <span className={`${styles.statusBadge} ${styles[`status${order.status}`]}`}>
                              {order.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
