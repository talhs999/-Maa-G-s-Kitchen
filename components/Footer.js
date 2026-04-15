import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Camera, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        {/* Column 1: Brand */}
        <div className={styles.col}>
          <div className={styles.brand}>
            <span className={styles.brandMaa}>Maa G&apos;s</span>
            <span className={styles.brandKitchen}>Kitchen</span>
          </div>
          <p className={styles.brandDesc}>
            Homemade flavors crafted with love, tradition, and
            the finest ingredients — straight from Maa&apos;s kitchen to your table.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram" className={styles.socialLink}><Camera size={18} /></a>
            <a href="#" aria-label="Facebook" className={styles.socialLink}><Globe size={18} /></a>
            <a href="#" aria-label="Twitter" className={styles.socialLink}><MessageCircle size={18} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/shop">Shop All</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Service */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Customer Service</h4>
          <ul className={styles.linkList}>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/faq">Shipping Info</Link></li>
            <li><Link href="/faq">Returns & Refunds</Link></li>
            <li><Link href="/cart">My Cart</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Get In Touch</h4>
          <ul className={styles.contactList}>
            <li>
              <Mail size={16} />
              <span>hello@maagskitchen.pk</span>
            </li>
            <li>
              <Phone size={16} />
              <span>+92 300 1234567</span>
            </li>
            <li>
              <MapPin size={16} />
              <span>Lahore, Pakistan</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className="container">
          <p>© {new Date().getFullYear()} Maa G&apos;s Kitchen. All rights reserved. Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
