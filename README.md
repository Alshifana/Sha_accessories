# Sha-Accessories — E-commerce Storefront

A premium, responsive storefront for handcrafted photo frames and anti-tarnish
women's jewelry, built with Next.js 15 (App Router), TypeScript, Tailwind CSS,
Framer Motion and Lucide icons.

This is an **original design** inspired by common patterns in modern luxury
e-commerce (large editorial hero imagery, generous whitespace, gold/charcoal
palette, hover-swap product cards) — no assets, copy, or branding were copied
from any reference site.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase + Sanity values
npm run dev
```

Then open http://localhost:3000. Requires Node 18.18+.

## Supabase (auth, orders, addresses, wishlist/cart schema)

1. Create a project at supabase.com, then in **Project Settings → API**
   copy the URL and anon key into `.env.local`.
2. Open the **SQL Editor** in your Supabase dashboard and run the contents
   of `supabase/schema.sql`. This creates `profiles`, `addresses`, `orders`,
   `order_items`, `wishlist_items`, `cart_items`, and `coupons`, all with
   row-level security so users can only read/write their own data.
3. That's it — auth is fully wired:
   - `/register` and `/login` call real `supabase.auth.signUp` /
     `signInWithPassword` (see `components/AuthForm.tsx`).
   - `middleware.ts` refreshes the session on every request and redirects
     signed-out users away from `/profile`.
   - `/profile` is a Server Component that loads the real user, their
     profile, saved addresses, and order history.
   - `/checkout` writes a real `orders` + `order_items` row for signed-in
     users on "Place Order" and also lets guests finish the flow locally
     without logging in.
   - A Postgres trigger (`handle_new_user`) auto-creates a `profiles` row
     whenever someone signs up.

**Not yet wired**: payment provider checkout and admin operations are still
follow-ups. Cart and Wishlist now sync to Supabase for signed-in users while
keeping `localStorage` as the guest fallback, so users can move between
devices without losing their bag or favorites.

## Sanity (product/category CMS)

The Studio is embedded right in this app at **`/studio`** — no separate
project needed.

1. Create a project at sanity.io/manage (or run `npx sanity@latest init`
   from this folder and choose "use existing config" when it finds
   `sanity.config.ts`).
2. Put the project ID and dataset name in `.env.local`
   (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`).
3. Run `npm run dev` and visit `/studio` to log in and start adding
   **Products**, **Categories**, **Reviews**, **Testimonials**, and
   **Banners** — schemas are in `sanity/schemaTypes/`.
4. The storefront now reads live categories and products from
  `sanity/lib/queries.ts` (`getAllProducts`, `getProductBySlug`,
  `getProductsByCategory`, `getAllCategories`, `getTestimonials`,
  `getActiveBanner`). Uploaded content in `/studio` should show up on the
  homepage, shop, category pages, product pages, and sitemap after a
  normal refresh.

## What's included (fully working)

- **All 12 customer-facing pages**: Home, Shop, Category, Product Details,
  About, Contact, Wishlist, Cart, Checkout, Order Success, Login/Register,
  Profile.
- **Cart & Wishlist**: real state via React Context, persisted to
  `localStorage` and synced to Supabase for signed-in users, with a slide-in
  cart drawer, quantity controls, and coupon codes (try `WELCOME15` or
  `AURELIE10` on the Cart page).
- **Shop features**: autocomplete search in the navbar, category filters,
  price slider, rating filter, sort, and a mobile filter drawer.
- **Product page**: image gallery with hover-zoom, color variant selector,
  quantity selector, delivery pincode checker (simulated), tabs for
  description/specs/reviews, frequently-bought-together bundle, related
  products, and recently-viewed tracking.
- **Checkout**: multi-step flow (address → shipping → payment → review) that
  writes orders to Supabase and redirects to Order Success.
- **Design system**: gold/beige/charcoal/ivory palette, Fraunces (display) +
  Inter (body) type pairing, a signature "gold thread" divider motif that
  nods to hand-stitched craftsmanship, scroll-triggered fade-ins, hover-lift
  cards, loading skeletons, and reduced-motion support.
- **SEO**: per-page metadata, dynamic OG tags on products, `sitemap.xml`,
  `robots.txt`, semantic HTML.

## What's mocked / not wired to a real backend

- **Product catalog** — live products and categories now come from Sanity;
  `lib/data.ts` remains only for a few local helpers and fallback mock
  content.
- **Payment gateway** — checkout currently stores the order in Supabase,
  but card/UPI/hosted payment capture is still not integrated.
- **Admin dashboard** (inventory, order status changes, customers,
  analytics) — not built yet. Sanity Studio at `/studio` covers product
  content management; order/customer management would still want a protected
  `/admin` section backed by Supabase.

## Suggested next steps

1. Point the storefront pages at `sanity/lib/queries.ts` instead of
   `lib/data.ts`.
2. Sync cart/wishlist to Supabase on login (merge local + remote, then
   read/write remote from then on).
3. Add a payment provider (Razorpay/Stripe) behind checkout's "Place Order".
4. Build `/admin` as a protected route group backed by Supabase (orders,
   customers, coupon management) alongside Sanity Studio (product content).

## Project structure

```
app/                 Route segments (App Router)
app/(site)/          Storefront pages (share navbar/footer/cart layout)
app/studio/          Embedded Sanity Studio (no storefront chrome)
components/          Reusable UI + feature components
components/ui/       Small primitives (Button, Badge, Skeleton)
context/             Cart & Wishlist providers (localStorage-backed)
lib/                 Types, mock data, utils
lib/supabase/        Browser/server Supabase clients + generated types
sanity/              Studio config, schemas, client, GROQ queries
supabase/schema.sql  Full Postgres schema + RLS policies
```
