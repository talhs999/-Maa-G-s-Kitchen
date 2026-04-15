-- Create Products Table
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  price DECIMAL NOT NULL,
  compare_price DECIMAL,
  category TEXT,
  image_url TEXT,
  images JSONB,
  spice_level INTEGER DEFAULT 1,
  is_featured BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  weight TEXT,
  ingredients TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: In a full database setup, we would also create tables for reviews, orders, and contacts.
-- For this step we focus on products as requested.
