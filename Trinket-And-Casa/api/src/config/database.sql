-- CREATE DATABASE IF NOT EXISTS trinketandcasa;

-- DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_no VARCHAR(20) NOT NULL,
    
    password TEXT,

    is_verified BOOLEAN DEFAULT false,

    UNIQUE(email)
);

-- ALTER TABLE users DROP COLUMN role;
ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'User';

-- DROP TABLE IF EXISTS otps;
CREATE TABLE IF NOT EXISTS otps (
    email VARCHAR(255) NOT NULL,
    otp VARCHAR(8) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(email)
);

-- DROP TABLE IF EXISTS media_items;
-- CREATE TABLE IF NOT EXISTS media_items (
--     media_item_id SERIAL PRIMARY KEY,
--     media_type VARCHAR(255) NOT NULL,
--     item_link TEXT,
--     alt_tag VARCHAR(255)
-- );

-- DROP TABLE IF EXISTS categories;
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    slug text UNIQUE NOT NULL,

    image TEXT NOT NULL,
    alt_tag TEXT
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    sku_id TEXT,

    name VARCHAR(255) NOT NULL,
    description TEXT,

    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,

    price DECIMAL(10, 2) DEFAULT 0.00,
    compare_at_price DECIMAL(10, 2) DEFAULT 0.00,

    available_quantity INTEGER DEFAULT 0,

    meta_title TEXT,
    meta_description TEXT,

    status INT DEFAULT 1, -- 1 Public, 2 Private

    tags TEXT,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE products
ADD COLUMN IF NOT EXISTS slug TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS product_slug_unique_idx
ON products(slug);

