'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, Leaf, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import CategoryScroller from '@/components/CategoryScroller';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import Newsletter from '@/components/Newsletter';
import ProcessSection from '@/components/ProcessSection';
import MapSection from '@/components/MapSection';
import HomeGuarantee from '@/components/HomeGuarantee';
import BackgroundVectors from '@/components/BackgroundVectors';
import { sampleProducts, sampleReviews } from '@/lib/sampleData';
import styles from './page.module.css';

export default function Home() {
  const featuredProducts = sampleProducts.filter((p) => p.is_featured);
  const bestsellerProducts = sampleProducts.filter((p) => p.is_bestseller);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <BackgroundVectors />
      
      {/* Hero */}
      <Hero />

      {/* Trust Bar */}
      <HomeGuarantee />

      {/* Categories */}
      <CategoryScroller />

      {/* Featured Products */}
      <section className={`section ${styles.featuredSection}`}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Our Collection</span>
            <h2>Featured Products</h2>
            <p>Handpicked favorites made with authentic recipes and the finest ingredients.</p>
          </motion.div>

          <div className={styles.productGrid}>
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <motion.div
            className={styles.viewAll}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/shop" className="btn btn-outline">
              View All Products <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Traditional Process */}
      <ProcessSection />

      {/* About Teaser */}
      <section className={`section ${styles.aboutSection}`}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className={styles.aboutGrid}>
            <motion.div
              className={styles.aboutImage}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className={styles.aboutImageReal}>
                <Image 
                  src="https://images.unsplash.com/photo-1556910103-1c02745a8728?q=80&w=800&auto=format&fit=crop" 
                  alt="Maa G in the kitchen" 
                  fill 
                  className={styles.realImg}
                  priority
                />
              </div>
              <div className={styles.aboutBadge}>
                <span className={styles.aboutBadgeNum}>25+</span>
                <span className={styles.aboutBadgeText}>Years of Tradition</span>
              </div>
            </motion.div>

            <motion.div
              className={styles.aboutContent}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="section-label">Our Story</span>
              <h2>Made with Love, Served with Pride</h2>
              <p>
                What started in Maa G&apos;s humble kitchen over 25 years ago has grown into a beloved
                brand trusted by families across Pakistan. Our recipes have been passed down through
                three generations.
              </p>
              <p>
                Every jar is a labor of love — hand-mixed, slow-cooked, and
                prepared with the same care as if we were cooking for our own family.
              </p>
              <Link href="/about" className="btn btn-primary">
                Read Our Story <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className={`section ${styles.bestsellersSection}`}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">🔥 Hot Right Now</span>
            <h2>Our Bestsellers</h2>
          </motion.div>

          <div className={styles.productGrid}>
            {bestsellerProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`section ${styles.testimonialsSection}`}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Testimonials</span>
            <h2>What Our Customers Say</h2>
          </motion.div>

          <div className={styles.reviewsGrid}>
            {sampleReviews.slice(0, 3).map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us Map */}
      <MapSection />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
