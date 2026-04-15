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
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Range</span>
          <h2>Explore the Collection</h2>
          <p>Handcrafted small-batch sauces made with authentic Pakistani recipes and the finest ingredients.</p>
        </motion.div>

        <div className={styles.scrollWrapper}>
          <button
            className={`${styles.scrollBtn} ${styles.scrollLeft}`}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>

          <div className={styles.scroller} ref={scrollRef}>
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link href={`/shop?category=${cat.slug}`} className={styles.card}>
                  {/* Bottle image */}
                  <div className={styles.bottleWrap}>
                    <div className={styles.bottleBg} style={{ background: cat.bgColor }} />
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className={styles.bottleImg}
                      sizes="(max-width: 768px) 50vw, 280px"
                    />
                  </div>

                  {/* Info */}
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardName}>{cat.name}</h3>
                    <p className={styles.cardDesc}>{cat.description}</p>
                    <span className={styles.shopLink}>
                      Shop Now
                      <span className={styles.arrow}>→</span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <button
            className={`${styles.scrollBtn} ${styles.scrollRight}`}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
