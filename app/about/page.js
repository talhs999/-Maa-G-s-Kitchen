'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, Utensils, Award, Users } from 'lucide-react';
import Newsletter from '@/components/Newsletter';
import styles from './page.module.css';

export default function AboutPage() {
  const values = [
    { icon: <Heart size={28} />, title: 'Made with Love', desc: 'Every product is crafted with the same love and care as cooking for our own family.' },
    { icon: <Utensils size={28} />, title: 'Traditional Recipes', desc: 'Authentic family recipes passed down through three generations of passionate cooks.' },
    { icon: <Award size={28} />, title: 'Premium Quality', desc: 'Only the finest, freshest ingredients sourced from trusted local suppliers.' },
    { icon: <Users size={28} />, title: 'Community First', desc: 'Building a community of food lovers who appreciate real, homemade flavors.' },
  ];

  const timeline = [
    { year: '2001', title: 'The Beginning', desc: 'Maa G starts making sauces and chutneys for family gatherings, amazhing everyone with her flavors.' },
    { year: '2010', title: 'Word Spreads', desc: 'Friends and neighbors start requesting Maa G\'s recipes. Small batches are prepared on demand.' },
    { year: '2020', title: 'Going Online', desc: 'The family decides to share Maa G\'s flavors with all of Pakistan through an online store.' },
    { year: '2026', title: 'Growing Strong', desc: 'Now serving thousands of happy customers across Pakistan with our range of homemade products.' },
  ];

  return (
    <div className={styles.aboutPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.heroContent}
          >
            <span className="section-label">Our Story</span>
            <h1>About Maa G&apos;s Kitchen</h1>
            <p>From a humble kitchen to your dining table — a story of love, tradition, and unforgettable flavors.</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className={`section ${styles.storySection}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <motion.div
              className={styles.storyImage}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className={styles.storyImageReal}>
                <Image 
                  src="https://images.unsplash.com/photo-1556910103-1c02745a8728?q=80&w=800&auto=format&fit=crop" 
                  alt="Maa G in the kitchen" 
                  fill 
                  className={styles.realImg}
                />
              </div>
            </motion.div>

            <motion.div
              className={styles.storyContent}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2>Meet Maa G</h2>
              <p>
                Behind every jar of sauce, every packet of masala, and every bottle of chutney is
                a woman who has spent over 25 years perfecting the art of homemade flavors. Known
                lovingly as &quot;Maa G&quot; by everyone in the family and the community, she
                believes that the secret ingredient in every great dish is love.
              </p>
              <p>
                Growing up in a household where food was the center of every celebration,
                Maa G learned the art of cooking from her own mother and grandmother. Each recipe
                carries within it memories of laughter-filled kitchens, festive gatherings, and
                the warmth of home.
              </p>
              <p>
                Today, Maa G&apos;s Kitchen brings those same cherished flavors to your doorstep.
                We never use artificial preservatives or shortcuts — because Maa G wouldn&apos;t
                have it any other way.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Values</span>
            <h2>What We Stand For</h2>
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

      {/* Timeline */}
      <section className={`section ${styles.timelineSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Journey</span>
            <h2>How It All Started</h2>
          </div>

          <div className={styles.timeline}>
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
