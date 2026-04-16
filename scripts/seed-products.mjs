// Script to seed Maa G's Kitchen products into Supabase
// Run with: node scripts/seed-products.mjs

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local manually (Node doesn't load it automatically)
const envPath = resolve(__dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const [key, ...rest] = line.split('=');
  if (key && rest.length) env[key.trim()] = rest.join('=').trim();
}

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const SUPABASE_KEY =
  env['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY'] ||
  env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
console.log('✅ Connected to Supabase:', SUPABASE_URL);

// ─── PRODUCT DATA ────────────────────────────────────────────────────────────
const products = [
  {
    name: 'Red Chilli Sauce',
    slug: 'red-chilli-sauce',
    description:
      'Handcrafted Red Chilli Sauce. No added sugars, artificial flavors, thickeners, or stabilizers. This fiery condiment brings the perfect kick to any meal. Every bottle is crafted in small batches to ensure maximum freshness and bold, authentic flavor.',
    short_description: 'Our signature fiery hot sauce with hand-picked red chilies and secret spices.',
    price: 935,
    compare_price: null,
    category: 'Sauces',
    image_url: '/images/products/red-chilli.png',
    images: ['/images/products/red-chilli.png'],
    spice_level: 4,
    is_featured: true,
    is_bestseller: true,
    inventory_count: 100,
    weight: '250ml',
    ingredients: 'Red Chilies, Garlic, Vinegar, Salt, Spices',
  },
  {
    name: 'Green Chilli Sauce',
    slug: 'green-chilli-sauce',
    description:
      'A boldly refreshing fusion of crushed green chilies and select herbs. No added sugars, artificial flavors, thickeners, or stabilizers. It delivers a savory, spicy punch that\'s both versatile and addictive.',
    short_description: 'Fresh and vibrant green chilli sauce—perfect for dipping and cooking.',
    price: 850,
    compare_price: null,
    category: 'Sauces',
    image_url: '/images/products/green-chilli.png',
    images: ['/images/products/green-chilli.png'],
    spice_level: 3,
    is_featured: true,
    is_bestseller: false,
    inventory_count: 100,
    weight: '250ml',
    ingredients: 'Green Chilies, Garlic, Vinegar, Salt, Herbs',
  },
  {
    name: 'Garlic Mayo Sauce',
    slug: 'garlic-mayo-sauce',
    description:
      'Rich, creamy, and loaded with robust garlic flavor. Our hand-crafted Garlic Mayo is preservative free with no artificial thickeners. The perfect dip for fries, burgers, or a delicious sandwich spread.',
    short_description: 'Creamy artisanal mayo with a robust garlic kick.',
    price: 935,
    compare_price: null,
    category: 'Sauces',
    image_url: '/images/products/garlic-mayo.png',
    images: ['/images/products/garlic-mayo.png'],
    spice_level: 1,
    is_featured: true,
    is_bestseller: true,
    inventory_count: 100,
    weight: '250ml',
    ingredients: 'Oil, Eggs, Garlic, Vinegar, Mustard, Salt',
  },
  {
    name: 'Imli Aloo Bahara Sauce',
    slug: 'imli-aloo-bahara-sauce',
    description:
      'Sweet, tangy, and irresistibly delicious. Made with premium tamarind pulp and dried plums. No added sugars or artificial thickeners. This sauce strikes the perfect balance between sweet and sour.',
    short_description: 'Sweet & tangy tamarind and plum sauce—the soul of every chaat plate.',
    price: 800,
    compare_price: 950,
    category: 'Sauces',
    image_url: '/images/products/imli-aloo-bahara.png',
    images: ['/images/products/imli-aloo-bahara.png'],
    spice_level: 1,
    is_featured: true,
    is_bestseller: true,
    inventory_count: 100,
    weight: '250ml',
    ingredients: 'Tamarind Pulp, Dried Plums, Traditional Spices',
  },
  {
    name: 'Habanero Sauce',
    slug: 'habanero-sauce',
    description:
      'Small Batch. Made with fresh habanero peppers, vinegar, garlic, and special spices. Caution: Very Hot. Preservative Free. An absolute essential for heat seekers looking for intense flavor.',
    short_description: 'Intensely hot, small-batch artisanal Habanero sauce.',
    price: 1100,
    compare_price: null,
    category: 'Sauces',
    image_url: '/images/products/habanero.png',
    images: ['/images/products/habanero.png'],
    spice_level: 5,
    is_featured: true,
    is_bestseller: false,
    inventory_count: 50,
    weight: '250ml',
    ingredients: 'Habanero Peppers, Garlic, Vinegar, Special Spices',
  },
  {
    name: 'Traditional Mango Pickle',
    slug: 'mango-pickle',
    description:
      'Authentic, sun-dried mango pickle cured for months to develop a deeply sour, spicy profile. Made just like Maa used to make it.',
    short_description: 'Authentic sun-dried mango pickle with traditional spices.',
    price: 750,
    compare_price: null,
    category: 'Pickles',
    image_url: 'https://images.unsplash.com/photo-1589301773099-0a6d0be433eb?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1589301773099-0a6d0be433eb?q=80&w=800&auto=format&fit=crop'],
    spice_level: 4,
    is_featured: true,
    is_bestseller: true,
    inventory_count: 80,
    weight: '400g',
    ingredients: 'Raw Mango, Mustard Oil, Fenugreek, Fennel, Red Chili',
  },
  {
    name: 'Spicy Mixed Pickle',
    slug: 'mixed-pickle',
    description:
      'A medley of fresh seasonal vegetables including carrots, lemon, green chilies, and mangoes, marinated in our signature spice blend.',
    short_description: 'A punchy medley of seasonal vegetables and spices.',
    price: 800,
    compare_price: null,
    category: 'Pickles',
    image_url: 'https://images.unsplash.com/photo-1628294895950-9ec87b4695e1?q=80&w=800&auto=format&fit=crop',
    images: ['https://images.unsplash.com/photo-1628294895950-9ec87b4695e1?q=80&w=800&auto=format&fit=crop'],
    spice_level: 3,
    is_featured: false,
    is_bestseller: false,
    inventory_count: 80,
    weight: '400g',
    ingredients: 'Carrot, Lemon, Mango, Chili, Spices, Mustard Oil',
  },
];

