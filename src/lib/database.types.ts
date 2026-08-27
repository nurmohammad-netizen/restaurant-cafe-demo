export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  menu_item_id: string;
  name: string;
  price: number;
  quantity: number;
};

export type Shop = {
  id: string;
  name: string;
  phone: string | null;
  address: string | null;
  whatsapp_number: string | null;
  is_active: boolean;
  created_at: string;
};

export type MenuCategory = {
  id: string;
  shop_id: string;
  name: string;
  display_order: number;
};

export type MenuItem = {
  id: string;
  shop_id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
};

export type Order = {
  id: string;
  shop_id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: OrderItem[];
  total_amount: number;
  status: OrderStatus;
  notes: string | null;
  created_at: string;
};

// Minimal typed schema shape consumed by the Supabase client generics.
// Regenerate with `supabase gen types typescript` once the project is live
// if you want full column-level type safety.
export type Database = {
  public: {
    Tables: {
      shops: {
        Row: Shop;
        Insert: Partial<Shop> & Pick<Shop, "name">;
        Update: Partial<Shop>;
        Relationships: [];
      };
      menu_categories: {
        Row: MenuCategory;
        Insert: Partial<MenuCategory> & Pick<MenuCategory, "shop_id" | "name">;
        Update: Partial<MenuCategory>;
        Relationships: [];
      };
      menu_items: {
        Row: MenuItem;
        Insert: Partial<MenuItem> &
          Pick<MenuItem, "shop_id" | "name" | "price">;
        Update: Partial<MenuItem>;
        Relationships: [];
      };
      orders: {
        Row: Order;
        Insert: Partial<Order> &
          Pick<
            Order,
            | "shop_id"
            | "customer_name"
            | "customer_phone"
            | "customer_address"
            | "items"
            | "total_amount"
          >;
        Update: Partial<Order>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      order_status: OrderStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
