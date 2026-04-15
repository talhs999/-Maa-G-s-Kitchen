'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import styles from './page.module.css';

export default function CartPage() {
  const {
    items, itemCount, subtotal, shippingCost, total,
    updateQuantity, removeItem, mounted
  } = useCart();

  if (!mounted) return null;

  return (
    <div className={styles.cartPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Your Cart</h1>
            <p>{itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>
          </motion.div>
        </div>
      </section>

      <section className={`section ${styles.cartContent}`}>
        <div className="container">
          {items.length === 0 ? (
            <motion.div
              className={styles.emptyCart}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span className={styles.emptyEmoji}>🛒</span>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven&apos;t added any products yet. Browse our collection and find something you love!</p>
              <Link href="/shop" className="btn btn-primary btn-lg">
                <ShoppingBag size={20} /> Start Shopping
              </Link>
            </motion.div>
          ) : (
            <div className={styles.cartGrid}>
              {/* Cart Items */}
              <div className={styles.cartItems}>
                {/* Header */}
                <div className={styles.tableHeader}>
                  <span>Product</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Total</span>
                  <span></span>
                </div>

                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    className={styles.cartItem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className={styles.itemProduct}>
                      <div className={styles.itemImage}>
                        <span>🫙</span>
                      </div>
                      <div>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <span className={styles.itemWeight}>{item.weight}</span>
                      </div>
                    </div>

                    <div className={styles.itemPrice}>Rs. {item.price}</div>

                    <div className={styles.itemQty}>
                      <div className={styles.qtyControl}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className={styles.itemTotal}>Rs. {item.price * item.quantity}</div>

                    <button
                      className={styles.removeBtn}
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}

                <div className={styles.continueShopping}>
                  <Link href="/shop" className="btn btn-outline btn-sm">
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <motion.div
                className={styles.orderSummary}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3>Order Summary</h3>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `Rs. ${shippingCost}`}</span>
                </div>
                {shippingCost > 0 && (
                  <p className={styles.freeShipMsg}>
                    Add Rs. {2000 - subtotal} more for free shipping!
                  </p>
                )}
                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>Rs. {total}</span>
                </div>
                <Link href="/checkout" className={`btn btn-primary btn-lg ${styles.checkoutBtn}`} style={{ width: '100%' }}>
                  Proceed to Checkout <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
