-- Guest checkout keeps orders under Supabase anonymous users, so existing
-- owner-based RLS policies continue to apply without changes.
alter table public.orders
  add column if not exists guest_email text,
  add column if not exists shipping_address jsonb;
