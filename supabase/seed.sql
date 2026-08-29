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
  ('22222222-2222-2222-a222-222222222225', '11111111-1111-1111-1111-111111111111', 'Traditional Favorites', 2),
  ('22222222-2222-2222-a222-222222222222', '11111111-1111-1111-1111-111111111111', 'Burgers & Fast Food', 3),
  ('22222222-2222-2222-a222-222222222223', '11111111-1111-1111-1111-111111111111', 'Snacks', 4),
  ('22222222-2222-2222-a222-222222222224', '11111111-1111-1111-1111-111111111111', 'Drinks & Juice', 5),
  ('22222222-2222-2222-a222-222222222226', '11111111-1111-1111-1111-111111111111', 'Desserts', 6)
on conflict (id) do nothing;

-- ---------- Menu Items ----------
-- Photos are free-license stock images from Unsplash/Pexels (free for
-- commercial use, no attribution required). If next.config.ts's
-- images.remotePatterns doesn't include images.unsplash.com and
-- images.pexels.com, add them or next/image will refuse to render these.
--
-- Descriptions follow a consistent copywriting formula: lead with cooking
-- method/origin, hero ingredient before secondary ones, exactly one
-- sensory adjective (never stacked), no filler words (fresh/quality/
-- authentic), end on the most appetizing detail.
insert into menu_items (id, shop_id, category_id, name, description, price, image_url, is_available) values
  -- Biryani & Rice
  ('33333333-3333-3333-a333-333333333301', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222221', 'Chicken Biryani', 'Dum-cooked basmati rice layered with tender chicken, boiled egg, salad and fried onions', 250, 'https://images.pexels.com/photos/7469285/pexels-photo-7469285.jpeg?auto=compress&cs=tinysrgb&w=800', true),
  ('33333333-3333-3333-a333-333333333302', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222221', 'Beef Tehari', 'Slow-cooked beef and potato in silky mustard-oil rice, finished with whole spices', 220, 'https://images.unsplash.com/photo-1716550781939-beb7d7247aae?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333303', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222221', 'Kacchi Biryani', 'Dum-cooked mutton and basmati rice with potato, sealed in aromatic spices', 320, 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800&q=80&auto=format&fit=crop', true),

  -- Traditional Favorites
  ('33333333-3333-3333-a333-333333333315', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222225', 'Aloo Bhorta Set', 'Home-style mashed potato in mustard oil with onion and chili, served with rice and silky dal', 90, 'https://images.unsplash.com/photo-1777613112793-4fb0717c193b?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333316', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222225', 'Haleem', 'Slow-cooked lentils and shredded beef, topped with crispy fried onions', 150, 'https://images.unsplash.com/photo-1512010151537-2cf5c638ad51?w=800&q=80&auto=format&fit=crop', true),

  -- Burgers & Fast Food
  ('33333333-3333-3333-a333-333333333304', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222222', 'Classic Beef Burger', 'Char-grilled beef patty with cheese, lettuce and smoky sauce', 180, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333305', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222222', 'Chicken Zinger Burger', 'Fried chicken fillet layered with lettuce and spicy mayo', 200, 'https://images.unsplash.com/photo-1637710847214-f91d99669e18?w=800&q=80&auto=format&fit=crop', true),

  -- Snacks
  ('33333333-3333-3333-a333-333333333306', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222223', 'French Fries', 'Hand-cut potato fries, fried crispy and seasoned', 90, 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333307', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222223', 'Chicken Fried Momo (6 pcs)', 'Pan-fried chicken dumplings served with spicy chutney', 130, 'https://images.unsplash.com/photo-1768326119773-05cae29f4106?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333308', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222223', 'Vegetable Samosa (2 pcs)', 'Fried pastry pockets filled with spiced vegetables', 40, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333312', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222223', 'Paratha with Bhaji', 'Pan-fried flaky paratha served with vegetable bhaji', 60, 'https://images.unsplash.com/photo-1606222651797-dc3116801261?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333313', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222223', 'Fuchka (6 pcs)', 'Fried semolina shells filled with mashed potato, chickpea and tangy tamarind water', 60, 'https://images.unsplash.com/photo-1708782340380-a1615fb5b250?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333314', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222223', 'Chicken Tikka', 'Chicken marinated in yogurt and spices, char-grilled until smoky', 220, 'https://images.unsplash.com/photo-1649295948526-fd64e7248754?w=800&q=80&auto=format&fit=crop', true),

  -- Drinks & Juice
  ('33333333-3333-3333-a333-333333333309', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222224', 'Cold Coffee', 'Coffee blended with milk and silky ice cream', 120, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333310', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222224', 'Fresh Lemon Juice', 'Hand-pressed lemon juice with mint and a pinch of tangy black salt', 60, 'https://images.unsplash.com/photo-1623084921164-4a8c5c37a912?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333311', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222224', 'Mango Lassi', 'Yogurt blended with sweet mango', 90, 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800&q=80&auto=format&fit=crop', true),
  ('33333333-3333-3333-a333-333333333318', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222224', 'Borhani', 'Yogurt blended with mint, spices and tangy black salt', 50, 'https://images.unsplash.com/photo-1630409346699-79481a79db52?w=800&q=80&auto=format&fit=crop', true),

  -- Desserts
  ('33333333-3333-3333-a333-333333333317', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-a222-222222222226', 'Mishti Doi', 'Silky yogurt set in clay pots with caramelized sugar', 60, 'https://images.pexels.com/photos/34153206/pexels-photo-34153206.jpeg?auto=compress&cs=tinysrgb&w=800', true)
on conflict (id) do nothing;
