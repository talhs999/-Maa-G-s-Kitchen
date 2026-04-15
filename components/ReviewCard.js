'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import styles from './ReviewCard.module.css';

export default function ReviewCard({ review, index = 0 }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < review.rating);

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={styles.quoteIcon}>
        <Quote size={24} />
      </div>

      <div className={styles.stars}>
        {stars.map((active, i) => (
          <Star
            key={i}
            size={16}
            fill={active ? '#FFC107' : 'none'}
            stroke={active ? '#FFC107' : '#ccc'}
          />
        ))}
      </div>

      <p className={styles.comment}>{review.comment}</p>

      <div className={styles.author}>
        <div className={styles.avatar}>
          {review.name.charAt(0)}
        </div>
        <div>
          <span className={styles.name}>{review.name}</span>
          <span className={styles.date}>
            {new Date(review.created_at).toLocaleDateString('en-PK', {
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
