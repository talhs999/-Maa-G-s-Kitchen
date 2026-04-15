'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cartContext';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, toggleSidebar, mounted } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const leftLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
  ];

  const rightLinks = [
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerInner}`}>
        {/* Left Nav */}
        <nav className={`${styles.desktopNav} ${styles.leftNav}`}>
          {leftLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logo (Centered) */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMaa}>Maa G&apos;s</span>
          <span className={styles.logoKitchen}>Kitchen</span>
        </Link>

        {/* Right Nav + Actions */}
        <div className={styles.rightSide}>
          <nav className={`${styles.desktopNav} ${styles.rightNav}`}>
            {rightLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link href="/account" className={styles.iconBtn} aria-label="My Account">
              <User size={20} />
            </Link>

            <button
              className={styles.iconBtn}
              onClick={toggleSidebar}
              aria-label="Open cart"
              id="cart-toggle-btn"
            >
              <ShoppingCart size={20} />
              {mounted && itemCount > 0 && (
                <span className={styles.cartBadge}>{itemCount}</span>
              )}
            </button>

            {/* Mobile Toggle */}
            <button
              className={styles.mobileToggle}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuHeader}>
          <Link href="/" className={styles.logo} onClick={() => setMobileOpen(false)}>
            <span className={styles.logoMaa}>Maa G&apos;s</span>
            <span className={styles.logoKitchen}>Kitchen</span>
          </Link>
          <button className={styles.iconBtn} onClick={() => setMobileOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {[...leftLinks, ...rightLinks].map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              onClick={() => setMobileOpen(false)}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/shop"
            className={`btn btn-primary ${styles.mobileCta}`}
            onClick={() => setMobileOpen(false)}
          >
            Shop Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
