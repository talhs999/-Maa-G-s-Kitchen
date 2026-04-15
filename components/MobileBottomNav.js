'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, ShoppingCart, User, Search } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import styles from './MobileBottomNav.module.css';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, toggleSidebar, mounted } = useCart();

  const navItems = [
    { href: '/', icon: <Home size={22} />, label: 'Home' },
    { href: '/shop', icon: <ShoppingBag size={22} />, label: 'Shop' },
    { href: '/account', icon: <User size={22} />, label: 'Account' },
  ];

  return (
    <div className={styles.bottomNav}>
      {navItems.map((item) => (
        <Link 
          key={item.href} 
          href={item.href} 
          className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
      
      <button className={styles.navItem} onClick={toggleSidebar}>
        <div className={styles.cartIconWrapper}>
          <ShoppingCart size={22} />
          {mounted && itemCount > 0 && (
            <span className={styles.badge}>{itemCount}</span>
          )}
        </div>
        <span>Cart</span>
      </button>
    </div>
  );
}
