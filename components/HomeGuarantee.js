'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Ban, Award } from 'lucide-react';
import styles from './HomeGuarantee.module.css';

export default function HomeGuarantee() {
  const guarantees = [
    { icon: <Leaf size={40} />, title: '100% Organic Spices', desc: 'Sourced directly from local farmers.' },
    { icon: <Ban size={40} />, title: 'No Artificial Preservatives', desc: 'Naturally preserved for goodness.' },
    { icon: <ShieldCheck size={40} />, title: 'Strict Quality Control', desc: 'Maa G personally inspects every batch.' },
    { icon: <Award size={40} />, title: 'Authentic Heritage', desc: 'Real recipes passed down for decades.' }
  ];

  return (
    <section className={styles.guaranteeSection}>
      <div className="container">
        <div className={styles.guaranteeGrid}>
          {guarantees.map((item, i) => (
            <motion.div 
              key={i}
              className={styles.guaranteeCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.icon}>{item.icon}</div>
              <div className={styles.text}>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
