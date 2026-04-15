'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    }, 1000);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.inner}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.content}>
            <span className={styles.emoji}>📧</span>
            <h2 className={styles.title}>Stay in the Loop</h2>
            <p className={styles.desc}>
              Get exclusive recipes, new product launches, and special discounts delivered straight to your inbox.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {status === 'success' ? (
              <motion.div
                className={styles.successMsg}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle size={24} />
                <span>You&apos;re subscribed! Welcome to the family 🎉</span>
              </motion.div>
            ) : (
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                  id="newsletter-email"
                />
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
            )}
            <p className={styles.privacy}>No spam, ever. Unsubscribe anytime.</p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
