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
insert into menu_categories (id, shop_id, name, display_order) values
  ('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111', 'Biryani & Rice', 1),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Burgers & Fast Food', 2),
  ('22222222-2222-2222-2222-222222222223', '11111111-1111-1111-1111-111111111111', 'Snacks', 3),
  ('22222222-2222-2222-2222-222222222224', '11111111-1111-1111-1111-111111111111', 'Drinks & Juice', 4)
on conflict (id) do nothing;

-- ---------- Menu Items ----------
insert into menu_items (id, shop_id, category_id, name, description, price, image_url, is_available) values
  ('33333333-3333-3333-3333-333333333301', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', 'Chicken Biryani', 'Fragrant basmati rice with tender chicken, boiled egg & salad', 250, 'https://placehold.co/400x300/292524/f59e0b?text=Chicken+Biryani', true),
  ('33333333-3333-3333-3333-333333333302', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', 'Beef Tehari', 'Slow-cooked beef with mustard-oil flavored rice', 220, 'https://placehold.co/400x300/292524/f59e0b?text=Beef+Tehari', true),
  ('33333333-3333-3333-3333-333333333303', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222221', 'Kacchi Biryani', 'Traditional mutton kacchi with potato & aromatic spices', 320, 'https://placehold.co/400x300/292524/f59e0b?text=Kacchi+Biryani', true),
  ('33333333-3333-3333-3333-333333333304', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Classic Beef Burger', 'Grilled beef patty, cheese, lettuce & our special sauce', 180, 'https://placehold.co/400x300/292524/f59e0b?text=Beef+Burger', true),
  ('33333333-3333-3333-3333-333333333305', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Chicken Zinger Burger', 'Crispy fried chicken fillet with spicy mayo', 200, 'https://placehold.co/400x300/292524/f59e0b?text=Zinger+Burger', true),
  ('33333333-3333-3333-3333-333333333306', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222223', 'French Fries', 'Crispy golden fries with seasoning', 90, 'https://placehold.co/400x300/292524/f59e0b?text=French+Fries', true),
  ('33333333-3333-3333-3333-333333333307', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222223', 'Chicken Fried Momo (6 pcs)', 'Pan-fried dumplings served with spicy chutney', 130, 'https://placehold.co/400x300/292524/f59e0b?text=Fried+Momo', true),
  ('33333333-3333-3333-3333-333333333308', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222223', 'Vegetable Samosa (2 pcs)', 'Crispy pastry filled with spiced vegetables', 40, 'https://placehold.co/400x300/292524/f59e0b?text=Samosa', true),
  ('33333333-3333-3333-3333-333333333309', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222224', 'Cold Coffee', 'Chilled coffee blended with milk & ice cream', 120, 'https://placehold.co/400x300/292524/f59e0b?text=Cold+Coffee', true),
  ('33333333-3333-3333-3333-333333333310', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222224', 'Fresh Lemon Juice', 'Refreshing lemon juice with mint', 60, 'https://placehold.co/400x300/292524/f59e0b?text=Lemon+Juice', true),
  ('33333333-3333-3333-3333-333333333311', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222224', 'Mango Lassi', 'Sweet yogurt drink blended with fresh mango', 90, 'https://placehold.co/400x300/292524/f59e0b?text=Mango+Lassi', true)
on conflict (id) do nothing;
