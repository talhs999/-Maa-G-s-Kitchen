'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  const contactInfo = [
    { icon: <Mail size={24} />, title: 'Email Us', info: 'hello@maagskitchen.pk', desc: 'We reply within 24 hours' },
    { icon: <Phone size={24} />, title: 'Call Us', info: '+92 300 1234567', desc: 'Mon-Sat, 9am-6pm PKT' },
    { icon: <MapPin size={24} />, title: 'Visit Us', info: 'Karachi, Pakistan', desc: 'By appointment only' },
    { icon: <Clock size={24} />, title: 'Working Hours', info: 'Mon-Sat: 9am-6pm', desc: 'Sunday: Closed' },
  ];

  return (
    <div className={styles.contactPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Get In Touch</span>
            <h1>Contact Us</h1>
            <p>Have a question, feedback, or just want to say hello? We&apos;d love to hear from you!</p>
          </motion.div>
        </div>
      </section>

      <section className={`section ${styles.contactContent}`}>
        <div className="container">
          {/* Contact Info Cards */}
          <div className={styles.infoGrid}>
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                className={styles.infoCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className={styles.infoIcon}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p className={styles.infoMain}>{item.info}</p>
                <p className={styles.infoDesc}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            className={styles.formWrapper}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.formHeader}>
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
            </div>

            {status === 'success' ? (
              <motion.div
                className={styles.successMsg}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle size={48} />
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setStatus('idle')}
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-name">Full Name *</label>
                    <input id="contact-name" name="name" className="input" placeholder="Your name" required value={formData.name} onChange={handleChange} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-email">Email *</label>
                    <input id="contact-email" name="email" type="email" className="input" placeholder="you@email.com" required value={formData.email} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-phone">Phone</label>
                    <input id="contact-phone" name="phone" className="input" placeholder="+92 300 1234567" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-subject">Subject *</label>
                    <input id="contact-subject" name="subject" className="input" placeholder="How can we help?" required value={formData.subject} onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="contact-message">Message *</label>
                  <textarea id="contact-message" name="message" className="input textarea" placeholder="Tell us more..." required value={formData.message} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <span className={styles.spinner} />
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
