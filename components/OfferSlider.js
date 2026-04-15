'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './OfferSlider.module.css';

const offers = [
  "🔥 FLASH SALE: 20% OFF Site-wide with code MAAG20",
  "🚚 FREE SHIPPING on all orders over Rs. 2,000",
  "🎁 NEW ARRIVAL: Try our special Eid Gift Pack!",
];

export default function OfferSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className={styles.slide}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
        >
          {offers[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
