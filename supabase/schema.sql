-- ============================================================
-- COD Restaurant/Cafe — Schema
-- Paste this into the Supabase SQL Editor and run it once.
-- ============================================================

-- ---------- Enum ----------
create type order_status as enum (
  'pending',
  'confirmed',
  'preparing',
  'out_for_delivery',
  'delivered',
  'cancelled'
);

-- ---------- Tables ----------

create table shops (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  address text,
  whatsapp_number text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table menu_categories (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  name text not null,
  display_order integer not null default 0
);

create table menu_items (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  category_id uuid references menu_categories(id) on delete set null,
  name text not null,
  description text,
  price numeric(10, 2) not null check (price >= 0),
  image_url text,
  is_available boolean not null default true,
  created_at timestamptz not null default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops(id) on delete cascade,
  customer_name text not null,
  customer_phone text not null,
  customer_address text not null,
  items jsonb not null,
  total_amount numeric(10, 2) not null check (total_amount >= 0),
  status order_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now()
);

-- ---------- Indexes ----------

create index menu_categories_shop_id_idx on menu_categories(shop_id);
create index menu_items_shop_id_idx on menu_items(shop_id);
create index menu_items_category_id_idx on menu_items(category_id);
create index orders_shop_id_idx on orders(shop_id);
create index orders_status_idx on orders(status);

-- ---------- Row Level Security ----------

alter table shops enable row level security;
alter table menu_categories enable row level security;
alter table menu_items enable row level security;
alter table orders enable row level security;

-- shops: public can read active shops, admins can do everything
create policy "public read active shops"
  on shops for select
  using (is_active = true);

create policy "admin full access shops"
  on shops for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- menu_categories: public read, admin full access
create policy "public read categories"
  on menu_categories for select
  using (true);

create policy "admin full access categories"
  on menu_categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- menu_items: public can read available items only, admin full access
create policy "public read available items"
  on menu_items for select
  using (is_available = true);

create policy "admin full access items"
  on menu_items for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- orders: public (anon) can insert only, admin can read/update/delete
-- Supabase's default privilege template only grants SELECT to `anon`; the
-- RLS policy alone is not enough for an unauthenticated customer to place an
-- order, so INSERT must also be granted explicitly at the table level.
grant insert on orders to anon;

create policy "public insert orders"
  on orders for insert
  with check (true);

create policy "admin read orders"
  on orders for select
  using (auth.role() = 'authenticated');

create policy "admin update orders"
  on orders for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "admin delete orders"
  on orders for delete
  using (auth.role() = 'authenticated');

-- ---------- Storage (menu item images) ----------

insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do nothing;

create policy "public read menu images"
  on storage.objects for select
  using (bucket_id = 'menu-images');

create policy "admin upload menu images"
  on storage.objects for insert
  with check (bucket_id = 'menu-images' and auth.role() = 'authenticated');

create policy "admin update menu images"
  on storage.objects for update
  using (bucket_id = 'menu-images' and auth.role() = 'authenticated');

create policy "admin delete menu images"
  on storage.objects for delete
  using (bucket_id = 'menu-images' and auth.role() = 'authenticated');
