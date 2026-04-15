'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import styles from './CountdownTimer.module.css';

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <motion.div 
      className={styles.timerContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={styles.timerHeader}>
        <Clock size={20} className={styles.icon} />
        <span>Flash Sale Ends In:</span>
      </div>
      <div className={styles.timerUnits}>
        <div className={styles.unit}>
          <span className={styles.value}>{String(timeLeft.days).padStart(2, '0')}</span>
          <span className={styles.label}>Days</span>
        </div>
        <span className={styles.colon}>:</span>
        <div className={styles.unit}>
          <span className={styles.value}>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className={styles.label}>Hours</span>
        </div>
        <span className={styles.colon}>:</span>
        <div className={styles.unit}>
          <span className={styles.value}>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className={styles.label}>Mins</span>
        </div>
        <span className={styles.colon}>:</span>
        <div className={styles.unit}>
          <span className={styles.value}>{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className={styles.label}>Secs</span>
        </div>
      </div>
    </motion.div>
  );
}