-- Product options (Color, Size, etc.)
CREATE TABLE IF NOT EXISTS product_options (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Option values (Red, Blue, Small, Large, etc.)
CREATE TABLE IF NOT EXISTS product_option_values (
    id SERIAL PRIMARY KEY,
    option_id INTEGER REFERENCES product_options(id) ON DELETE CASCADE,
    value VARCHAR(100) NOT NULL,
    position INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Product variants
CREATE TABLE IF NOT EXISTS product_variants (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    compare_at_price DECIMAL(10, 2),
    quantity INTEGER DEFAULT 0,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_variant_images (
    product_variant_id INTEGER REFERENCES product_variants(id) ON DELETE CASCADE,
    image TEXT,
    alt_tag TEXT
);

ALTER TABLE product_variant_images ADD COLUMN IF NOT EXISTS position INTEGER DEFAULT 0;

-- Variant option values (junction table)
CREATE TABLE IF NOT EXISTS variant_option_values (
    id SERIAL PRIMARY KEY,
    variant_id INTEGER REFERENCES product_variants(id) ON DELETE CASCADE,
    option_value_id INTEGER REFERENCES product_option_values(id) ON DELETE CASCADE,
    UNIQUE(variant_id, option_value_id)
);

-- Product Images
-- DROP TABLE IF EXISTS product_images;
CREATE TABLE IF NOT EXISTS product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  image TEXT,
  alt_tag TEXT 
);

ALTER TABLE product_images ADD COLUMN IF NOT EXISTS position INTEGER DEFAULT 0;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_product_options_product_id ON product_options(product_id);
CREATE INDEX IF NOT EXISTS idx_product_option_values_option_id ON product_option_values(option_id);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_variant_option_values_variant_id ON variant_option_values(variant_id);


-- CREATE TABLE IF NOT EXISTS shipping_details (
--     user_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
--     shipping_details TEXT
-- );

-- ALTER TABLE shipping_details DROP COLUMN IF EXISTS created_at;
-- ALTER TABLE shipping_details ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- CREATE TABLE IF NOT EXISTS orders (
--     id SERIAL PRIMARY KEY,
--     order_id TEXT,



--     user_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
-- )

CREATE TABLE IF NOT EXISTS discount (
    id SERIAL PRIMARY KEY,

    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,

    type VARCHAR(20) NOT NULL, -- 'percentage', 'fixed_amount'
    value DECIMAL(10, 2), -- percentage (0-100) or fixed amount
    status VARCHAR(20) DEFAULT 'active', -- 'active' 'disabled'

    starts_at TIMESTAMP,
    ends_at TIMESTAMP
);

ALTER TABLE discount ADD COLUMN IF NOT EXISTS min_amount_to_select DECIMAL(10, 2) DEFAULT 0.00;
ALTER TABLE discount ADD COLUMN IF NOT EXISTS condition_type VARCHAR(50); -- 'product', 'categories',;
ALTER TABLE discount ADD COLUMN IF NOT EXISTS target_ids TEXT;

CREATE TABLE IF NOT EXISTS sub_categories (
    id SERIAL PRIMARY KEY,

    category_id BIGINT REFERENCES categories(id) ON DELETE CASCADE,

    name text NOT NULL,
    slug text UNIQUE NOT NULL,

    image TEXT NOT NULL,
    alt_tag TEXT
);

ALTER TABLE products ADD COLUMN IF NOT EXISTS sub_category_id BIGINT REFERENCES sub_categories(id) ON DELETE SET NULL;

ALTER TABLE discount
  ALTER COLUMN ends_at SET DATA TYPE timestamptz;
ALTER TABLE discount
  ALTER COLUMN starts_at SET DATA TYPE timestamptz;


CREATE TABLE IF NOT EXISTS addresses (
  address_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  name VARCHAR(150),
  phone VARCHAR(20),
  email VARCHAR(120),
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city VARCHAR(120),
  state VARCHAR(120),
  pincode VARCHAR(10),
  landmark TEXT,
  address_type VARCHAR(20) DEFAULT 'HOME',  -- HOME | WORK
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  order_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  
  order_number VARCHAR(30) UNIQUE NOT NULL, -- e.g. ORD20250117001

  subtotal NUMERIC(10,2) NOT NULL,
  discount NUMERIC(10,2) DEFAULT 0,
  shipping_charge NUMERIC(10,2) DEFAULT 0,
  total_amount NUMERIC(10,2) NOT NULL,
  
  coupon_code VARCHAR(50),
  
  order_status VARCHAR(40) DEFAULT 'PENDING', 
  -- PENDING, CONFIRMED, PACKED, SHIPPED, DELIVERED, CANCELLED, RETURNED, RETURN INITIATED

  payment_status VARCHAR(40) DEFAULT 'PENDING', 
  -- PENDING, PAID, FAILED, REFUNDED

  shipping_address_id INT REFERENCES addresses(address_id),
  billing_address_id INT REFERENCES addresses(address_id),

  payment_method VARCHAR(20), -- COD, ONLINE
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE orders ADD COLUMN IF NOT EXISTS stock_decreased BOOLEAN DEFAULT false;

CREATE TABLE IF NOT EXISTS order_items (
  order_item_id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
  product_id INT REFERENCES products(id),
  variant_id INT REFERENCES product_variants(id),
  quantity INT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL
);

ALTER TABLE order_items DROP COLUMN IF EXISTS variant_id;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS variant_info JSONB;

ALTER TABLE order_items DROP COLUMN IF EXISTS product_id;
ALTER TABLE order_items ADD COLUMN IF NOT EXISTS product_info JSONB;

CREATE TABLE IF NOT EXISTS payments (
  payment_id SERIAL PRIMARY KEY,
  order_id INT REFERENCES orders(order_id),
  provider VARCHAR(50),      -- Razorpay, Paytm, Stripe
  provider_order_id TEXT,
  provider_payment_id TEXT,
  amount NUMERIC(10,2),
  currency VARCHAR(10) DEFAULT 'INR',
  status VARCHAR(20),        -- PENDING, PAID, FAILED, REFUNDED
  response JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,

  user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
  stars INT DEFAULT 1,
  message TEXT,

  status INT DEFAULT 1, --1 Mean Not Approved, 2, Approved

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE reviews ADD COLUMN IF NOT EXISTS product_id BIGINT REFERENCES products(id) ON DELETE CASCADE;

ALTER TABLE order_items ADD COLUMN IF NOT EXISTS status VARCHAR(40) DEFAULT 'PENDING';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE order_items ADD COLUMN IF NOT EXISTS stock_decreased BOOLEAN DEFAULT false;

ALTER TABLE orders ADD COLUMN IF NOT EXISTS waybill TEXT;
CREATE INDEX IF NOT EXISTS idx_webhook_orders ON orders(waybill);

ALTER TABLE order_items ADD COLUMN IF NOT EXISTS waybill TEXT;
CREATE INDEX IF NOT EXISTS idx_webhook_order_items ON order_items(waybill);


CREATE TABLE IF NOT EXISTS webhook_data (
  id SERIAL PRIMARY KEY,
  waybill TEXT,
  payload JSONB
);

CREATE INDEX IF NOT EXISTS idx_webhook_data_waybill ON webhook_data(waybill);
ALTER TABLE webhook_data ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;


CREATE TABLE IF NOT EXISTS recipient (
  id SERIAL PRIMARY KEY,
  tag_name VARCHAR(255) NOT NULL,
  image TEXT,
  alt_tag VARCHAR(100)
);

ALTER TABLE recipient ADD COLUMN IF NOT EXISTS status INT DEFAULT 1; -- 1 Public, 2 Private.

CREATE TABLE IF NOT EXISTS order_returns (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(order_id),
  waybill VARCHAR(50),
  reason TEXT,
  type VARCHAR(20), -- Return / Replace
  created_at TIMESTAMP DEFAULT NOW()
);

-- -- Main discounts table
-- CREATE TABLE IF NOT EXISTS discounts (
--     id SERIAL PRIMARY KEY,
--     code VARCHAR(50) UNIQUE NOT NULL,
--     title VARCHAR(255) NOT NULL,
--     description TEXT,
--     type VARCHAR(20) NOT NULL, -- 'percentage', 'fixed_amount', 'buy_x_get_y', 'free_shipping'
--     value DECIMAL(10, 2), -- percentage (0-100) or fixed amount
--     status VARCHAR(20) DEFAULT 'active', -- 'active', 'scheduled', 'expired', 'disabled'
    
--     -- Usage limits
--     usage_limit INTEGER, -- null = unlimited
--     usage_count INTEGER DEFAULT 0,
--     per_customer_limit INTEGER, -- null = unlimited per customer
--     minimum_purchase_amount DECIMAL(10, 2),
    
--     -- Date constraints
--     starts_at TIMESTAMP,
--     ends_at TIMESTAMP,
    
--     -- Combinations
--     can_combine_with_other_discounts BOOLEAN DEFAULT false,
    
--     created_at TIMESTAMP DEFAULT NOW(),
--     updated_at TIMESTAMP DEFAULT NOW()
-- );

-- -- Discount conditions (what products/collections/customers qualify)
-- CREATE TABLE IF NOT EXISTS discount_conditions (
--     id SERIAL PRIMARY KEY,
--     discount_id INTEGER REFERENCES discounts(id) ON DELETE CASCADE,
--     condition_type VARCHAR(50) NOT NULL, -- 'product', 'collection', 'customer_segment', 'customer_tag'
--     operator VARCHAR(20) NOT NULL, -- 'includes', 'excludes'
--     target_ids TEXT[], -- array of product/collection/customer IDs
--     created_at TIMESTAMP DEFAULT NOW()
-- );

-- -- Buy X Get Y specific rules
-- CREATE TABLE IF NOT EXISTS bxgy_rules (
--     id SERIAL PRIMARY KEY,
--     discount_id INTEGER REFERENCES discounts(id) ON DELETE CASCADE,
--     buy_quantity INTEGER NOT NULL,
--     buy_product_ids TEXT[],
--     get_quantity INTEGER NOT NULL,
--     get_product_ids TEXT[],
--     discount_value DECIMAL(10, 2), -- percentage off the "get" items
--     created_at TIMESTAMP DEFAULT NOW()
-- );

-- -- Track discount usage per customer
-- CREATE TABLE IF NOT EXISTS discount_usage (
--     id SERIAL PRIMARY KEY,
--     discount_id INTEGER REFERENCES discounts(id) ON DELETE CASCADE,
--     customer_id INTEGER NOT NULL,
--     order_id INTEGER NOT NULL,
--     discount_amount DECIMAL(10, 2) NOT NULL,
--     used_at TIMESTAMP DEFAULT NOW()
-- );

-- -- Indexes for performance
-- CREATE INDEX IF NOT EXISTS idx_discounts_code ON discounts(code);
-- CREATE INDEX IF NOT EXISTS idx_discounts_status ON discounts(status);
-- CREATE INDEX IF NOT EXISTS idx_discount_usage_customer ON discount_usage(customer_id, discount_id);
