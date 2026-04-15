'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { faqData } from '@/lib/sampleData';
import styles from './page.module.css';

function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
      <button className={styles.faqQuestion} onClick={onClick}>
        <span>{question}</span>
        <ChevronDown size={20} className={styles.chevron} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.faqAnswer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className={styles.faqPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Help Center</span>
            <h1>Frequently Asked Questions</h1>
            <p>Got questions? We have answers. If you can&apos;t find what you&apos;re looking for, feel free to contact us.</p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className={`section ${styles.faqContent}`}>
        <div className="container">
          <div className={styles.faqGrid}>
            <div className={styles.faqMain}>
              {faqData.map((section, sIdx) => (
                <motion.div
                  key={sIdx}
                  className={styles.faqCategory}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: sIdx * 0.1 }}
                >
                  <h2 className={styles.categoryTitle}>{section.category}</h2>
                  {section.questions.map((item, qIdx) => {
                    const key = `${sIdx}-${qIdx}`;
                    return (
                      <FaqItem
                        key={key}
                        question={item.q}
                        answer={item.a}
                        isOpen={!!openItems[key]}
                        onClick={() => toggleItem(key)}
                      />
                    );
                  })}
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <aside className={styles.faqSidebar}>
              <div className={styles.sidebarCard}>
                <MessageCircle size={32} />
                <h3>Still Need Help?</h3>
                <p>Can&apos;t find what you&apos;re looking for? Our team is here to help!</p>
                <Link href="/contact" className="btn btn-primary btn-sm">
                  Contact Us
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
