'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, Leaf, ShieldCheck, Heart, ArrowRight, ChefHat, Sun, Zap } from 'lucide-react';
import Hero from '@/components/Hero';
import CategoryScroller from '@/components/CategoryScroller';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import Newsletter from '@/components/Newsletter';
import ProcessSection from '@/components/ProcessSection';
import MapSection from '@/components/MapSection';
import HomeGuarantee from '@/components/HomeGuarantee';
import BackgroundVectors from '@/components/BackgroundVectors';
import VideoSection from '@/components/VideoSection';
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

      {/* Our Story (Heritage) */}
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
                  src="https://images.unsplash.com/photo-1596484552834-6ca035db2038?q=80&w=800&auto=format&fit=crop" 
                  alt="Maa G in the kitchen" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
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
              <h2>A Legacy of Love & Flavor</h2>
              <p>
                The story of Maa G&apos;s Kitchen began over 25 years ago in a small family kitchen in Lahore. 
                What started as a labor of love for her children soon became a celebration for the entire community. 
                Maa G believes that the heartbeat of a home is its kitchen, and the soul of a meal is the love put into it.
              </p>
              <p>
                Every recipe we share today has been meticulously preserved and passed down through three generations. 
                We don&apos;t just sell sauces and pickles; we share a part of our heritage with you.
              </p>
              <Link href="/about" className="btn btn-primary">
                Explore Our Heritage <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us (About Us / Values) */}
      <section className={`section ${styles.whySection}`}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Why Maa G&apos;s?</span>
            <h2>Purely Homemade, No Compromises</h2>
            <p>We pride ourselves on maintaining the highest standards of quality and authenticity.</p>
          </motion.div>

          <div className={styles.whyGrid}>
            <motion.div 
              className={styles.whyCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className={styles.whyIcon}><ChefHat /></div>
              <h3>100% Homemade</h3>
              <p>No factories, no industrial machines. Every batch is cooked by hand in a real kitchen.</p>
            </motion.div>

            <motion.div 
              className={styles.whyCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className={styles.whyIcon}><ShieldCheck /></div>
              <h3>No Preservatives</h3>
              <p>We use natural preservation methods—oil, salt, and vinegar—just like our ancestors did.</p>
            </motion.div>

            <motion.div 
              className={styles.whyCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className={styles.whyIcon}><Leaf /></div>
              <h3>Organic Ingredients</h3>
              <p>Sourced directly from local farmers to ensure the freshest produce for our recipes.</p>
            </motion.div>

            <motion.div 
              className={styles.whyCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className={styles.whyIcon}><Sun /></div>
              <h3>Traditional Curing</h3>
              <p>Our pickles are cured naturally under the sun, allowing flavors to develop patiently.</p>
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

      {/* Traditional Process */}
      <ProcessSection />

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

      {/* Video Shorts Section */}
      <VideoSection />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
