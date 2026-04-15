'use client';

import { motion } from 'framer-motion';
import { ChefHat, Flame, Sun } from 'lucide-react';
import styles from './ProcessSection.module.css';

export default function ProcessSection() {
  const steps = [
    {
      icon: <ChefHat size={40} />,
      title: 'Hand-Roasted Spices',
      desc: 'We start by slow-roasting whole organic spices to release their deep, authentic aromas.',
      color: '#FFC107'
    },
    {
      icon: <Flame size={40} />,
      title: 'Small Batch Infusion',
      desc: 'Unlike factory brands, we cook in small batches to ensure flavor perfection in every jar.',
      color: '#D32F2F'
    },
    {
      icon: <Sun size={40} />,
      title: 'Natural Sun Maturation',
      desc: 'Our pickles are cured in the natural sunlight of Karachi, just like our ancestors did.',
      color: '#FF9800'
    }
  ];

  return (
    <section className={`section ${styles.processSection}`}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Our Craft</span>
          <h2>The Traditional Process</h2>
          <p>We honor the heritage of Pakistani cuisine with methods that haven't changed for generations.</p>
        </motion.div>

        <div className={styles.processGrid}>
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              className={styles.processCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className={styles.iconWrapper} style={{ backgroundColor: `${step.color}15`, color: step.color }}>
                {step.icon}
                <div className={styles.stepNum}>{i + 1}</div>
              </div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
