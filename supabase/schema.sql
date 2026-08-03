-- Aurélie House — Supabase schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).
-- Product/category content lives in Sanity, not here — these tables cover
-- everything that's user- and order-specific.

-- ── Extensions ──────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── profiles ────────────────────────────────────────────────────────────
-- One row per auth.users, created automatically on signup (see trigger below).
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are editable by owner"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user is created.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── addresses ───────────────────────────────────────────────────────────
create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  full_name text not null,
  phone text not null,
  line1 text not null,
  city text not null,
  state text not null,
  pincode text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.addresses enable row level security;

create policy "Users manage their own addresses"
  on public.addresses for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── orders ──────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'shipped', 'delivered', 'cancelled')),
  subtotal numeric(10, 2) not null,
  shipping numeric(10, 2) not null default 0,
  discount numeric(10, 2) not null default 0,
  total numeric(10, 2) not null,
  coupon_code text,
  address_id uuid references public.addresses (id) on delete set null,
  payment_method text not null,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Users view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users create their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- ── order_items ─────────────────────────────────────────────────────────
-- product_id references the Sanity document _id, not a local FK.
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id text not null,
  product_name text not null,
  product_image text,
  variant_id text,
  quantity integer not null check (quantity > 0),
  price numeric(10, 2) not null
);

alter table public.order_items enable row level security;

create policy "Users view items on their own orders"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id and o.user_id = auth.uid()
    )
  );

create policy "Users insert items on their own orders"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id and o.user_id = auth.uid()
    )
  );

-- ── wishlist_items ──────────────────────────────────────────────────────
create table if not exists public.wishlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_id text not null,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

alter table public.wishlist_items enable row level security;

create policy "Users manage their own wishlist"
  on public.wishlist_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── cart_items ──────────────────────────────────────────────────────────
-- Only used for signed-in users; guests keep using localStorage and this
-- table gets synced on login (see lib/supabase/cart-sync.ts on the client).
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_id text not null,
  variant_id text,
  quantity integer not null check (quantity > 0),
  updated_at timestamptz not null default now(),
  unique (user_id, product_id, variant_id)
);

alter table public.cart_items enable row level security;

create policy "Users manage their own cart"
  on public.cart_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── coupons ─────────────────────────────────────────────────────────────
-- Simple table so coupon validation can move server-side later instead of
-- the hardcoded map currently in app/cart/page.tsx.
create table if not exists public.coupons (
  code text primary key,
  discount_percent numeric(4, 2) not null check (discount_percent > 0 and discount_percent <= 100),
  active boolean not null default true,
  expires_at timestamptz
);

alter table public.coupons enable row level security;

create policy "Coupons are publicly readable"
  on public.coupons for select
  using (true);

insert into public.coupons (code, discount_percent) values
  ('WELCOME15', 15),
  ('AURELIE10', 10)
on conflict (code) do nothing;
