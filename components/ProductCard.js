'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      slug: product.slug,
      weight: product.weight,
    });
  };

  const spiceDots = Array.from({ length: 5 }, (_, i) => i < product.spice_level);

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/product/${product.slug}`} className={styles.cardLink}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          {product.image_url ? (
            <div className={styles.imageContainer}>
              <Image 
                src={product.image_url} 
                alt={product.name} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className={styles.productImage}
              />
            </div>
          ) : (
            <div className={styles.imagePlaceholder}>
              <span className={styles.placeholderEmoji}>
                {product.category === 'Sauces' ? '🌶️' :
                 product.category === 'Chutneys' ? '🥬' :
                 product.category === 'Pickles' ? '🥒' : '✨'}
              </span>
            </div>
          )}

          {/* Badges */}
          {product.is_bestseller && (
            <span className={styles.badgeBestseller}>Bestseller</span>
          )}
          {product.compare_price && (
            <span className={styles.badgeSale}>
              {Math.round(((product.compare_price - product.price) / product.compare_price) * 100)}% OFF
            </span>
          )}

          {/* Hover Add to Cart */}
          <button
            className={styles.quickAdd}
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>

        {/* Info */}
        <div className={styles.info}>
          <span className={styles.category}>{product.category}</span>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.desc}>{product.short_description}</p>

          <div className={styles.meta}>
            {/* Spice Level */}
            <div className={styles.spiceDots}>
              {spiceDots.map((active, i) => (
                <span key={i} className={`${styles.spiceDot} ${active ? styles.active : ''}`} />
              ))}
            </div>

            {/* Price */}
            <div className={styles.price}>
              <span className={styles.currentPrice}>Rs. {product.price}</span>
              {product.compare_price && (
                <span className={styles.comparePrice}>Rs. {product.compare_price}</span>
              )}
            </div>
          </div>

          <div className={styles.weight}>{product.weight}</div>
        </div>
      </Link>
    </motion.div>
  );
}
