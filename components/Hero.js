'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import CountdownTimer from './CountdownTimer';
import styles from './Hero.module.css';

const heroImages = [
  '/images/about/sauce_jars.png',
  '/images/products/imli-aloo-bahara.png',
  '/images/about/spices_closeup.png',
];

export default function Hero() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      {/* ── Left Text Panel ── */}
      <div className="container" style={{ display: 'contents' }}>
        <motion.div
          className={styles.heroLeft}
          style={{ paddingLeft: 'max(1.5rem, calc((100vw - 1280px)/2 + 1.5rem))' }}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span
            className={styles.heroLabel}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Pakistan&apos;s Finest Homemade Flavors
          </motion.span>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Authentic Taste
            <span className={styles.titleAccent}>Crafted with Love</span>
          </motion.h1>

          <motion.p
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            Hand-crafted sauces and pickles made with generations of tradition from Lahore.
            No preservatives — just the pure, bold goodness of Maa&apos;s kitchen.
          </motion.p>

          <motion.div
            className={styles.heroCtas}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="/shop" className="btn btn-primary btn-lg">
              Shop Now
            </Link>
            <Link href="/about" className="btn btn-outline btn-lg">
              Our Story
            </Link>
          </motion.div>

          <div className={styles.timerWrapper}>
            <CountdownTimer targetDate={targetDate} />
          </div>


        </motion.div>

        {/* ── Right Image Panel ── */}
        <motion.div
          className={styles.heroRight}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div className={styles.heroBg}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className={styles.heroImageWrapper}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
              >
                <Image
                  src={heroImages[currentImageIndex]}
                  alt="Maa G's Kitchen handcrafted selection"
                  fill
                  priority={currentImageIndex === 0}
                  className={styles.heroImage}
                  sizes="50vw"
                  style={{ objectFit: 'cover' }}
                />
              </motion.div>
            </AnimatePresence>
            <div className={styles.heroGradient} />
            <div className={styles.heroPatternOverlay} />
          </div>

          {/* Floating badge over the image */}
          <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, type: 'spring' }}
          >
            <span className={styles.heroBadgeNum}>25+</span>
            <span className={styles.heroBadgeText}>Years of Tradition</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
