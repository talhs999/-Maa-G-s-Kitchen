'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { sampleProducts, categories } from '@/lib/sampleData';
import styles from './page.module.css';

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let products = [...sampleProducts];

    if (selectedCategory !== 'all') {
      products = products.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'spice':
        products.sort((a, b) => b.spice_level - a.spice_level);
        break;
      default:
        break;
    }

    return products;
  }, [selectedCategory, sortBy]);

  return (
    <div className={styles.shopPage}>
      {/* Hero Banner */}
      <section className={styles.shopHero}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Our Products</span>
            <h1>Shop All Products</h1>
            <p>Discover our complete range of authentic, homemade goodness.</p>
          </motion.div>
        </div>
      </section>

      <div className={`container ${styles.shopContent}`}>
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <button
              className={styles.filterToggle}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>
            <span className={styles.resultCount}>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>

          <select
            className={styles.sortSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            id="sort-select"
          >
            <option value="default">Sort by: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
            <option value="spice">Spice Level: High to Low</option>
          </select>
        </div>

        <div className={styles.shopGrid}>
          {/* Sidebar Filters */}
          <aside className={`${styles.sidebar} ${filterOpen ? styles.open : ''}`}>
            <div className={styles.sidebarHeader}>
              <h3>Filters</h3>
              <button
                className={styles.closeFilter}
                onClick={() => setFilterOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Categories */}
            <div className={styles.filterGroup}>
              <h4>Categories</h4>
              <button
                className={`${styles.catBtn} ${selectedCategory === 'all' ? styles.active : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All Products
              </button>
              {Array.from(new Set(sampleProducts.map(p => p.category))).map((catName) => (
                <button
                  key={catName}
                  className={`${styles.catBtn} ${selectedCategory === catName ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(catName)}
                >
                  {catName}
                </button>
              ))}
            </div>

            {/* Spice Level Filter */}
            <div className={styles.filterGroup}>
              <h4>Spice Level</h4>
              <div className={styles.spiceFilter}>
                {[1, 2, 3, 4, 5].map((level) => (
                  <div key={level} className={styles.spiceLevel}>
                    <span>{level}🌶️</span>
                    <span className={styles.spiceLabel}>
                      {level === 1 ? 'Mild' : level === 2 ? 'Medium' : level === 3 ? 'Hot' : level === 4 ? 'Very Hot' : 'Extreme'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className={styles.productsArea}>
            {filteredProducts.length === 0 ? (
              <div className={styles.noResults}>
                <span className={styles.noResultsEmoji}>🔍</span>
                <h3>No products found</h3>
                <p>Try adjusting your filters.</p>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={styles.productsGrid}>
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
