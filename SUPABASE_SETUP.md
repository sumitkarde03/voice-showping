# Supabase Setup Guide

This guide will help you set up your Supabase database for the shopping app.

## Step 1: Run the Database Migration

1. Go to your Supabase dashboard: https://kbynbctzijowswrgmeix.supabase.co
2. Navigate to **SQL Editor** in the left sidebar
3. Open the file `supabase/migrations/20240101000000_initial_schema.sql`
4. Copy the entire SQL content
5. Paste it into the SQL Editor in Supabase
6. Click **Run** to execute the migration

This will create:
- `products` table - for storing all products
- `cart_items` table - for storing user cart items
- Row Level Security (RLS) policies
- Indexes for better performance

## Step 2: Seed the Database with Products

After running the migration, seed your database with the existing product data:

```bash
npm run seed
```

Or if you're using bun:

```bash
bun run seed
```

This will populate the `products` table with all the products from `src/data/products.ts`.

## Step 3: Verify the Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see the `products` table with all your products
3. The `cart_items` table should be empty (it will be populated when users add items)

## Database Schema

### Products Table
- `id` (UUID) - Primary key
- `name` (TEXT) - Product name
- `brand` (TEXT) - Brand name
- `price` (DECIMAL) - Product price
- `category` (TEXT) - Product category
- `size` (TEXT) - Product size
- `tags` (TEXT[]) - Array of tags
- `image` (TEXT) - Image URL
- `substitutes` (TEXT[]) - Array of substitute products
- `seasonal` (BOOLEAN) - Whether product is seasonal
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

### Cart Items Table
- `id` (UUID) - Primary key
- `user_id` (UUID) - Foreign key to auth.users
- `product_id` (UUID) - Foreign key to products
- `quantity` (INTEGER) - Quantity in cart
- `created_at` (TIMESTAMP) - Creation timestamp
- `updated_at` (TIMESTAMP) - Last update timestamp

## Using the Database in Your Code

Import the helper functions from `src/lib/supabase-helpers.ts`:

```typescript
import { getProducts, addToCart, getCartItems } from '@/lib/supabase-helpers';

// Get all products
const products = await getProducts();

// Get products by category
const dairyProducts = await getProducts({ category: 'dairy' });

// Add item to cart
await addToCart(productId, quantity);

// Get user's cart items
const cartItems = await getCartItems();
```

## Row Level Security

The database uses Row Level Security (RLS) to ensure:
- All users can view products
- Users can only view/modify their own cart items
- Unauthenticated users cannot add items to cart

## Troubleshooting

### Migration fails
- Make sure you're running the SQL in the Supabase SQL Editor
- Check that you have the correct permissions in your Supabase project

### Seed script fails
- Verify your `.env` file has the correct Supabase credentials
- Make sure the migration has been run first
- Check that the `products` table exists

### Can't add to cart
- Ensure the user is authenticated (Supabase Auth)
- Check that RLS policies are enabled
- Verify the product_id exists in the products table


