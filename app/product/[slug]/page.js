'use client';

import { useState, use } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Minus, Plus, Star, ChevronLeft, Truck, ShieldCheck, Clock } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import ProductCard from '@/components/ProductCard';
import { sampleProducts, sampleReviews } from '@/lib/sampleData';
import styles from './page.module.css';

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;
  const product = sampleProducts.find((p) => p.slug === slug);
  const images = product.images && product.images.length > 0 ? product.images : [product.image_url];
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { addItem } = useCart();

  const handleNextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h1>Product Not Found</h1>
          <p>The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/shop" className="btn btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const productReviews = sampleReviews.filter((r) => r.product_id === product.id);
  const relatedProducts = sampleProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const spiceDots = Array.from({ length: 5 }, (_, i) => i < product.spice_level);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: images[activeImage],
      slug: product.slug,
      weight: product.weight,
    }, quantity);
  };

  return (
    <div className={styles.productPage}>
      {/* Breadcrumb */}
      <div className={`container ${styles.breadcrumb}`}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/shop">Shop</Link>
        <span>/</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </div>

      {/* Product Detail */}
      <section className={`container ${styles.productDetail}`}>
        <motion.div
          className={styles.productGallery}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.mainImageWrapper}>
            <div className={styles.mainImage}>
               <Image 
                 src={images[activeImage]} 
                 alt={product.name} 
                 fill 
                 className={styles.realImg} 
                 priority
               />
               {product.is_bestseller && (
                 <span className={styles.bestseller}>🔥 Bestseller</span>
               )}
            </div>
            
            {images.length > 1 && (
              <>
                <button className={styles.galleryArrow} onClick={handlePrevImage} style={{ left: 10 }}>
                  <ChevronLeft size={24} />
                </button>
                <button className={styles.galleryArrow} onClick={handleNextImage} style={{ right: 10, transform: 'rotate(180deg)' }}>
                  <ChevronLeft size={24} />
                </button>
              </>
            )}
          </div>

          <div className={styles.thumbnailList}>
             {images.map((img, i) => (
               <div 
                 key={i} 
                 className={`${styles.thumbnail} ${activeImage === i ? styles.activeThumb : ''}`}
                 onClick={() => setActiveImage(i)}
               >
                 <Image src={img} alt={`Thumb ${i + 1}`} fill className={styles.realImg} />
               </div>
             ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.productInfo}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-yellow">{product.category}</span>
          <h1 className={styles.productName}>{product.name}</h1>

          {/* Rating */}
          <div className={styles.rating}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={18} fill="#FFC107" stroke="#FFC107" />
            ))}
            <span className={styles.ratingCount}>({productReviews.length} reviews)</span>
          </div>

          {/* Price */}
          <div className={styles.priceBlock}>
            <span className={styles.price}>Rs. {product.price}</span>
            {product.compare_price && (
              <>
                <span className={styles.comparePrice}>Rs. {product.compare_price}</span>
                <span className={styles.discount}>
                  {Math.round(((product.compare_price - product.price) / product.compare_price) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <p className={styles.shortDesc}>{product.short_description}</p>

          {/* Spice Level */}
          <div className={styles.spiceSection}>
            <span className={styles.spiceLabel}>Spice Level:</span>
            <div className="spice-dots">
              {spiceDots.map((active, i) => (
                <span key={i} className={`spice-dot ${active ? 'active' : ''}`} />
              ))}
            </div>
            <span className={styles.spiceText}>
              {product.spice_level <= 1 ? 'Mild' : product.spice_level <= 2 ? 'Medium' : product.spice_level <= 3 ? 'Hot' : 'Very Hot'}
            </span>
          </div>

          {/* Weight */}
          <div className={styles.weightInfo}>
            <span>Weight: <strong>{product.weight}</strong></span>
          </div>

          {/* Quantity & Add to Cart */}
          <div className={styles.addToCartBlock}>
            <div className={styles.qtySelector}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">
                <Minus size={16} />
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">
                <Plus size={16} />
              </button>
            </div>
            <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
              <ShoppingCart size={20} />
              Add to Cart — Rs. {product.price * quantity}
            </button>
          </div>

          {/* Benefits */}
          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <Truck size={18} />
              <span>Free shipping over Rs. 2,000</span>
            </div>
            <div className={styles.benefit}>
              <ShieldCheck size={18} />
              <span>100% Quality guarantee</span>
            </div>
            <div className={styles.benefit}>
              <Clock size={18} />
              <span>Delivered in 2-3 days</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tabs */}
      <section className={`container ${styles.tabSection}`}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'description' ? styles.active : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'ingredients' ? styles.active : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({productReviews.length})
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'description' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p>{product.description}</p>
            </motion.div>
          )}
          {activeTab === 'ingredients' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p>{product.ingredients}</p>
            </motion.div>
          )}
          {activeTab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className={styles.reviewsLayout}>
                <div className={styles.reviewsList}>
                  <h3>Customer Reviews</h3>
                  {productReviews.length === 0 ? (
                    <p>No reviews yet. Be the first to review this product!</p>
                  ) : (
                    productReviews.map((review) => (
                      <div key={review.id} className={styles.reviewItem}>
                        <div className={styles.reviewStars}>
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} size={14} fill={i < review.rating ? '#FFC107' : 'none'} stroke={i < review.rating ? '#FFC107' : '#555'} />
                          ))}
                        </div>
                        <p className={styles.reviewComment}>{review.comment}</p>
                        <span className={styles.reviewAuthor}>— {review.name}</span>
                      </div>
                    ))
                  )}
                </div>
                <div className={styles.reviewFormBlock}>
                  <h3>{submitSuccess ? 'Thank you!' : 'Write a Review'}</h3>
                  
                  {submitSuccess ? (
                    <div className={styles.successMessage}>
                      <p>Your review has been submitted for approval. ✨</p>
                      <button className="btn btn-outline btn-sm" onClick={() => setSubmitSuccess(false)}>Write another</button>
                    </div>
                  ) : (
                    <form className={styles.reviewForm} onSubmit={(e) => {
                      e.preventDefault();
                      if (rating === 0) return alert('Select a rating!');
                      setIsSubmitting(true);
                      setTimeout(() => {
                        setIsSubmitting(false);
                        setSubmitSuccess(true);
                        setReviewName('');
                        setReviewComment('');
                        setRating(0);
                      }, 1500);
                    }}>
                      <div className={styles.formGroup}>
                        <label>Your Rating</label>
                        <div className={styles.starSelect}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                              type="button" 
                              key={star} 
                              className={`${styles.starBtn} ${rating >= star ? styles.activeStar : ''}`}
                              onClick={() => setRating(star)}
                            >
                              <Star size={24} fill={rating >= star ? '#FFC107' : 'none'} stroke="#FFC107" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className={styles.formGroup}>
                        <input 
                          type="text" 
                          placeholder="Your Name" 
                          className="input" 
                          required 
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <textarea 
                          placeholder="Write your review here..." 
                          className={`input ${styles.textarea}`} 
                          required
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                        ></textarea>
                      </div>
                      <button 
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ width: '100%' }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className={`section ${styles.relatedSection}`}>
          <div className="container">
            <div className="section-header">
              <span className="section-label">You Might Also Like</span>
              <h2>Related Products</h2>
            </div>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
