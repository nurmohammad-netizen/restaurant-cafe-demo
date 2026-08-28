-- ============================================================
-- COD Restaurant/Cafe — Sample Data
-- Run this AFTER schema.sql so you can see the site working immediately.
-- Safe to re-run (uses fixed IDs + ON CONFLICT DO NOTHING).
-- ============================================================

-- ---------- Shop ----------
insert into shops (id, name, phone, address, whatsapp_number, is_active)
values (
  '11111111-1111-1111-1111-111111111111',
  'Dhaka Delights Cafe',
  '+8801700000000',
  'House 12, Road 5, Dhanmondi, Dhaka 1209',
  '+8801700000000',
  true
)
on conflict (id) do nothing;

-- ---------- Categories ----------
-- Note: the 4th hyphen-group's first hex digit must be 8/9/a/b to be a
-- syntactically valid UUID (RFC 4122 variant bits) — Zod's `.uuid()`
-- validator enforces this strictly, so these fixed IDs use 'a' there.
insert into menu_categories (id, shop_id, name, display_order) values
  ('22222222-2222-2222-a222-222222222221', '11111111-1111-1111-1111-111111111111', 'Biryani & Rice', 1),
  ('22222222-2222-2222-a222-222222222222', '11111111-1111-1111-1111-111111111111', 'Burgers & Fast Food', 2),
  ('22222222-2222-2222-a222-222222222223', '11111111-1111-1111-1111-111111111111', 'Snacks', 3),
  ('22222222-2222-2222-a222-222222222224', '11111111-1111-1111-1111-111111111111', 'Drinks & Juice', 4)
on conflict (id) do nothing;

-- ---------- Menu Items ----------
-- Photos are free-license stock images from Unsplash/Pexels (free for
-- commercial use, no attribution required). If next.config.ts's
-- images.remotePatterns doesn't include images.unsplash.com and
-- images.pexels.com, add them or next/image will refuse to render these.
insert into menu_items (id, shop_id, category_id, name, description, price, image_url, is_available) values
  ('33333333-3333-3333-a333-333333333301', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222221', 'Chicken Biryani', 'Fragrant basmati rice with tender chicken, boiled egg & salad', 250, 'https://images.pexels.com/photos/7469285/pexels-photo-7469285.jpeg?auto=compress&cs=tinysrgb&w=800', true),
  ('33333333-3333-3333-a333-333333333302', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222221', 'Beef Tehari', 'Slow-cooked beef with mustard-oil flavored rice', 220, 'https://images.unsplash.com/photo-1716550781939-beb7d7247aae?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333303', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222221', 'Kacchi Biryani', 'Traditional mutton kacchi with potato & aromatic spices', 320, 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333304', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222222', 'Classic Beef Burger', 'Grilled beef patty, cheese, lettuce & our special sauce', 180, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333305', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222222', 'Chicken Zinger Burger', 'Crispy fried chicken fillet with spicy mayo', 200, 'https://images.unsplash.com/photo-1637710847214-f91d99669e18?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333306', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222223', 'French Fries', 'Crispy golden fries with seasoning', 90, 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333307', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222223', 'Chicken Fried Momo (6 pcs)', 'Pan-fried dumplings served with spicy chutney', 130, 'https://images.unsplash.com/photo-1768326119773-05cae29f4106?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333308', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222223', 'Vegetable Samosa (2 pcs)', 'Crispy pastry filled with spiced vegetables', 40, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333309', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222224', 'Cold Coffee', 'Chilled coffee blended with milk & ice cream', 120, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333310', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222224', 'Fresh Lemon Juice', 'Refreshing lemon juice with mint', 60, 'https://images.unsplash.com/photo-1623084921164-4a8c5c37a912?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333311', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222224', 'Mango Lassi', 'Sweet yogurt drink blended with fresh mango', 90, 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&q=80&auto=format&fit=crop', true)
on conflict (id) do nothing;
