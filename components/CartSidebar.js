'use client';

import { useCart } from '@/lib/cartContext';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import styles from './CartSidebar.module.css';

export default function CartSidebar() {
  const {
    items, sidebarOpen, closeSidebar,
    itemCount, subtotal, shippingCost, total,
    updateQuantity, removeItem, mounted
  } = useCart();

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${sidebarOpen ? styles.open : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <ShoppingBag size={20} />
            <h3>Your Cart ({itemCount})</h3>
          </div>
          <button
            className={styles.closeBtn}
            onClick={closeSidebar}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className={styles.items}>
          {items.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyEmoji}>🛒</span>
              <p>Your cart is empty</p>
              <Link
                href="/shop"
                className="btn btn-primary btn-sm"
                onClick={closeSidebar}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.item}>
                <div className={styles.itemImage}>
                  <Image 
                    src={item.image_url || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=200&auto=format&fit=crop'} 
                    alt={item.name} 
                    fill 
                    className={styles.realImg}
                  />
                </div>
                <div className={styles.itemInfo}>
                  <h4 className={styles.itemName}>{item.name}</h4>
                  <span className={styles.itemWeight}>{item.weight}</span>
                  <div className={styles.itemActions}>
                    <div className={styles.qtyControl}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className={styles.itemPrice}>Rs. {item.price * item.quantity}</span>
                  </div>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={styles.footer}>
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
            <Link
              href="/cart"
              className="btn btn-outline btn-sm"
              onClick={closeSidebar}
              style={{ width: '100%', marginBottom: '8px' }}
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              className="btn btn-primary btn-sm"
              onClick={closeSidebar}
              style={{ width: '100%' }}
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
