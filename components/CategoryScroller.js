'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '@/lib/sampleData';
import styles from './CategoryScroller.module.css';

export default function CategoryScroller() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Browse Categories</span>
          <h2>What Are You Craving?</h2>
          <p>Explore our range of authentic homemade products, each crafted with love and tradition.</p>
        </motion.div>

        <div className={styles.scrollWrapper}>
          <button className={`${styles.scrollBtn} ${styles.scrollLeft}`} onClick={() => scroll('left')} aria-label="Scroll left">
            <ChevronLeft size={20} />
          </button>

          <div className={styles.scroller} ref={scrollRef}>
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link href={`/shop?category=${cat.slug}`} className={styles.card}>
                  <div className={styles.cardIcon}>
                    <Image src={cat.image} alt={cat.name} fill className={styles.catImage} />
                  </div>
                  <h3 className={styles.cardName}>{cat.name}</h3>
                  <p className={styles.cardDesc}>{cat.description}</p>
                  <span className={styles.shopLink} style={{ color: cat.color }}>Shop Now →</span>
                </Link>
              </motion.div>
            ))}
          </div>

          <button className={`${styles.scrollBtn} ${styles.scrollRight}`} onClick={() => scroll('right')} aria-label="Scroll right">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