// ─── CATEGORIES DATA ──────────────────────────────────────────────────────────
const categoriesData = [
  { name: 'Red Chilli Sauce',  slug: 'red-chilli-sauce',       description: 'Handcrafted small-batch fiery sauce',   image_url: '/images/products/red-chilli.png',       color: '#C0392B' },
  { name: 'Green Chilli Sauce',slug: 'green-chilli-sauce',     description: 'Fresh & herbaceous green chilli sauce',  image_url: '/images/products/green-chilli.png',     color: '#4CAF50' },
  { name: 'Garlic Mayo',       slug: 'garlic-mayo-sauce',      description: 'Rich, creamy artisanal mayo',            image_url: '/images/products/garlic-mayo.png',      color: '#B8860B' },
  { name: 'Imli Aloo Bahara',  slug: 'imli-aloo-bahara-sauce', description: 'Sweet & tangy tamarind sauce',           image_url: '/images/products/imli-aloo-bahara.png', color: '#7B3F00' },
  { name: 'Habanero Sauce',    slug: 'habanero-sauce',         description: 'Small batch — serious heat',             image_url: '/images/products/habanero.png',         color: '#FF5722' },
  { name: 'Authentic Pickles', slug: 'pickles',                description: 'Sun-cured traditional pickles',          image_url: 'https://images.unsplash.com/photo-1589301773099-0a6d0be433eb?q=80&w=800&auto=format&fit=crop', color: '#E67E22' },
];

// ─── SEED FUNCTIONS ───────────────────────────────────────────────────────────
async function seedCategories() {
  console.log('\n📦 Seeding categories...');
  for (const cat of categoriesData) {
    const { error } = await supabase
      .from('categories')
      .upsert(cat, { onConflict: 'slug' });
    if (error) {
      console.error(`  ❌ Failed to upsert category "${cat.name}":`, error.message);
    } else {
      console.log(`  ✅ Category: ${cat.name}`);
    }
  }
}

async function seedProducts() {
  console.log('\n🛒 Seeding products...');
  for (const product of products) {
    const { error } = await supabase
      .from('products')
      .upsert(product, { onConflict: 'slug' });
    if (error) {
      console.error(`  ❌ Failed to upsert "${product.name}":`, error.message);
    } else {
      console.log(`  ✅ Product: ${product.name} — Rs. ${product.price}`);
    }
  }
}

async function verifyProducts() {
  console.log('\n🔍 Verifying products in Supabase...');
  const { data, error } = await supabase.from('products').select('name, price, category');
  if (error) {
    console.error('  ❌ Verification failed:', error.message);
  } else {
    console.log(`  Found ${data.length} product(s):`);
    data.forEach(p => console.log(`    • ${p.name} (${p.category}) — Rs. ${p.price}`));
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Starting Maa G\'s Kitchen seed script...');
  console.log('📍 Supabase URL:', SUPABASE_URL);

  await seedCategories();
  await seedProducts();
  await verifyProducts();

  console.log('\n✅ Done! All products uploaded to Supabase.\n');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
