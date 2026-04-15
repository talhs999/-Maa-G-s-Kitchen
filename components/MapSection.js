'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './MapSection.module.css';

export default function MapSection() {
  return (
    <section className={`section ${styles.mapSection}`}>
      <div className="container">
        <div className={styles.mapGrid}>
          <motion.div 
            className={styles.infoContent}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label">Find Us</span>
            <h2>Visit Maa G&apos;s Sanctuary</h2>
            <p>Our kitchen is located in the heart of Karachi, where the sea breeze meets the aromatic chaos of local spice markets.</p>
            
            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <div className={styles.iconBox}><MapPin size={20} /></div>
                <div>
                  <h4>Location</h4>
                  <p>DHA Phase 6, Karachi, Pakistan</p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.iconBox}><Phone size={20} /></div>
                <div>
                  <h4>Call Us</h4>
                  <p>+92 300 1234567</p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.iconBox}><Mail size={20} /></div>
                <div>
                  <h4>Email</h4>
                  <p>hello@maagskitchen.pk</p>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={styles.iconBox}><Clock size={20} /></div>
                <div>
                  <h4>Kitchen Hours</h4>
                  <p>Mon - Sat: 10:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.mapContainer}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.mapFrame}>
              {/* Google Maps Embed - Karachi focus */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14486.23307567755!2d67.0543666!3d24.8105745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33c8ef78c857d%3A0x63321cf79f041b65!2sDHA%20Phase%206%20Defence%20Phase%206%20Defence%20Housing%20Authority%2C%20Karachi%2C%20Karachi%20City%2C%20Sindh!5e0!3m2!1sen!2spk!4v1713145000000!5m2!1sen!2spk" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Maa G's Kitchen Location"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
