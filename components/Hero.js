'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import CountdownTimer from './CountdownTimer';
import styles from './Hero.module.css';

export default function Hero() {
  // Target date for countdown (7 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  return (
    <section className={styles.hero}>
      <div className={styles.heroBg}>
        <Image 
          src="/images/hero-banner.png" 
          alt="Authentic Homemade Flavors" 
          fill 
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroGradient} />
        <div className={styles.heroPatternOverlay} />
      </div>

      <div className={`container ${styles.heroContent}`}>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.span
            className={styles.heroLabel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Pakistan&apos;s Favorite Homemade Flavors
          </motion.span>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Authentic Taste <span className={styles.titleAccent}>Crafted with Love</span>
          </motion.h1>

          <motion.p
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Hand-crafted sauces, chutneys, and pickles made with generations of tradition. 
            No preservatives — just the pure, bold goodness of Maa's kitchen.
          </motion.p>

          <motion.div
            className={styles.heroCtas}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link href="/shop" className="btn btn-primary btn-lg">
              Order Yours Now
            </Link>
            <Link href="/about" className="btn btn-outline btn-lg">
              Explore Our Story
            </Link>
          </motion.div>

          <div className={styles.timerWrapper}>
            <CountdownTimer targetDate={targetDate} />
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className={styles.waveDivider}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z"
            fill="var(--white)"
          />
        </svg>
      </div>
    </section>
  );
}
