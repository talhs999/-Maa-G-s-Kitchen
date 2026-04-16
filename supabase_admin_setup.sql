-- ============================================================
-- ADMIN DASHBOARD SUPABASE SCHEMA UPDATE
-- copy and paste this into the Supabase SQL editor to create all the 
-- missing tables required for the Admin Dashboard.
-- ============================================================

-- 1. Create Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value DECIMAL NOT NULL,
  min_purchase DECIMAL DEFAULT 0,
  usage_count INTEGER DEFAULT 0,
  max_usage INTEGER,
  status BOOLEAN DEFAULT true,
  expiry_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Create Shipping Regions Table
CREATE TABLE IF NOT EXISTS shipping_regions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  cost DECIMAL NOT NULL,
  estimated_days TEXT,
  status BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. Update Categories Table for "Header Categories" feature
-- Add a status, priority, and show_in_header column if they don't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='categories' AND column_name='status') THEN
        ALTER TABLE categories ADD COLUMN status BOOLEAN DEFAULT true;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='categories' AND column_name='show_in_header') THEN
        ALTER TABLE categories ADD COLUMN show_in_header BOOLEAN DEFAULT false;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='categories' AND column_name='sort_priority') THEN
        ALTER TABLE categories ADD COLUMN sort_priority INTEGER DEFAULT 0;
    END IF;
END $$;

-- 4. User Roles Mapping Table (Optional, fallback if raw_user_meta_data isn't used)
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('Customer', 'Admin', 'Super Admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  UNIQUE(user_id)
);

-- 5. Enable Row Level Security (RLS) on new tables
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- 6. Setup Public READ policies where needed
DROP POLICY IF EXISTS "Public can view active coupons" ON coupons;
CREATE POLICY "Public can view active coupons" ON coupons FOR SELECT USING (status = true);

DROP POLICY IF EXISTS "Public can view active shipping" ON shipping_regions;
CREATE POLICY "Public can view active shipping" ON shipping_regions FOR SELECT USING (status = true);

-- 7. Setup ADMIN Full Access Policies 
-- (Assuming Admins can do anything; Supabase 'service_role' key bypasses RLS anyway for backend, 
-- but these explicitly open the dashboard tables for ease of setup during testing)
DROP POLICY IF EXISTS "Admin full access on coupons" ON coupons;
CREATE POLICY "Admin full access on coupons" ON coupons USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access on shipping" ON shipping_regions;
CREATE POLICY "Admin full access on shipping" ON shipping_regions USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin full access on user_roles" ON user_roles;
CREATE POLICY "Admin full access on user_roles" ON user_roles USING (true) WITH CHECK (true);

-- 8. Add status column to Orders if it isn't completely restricted yet
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='status') THEN
        ALTER TABLE orders ADD COLUMN status TEXT DEFAULT 'pending';
    END IF;
END $$;
