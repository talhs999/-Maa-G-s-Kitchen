'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Printer, ArrowRight, Package, MapPin, Truck, User } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { submitOrder } from '@/lib/supabase';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { items, subtotal, shippingCost, total, clearCart, mounted } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrderData, setPlacedOrderData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderData = {
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postal_code: formData.postal,
        notes: formData.notes,
        subtotal: Number(subtotal),
        shipping_cost: Number(shippingCost),
        total: Number(total),
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image_url
        }))
      };

      const result = await submitOrder(orderData);
      
      if (result.success) {
        setOrderNumber(result.orderNumber);
        setPlacedOrderData(orderData);
        setOrderPlaced(true);
        clearCart();
        window.scrollTo(0, 0);
      } else {
        alert("Failed to place order: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (orderPlaced) {
    return (
      <div className={styles.checkoutPage}>
        <section className={styles.successSection}>
          <div className="container">
            <motion.div
              className={styles.invoiceCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={styles.invoiceHeader}>
                <div className={styles.invoiceBranding}>
                  <div className={styles.invoiceLogo}>🍳</div>
                  <div>
                    <h2>MAA G'S KITCHEN</h2>
                    <p>Homemade Goodness, Delivered.</p>
                  </div>
                </div>
                <div className={styles.invoiceMeta}>
                  <span className={styles.statusPill}>ORDER PLACED</span>
                  <p><strong>Order ID:</strong> {orderNumber}</p>
                  <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div className={styles.invoiceGrid}>
                <div className={styles.billingCol}>
                  <h4><User size={16} /> Customer Details</h4>
                  <p><strong>{placedOrderData?.customer_name}</strong></p>
                  <p>{placedOrderData?.customer_email}</p>
                  <p>{placedOrderData?.customer_phone}</p>
                </div>
                <div className={styles.shippingCol}>
                  <h4><MapPin size={16} /> Delivery Address</h4>
                  <p>{placedOrderData?.address}</p>
                  <p>{placedOrderData?.city}, {placedOrderData?.postal_code}</p>
                </div>
              </div>

              <div className={styles.invoiceTable}>
                <div className={styles.tableHead}>
                  <span>Item</span>
                  <span>Qty</span>
                  <span>Price</span>
                  <span>Total</span>
                </div>
                {placedOrderData?.items.map((item, id) => (
                  <div key={id} className={styles.tableRow}>
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                    <span>Rs. {item.price}</span>
                    <span>Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className={styles.invoiceFooter}>
                <div className={styles.summaryBox}>
                  <div className={styles.summaryLine}>
                    <span>Subtotal</span>
                    <span>Rs. {placedOrderData?.subtotal}</span>
                  </div>
                  <div className={styles.summaryLine}>
                    <span>Shipping Fee</span>
                    <span>Rs. {placedOrderData?.shipping_cost}</span>
                  </div>
                  <div className={`${styles.summaryLine} ${styles.grandTotal}`}>
                    <span>Grand Total</span>
                    <span>Rs. {placedOrderData?.total}</span>
                  </div>
                  <div className={styles.paymentMethod}>
                    <Truck size={14} /> Cash on Delivery
                  </div>
                </div>
              </div>

              <div className={styles.invoiceActions}>
                <button onClick={() => window.print()} className="btn btn-outline">
                  <Printer size={18} /> Print Invoice
                </button>
                <Link href="/account" className="btn btn-dark">
                  <Package size={18} /> View Order History
                </Link>
                <Link href="/shop" className="btn btn-primary">
                  Continue Shopping <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
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

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`btn btn-primary btn-lg ${styles.submitBtn}`} 
                  style={{ width: '100%' }}
                >
                  {isSubmitting ? 'Processing...' : `Place Order — Rs. ${total}`}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
