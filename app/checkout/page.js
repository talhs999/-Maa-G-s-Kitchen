'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { items, subtotal, shippingCost, total, clearCart, mounted } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    address: '', city: '', postal: '', notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderNum = 'MGK-' + Date.now().toString(36).toUpperCase();
    setOrderNumber(orderNum);
    setOrderPlaced(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  if (!mounted) return null;

  if (orderPlaced) {
    return (
      <div className={styles.checkoutPage}>
        <section className={styles.successSection}>
          <motion.div
            className={styles.successContent}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle size={64} className={styles.successIcon} />
            <h1>Order Placed Successfully! 🎉</h1>
            <p>Thank you for your order. We&apos;ll send you a confirmation email shortly.</p>
            <div className={styles.orderNum}>
              <span>Order Number</span>
              <strong>{orderNumber}</strong>
            </div>
            <Link href="/shop" className="btn btn-primary btn-lg">
              Continue Shopping
            </Link>
          </motion.div>
        </section>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.checkoutPage}>
        <section className={styles.emptySection}>
          <div className="container">
            <h1>No items to checkout</h1>
            <p>Add some products to your cart first.</p>
            <Link href="/shop" className="btn btn-primary">Go to Shop</Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1>Checkout</h1>
            <p>Complete your order</p>
          </motion.div>
        </div>
      </section>

      <section className={`section ${styles.checkoutContent}`}>
        <div className="container">
          <form className={styles.checkoutGrid} onSubmit={handleSubmit}>
            {/* Form */}
            <div className={styles.formSection}>
              <h2>Contact Information</h2>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="checkout-name">Full Name *</label>
                  <input id="checkout-name" name="name" className="input" placeholder="Your full name" required value={formData.name} onChange={handleChange} />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="checkout-email">Email *</label>
                  <input id="checkout-email" name="email" type="email" className="input" placeholder="your@email.com" required value={formData.email} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="checkout-phone">Phone *</label>
                  <input id="checkout-phone" name="phone" className="input" placeholder="+92 300 1234567" required value={formData.phone} onChange={handleChange} />
                </div>
              </div>

              <h2 style={{ marginTop: 'var(--space-2xl)' }}>Shipping Address</h2>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="checkout-address">Address *</label>
                  <input id="checkout-address" name="address" className="input" placeholder="Street address" required value={formData.address} onChange={handleChange} />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="checkout-city">City *</label>
                  <input id="checkout-city" name="city" className="input" placeholder="City" required value={formData.city} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="checkout-postal">Postal Code</label>
                  <input id="checkout-postal" name="postal" className="input" placeholder="Postal code" value={formData.postal} onChange={handleChange} />
                </div>
              </div>

              <div className={styles.formRow} style={{ marginTop: 'var(--space-xl)' }}>
                <div className={styles.formGroup}>
                  <label htmlFor="checkout-notes">Order Notes (Optional)</label>
                  <textarea id="checkout-notes" name="notes" className="input textarea" placeholder="Any special instructions..." value={formData.notes} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className={styles.summarySection}>
              <div className={styles.orderSummary}>
                <h3>Order Summary</h3>
                {items.map((item) => (
                  <div key={item.id} className={styles.summaryItem}>
                    <div>
                      <span className={styles.summaryItemName}>{item.name}</span>
                      <span className={styles.summaryItemQty}>× {item.quantity}</span>
                    </div>
                    <span className={styles.summaryItemPrice}>Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
                <div className={styles.divider} />
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `Rs. ${shippingCost}`}</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>Rs. {total}</span>
                </div>

                <div className={styles.paymentNote}>
                  <ShieldCheck size={18} />
                  <span>Cash on Delivery — Pay when you receive your order</span>
                </div>

                <button type="submit" className={`btn btn-primary btn-lg ${styles.submitBtn}`} style={{ width: '100%' }}>
                  Place Order — Rs. {total}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
