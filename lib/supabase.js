import { createClient } from '@supabase/supabase-js';
import { sampleProducts, sampleReviews } from './sampleData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

export const supabase = (function() {
  if (!supabaseUrl || !supabaseKey) {
    if (typeof window !== 'undefined') {
      console.warn('⚠️ Supabase environment variables are missing! Ensure .env.local is set up and the dev server is restarted.');
      console.log('URL found:', !!supabaseUrl);
      console.log('Key found:', !!supabaseKey);
    }
    return null;
  }
  
  try {
    return createClient(supabaseUrl, supabaseKey);
  } catch (err) {
    console.error('❌ Failed to initialize Supabase client:', err);
    return null;
  }
})();

// ===== PRODUCT FUNCTIONS =====

export async function getProducts() {
  if (!supabase) return sampleProducts;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .order('created_at', { ascending: false });
  if (error) { console.error('Error fetching products:', error); return sampleProducts; }
  return data && data.length > 0 ? data : sampleProducts;
}

export async function getProductBySlug(slug) {
  if (!supabase) return sampleProducts.find(p => p.slug === slug) || null;
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) { 
    console.error('Error fetching product:', error); 
    return sampleProducts.find(p => p.slug === slug) || null; 
  }
  return data;
}

export async function getFeaturedProducts() {
  if (!supabase) return sampleProducts.filter(p => p.is_featured);
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('in_stock', true)
    .limit(8);
  if (error) { 
    console.error('Error fetching featured products:', error); 
    return sampleProducts.filter(p => p.is_featured);
  }
  return data && data.length > 0 ? data : sampleProducts.filter(p => p.is_featured);
}

export async function getProductsByCategory(category) {
  if (!supabase) return sampleProducts.filter(p => p.category === category);
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('in_stock', true)
    .order('created_at', { ascending: false });
  if (error) { 
    console.error('Error:', error); 
    return sampleProducts.filter(p => p.category === category); 
  }
  return data && data.length > 0 ? data : sampleProducts.filter(p => p.category === category);
}

// ===== REVIEW FUNCTIONS =====

export async function getProductReviews(productId) {
  if (!supabase) return sampleReviews.filter(r => r.product_id === productId);
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false });
  if (error) { 
    console.error('Error fetching reviews:', error); 
    return sampleReviews.filter(r => r.product_id === productId); 
  }
  return data && data.length > 0 ? data : sampleReviews.filter(r => r.product_id === productId);
}

export async function submitReview(review) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  const { data, error } = await supabase
    .from('reviews')
    .insert([review]);
  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

// ===== CONTACT FUNCTIONS =====

export async function submitContact(contactData) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  const { data, error } = await supabase
    .from('contacts')
    .insert([contactData]);
  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

// ===== ORDER FUNCTIONS =====

export async function submitOrder(order) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  const orderNumber = 'MGK-' + Date.now().toString(36).toUpperCase();
  const { data, error } = await supabase
    .from('orders')
    .insert([{ ...order, order_number: orderNumber }]);
  if (error) return { success: false, error: error.message };
  return { success: true, data, orderNumber };
}

// ===== NEWSLETTER =====

export async function subscribeNewsletter(email) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .insert([{ email }]);
  if (error) {
    if (error.code === '23505') return { success: false, error: 'Already subscribed!' };
    return { success: false, error: error.message };
  }
  return { success: true, data };
}
