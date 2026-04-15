'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, Utensils, Award, Users, Star, Camera } from 'lucide-react';
import Newsletter from '@/components/Newsletter';
import styles from './page.module.css';

export default function AboutPage() {
  const values = [
    { icon: <Heart size={28} />, title: 'Made with Love', desc: 'Every product is crafted with the same love and care as cooking for our own family.' },
    { icon: <Utensils size={28} />, title: 'Traditional Recipes', desc: 'Authentic family recipes passed down through three generations of passionate cooks.' },
    { icon: <Award size={28} />, title: 'Premium Quality', desc: 'Only the finest, freshest ingredients sourced from trusted local suppliers.' },
    { icon: <Users size={28} />, title: 'Community First', desc: 'Building a community of food lovers who appreciate real, homemade flavors.' },
  ];

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1596450514735-244a2df3f33e?q=80&w=1200&auto=format&fit=crop', class: styles.galleryLarge }, // Peppers
    { src: 'https://images.unsplash.com/photo-1588123190131-1c3fac394f4b?q=80&w=800&auto=format&fit=crop', class: '' }, // Sauce pouring
    { src: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=800&auto=format&fit=crop', class: styles.galleryTall }, // Spices
    { src: 'https://images.unsplash.com/photo-1596649282321-dfa56b6942da?q=80&w=800&auto=format&fit=crop', class: '' }, // Chilli
    { src: 'https://images.unsplash.com/photo-1596484552834-6ca035db2038?q=80&w=800&auto=format&fit=crop', class: '' }, // Kitchen
  ];

  return (
    <div className={styles.aboutPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className={styles.heroContent}
          >
            <span className="section-label" style={{ color: 'var(--spice-warm)' }}>Our Heritage</span>
            <h1>A Legacy of Flavor</h1>
            <p>We are a family-run artisanal kitchen from Lahore, dedicated to bringing the soul of homemade Pakistani cuisine to your table.</p>
          </motion.div>
        </div>
      </section>

      {/* Story (Editorial Layout) */}
      <section className={`section ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <motion.div
              className={styles.storyImage}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.storyImageReal}>
                <Image 
                  src="https://images.unsplash.com/photo-1556910103-1c02745a8728?q=80&w=800&auto=format&fit=crop" 
                  alt="Traditional Kitchen" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.realImg}
                />
              </div>
            </motion.div>

            <motion.div
              className={styles.storyContent}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-label" style={{ color: 'var(--spice-warm)' }}>Meet Maa G</span>
              <h2>Authentic. Small-Batch. Loved.</h2>
              <p>
                The story of Maa G&apos;s Kitchen is a story of 25 years of devotion. 
                What started as a labor of love for her children in a small Lahore kitchen 
                has now become a celebration of traditional Pakistani condiments for the whole country.
              </p>
              <p>
                Every bottle we produce is a promise. A promise of zero preservatives, 
                zero artificial thickeners, and 100% authentic flavor. We don&apos;t just make sauces; 
                we preserve the memories of home-cooked meals.
              </p>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                 <div style={{ padding: '1rem', background: 'rgba(212,168,83,0.1)', borderRadius: '12px', border: '1px solid var(--spice-warm)' }}>
                    <Star color="var(--spice-warm)" fill="var(--spice-warm)" size={20} />
                 </div>
                 <div>
                    <h4 style={{ margin: 0, color: 'var(--white)' }}>25+ Years of Tradition</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.7 }}>Passing down the secret blend of spices.</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={styles.gallerySection}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <span className="section-label" style={{ color: 'var(--spice-warm)' }}>Our World</span>
            <h2>Moments from the Kitchen</h2>
          </div>

          <div className={styles.galleryGrid}>
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                className={`${styles.galleryItem} ${img.class}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Image src={img.src} alt="Kitchen gallery" fill sizes="50vw" />
                <div className={styles.galleryOverlay}>
                   <Camera size={24} color="var(--white)" style={{ position: 'absolute', bottom: '20px', right: '20px', opacity: 0.6 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values (White cards on dark) */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label" style={{ color: 'var(--spice-warm)' }}>Our Values</span>
            <h2 style={{ color: 'var(--white)' }}>What We Stand For</h2>
          </div>

          <div className={styles.valuesGrid}>
            {values.map((val, i) => (
              <motion.div
                key={i}
                className={styles.valueCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className={styles.valueIcon}>{val.icon}</div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
