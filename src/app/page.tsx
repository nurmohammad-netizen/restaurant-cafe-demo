import { createClient } from "@/lib/supabase/server";
import { CartProvider } from "@/context/CartContext";
import { Hero } from "@/components/layout/Hero";
import { StatsBar } from "@/components/layout/StatsBar";
import { AboutSection } from "@/components/layout/AboutSection";
import { TrustBadges } from "@/components/layout/TrustBadges";
import { PhotoGallery } from "@/components/layout/PhotoGallery";
import { WhyOrderDirect } from "@/components/layout/WhyOrderDirect";
import { Testimonials } from "@/components/layout/Testimonials";
import { OpeningHours } from "@/components/layout/OpeningHours";
import { LocationSection } from "@/components/layout/LocationSection";
import { Footer } from "@/components/layout/Footer";
import { MenuSection } from "@/components/menu/MenuSection";
import { StorefrontCart } from "@/components/cart/StorefrontCart";
import type { MenuCategory, MenuItem, Shop } from "@/lib/database.types";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: shop } = await supabase
    .from("shops")
    .select("*")
    .eq("is_active", true)
    .limit(1)
    .maybeSingle<Shop>();

  let categories: MenuCategory[] = [];
  let items: MenuItem[] = [];

  if (shop) {
    const [{ data: categoryData }, { data: itemData }] = await Promise.all([
      supabase
        .from("menu_categories")
        .select("*")
        .eq("shop_id", shop.id)
        .order("display_order")
        .returns<MenuCategory[]>(),
      supabase
        .from("menu_items")
        .select("*")
        .eq("shop_id", shop.id)
        .eq("is_available", true)
        .order("name")
        .returns<MenuItem[]>(),
    ]);
    categories = categoryData ?? [];
    items = itemData ?? [];
  }

  return (
    <CartProvider>
      <Hero shop={shop} />
      <StatsBar />
      <TrustBadges />
      <AboutSection shop={shop} />
      <PhotoGallery />
      <WhyOrderDirect />
      <Testimonials />
      <OpeningHours />
      <LocationSection shop={shop} />

      <section id="menu" className="mx-auto w-full max-w-3xl px-4 py-14">
        <h2 className="mb-8 text-center text-2xl font-bold text-neutral-100">
          আমাদের মেনু
        </h2>
        {shop ? (
          <MenuSection categories={categories} items={items} />
        ) : (
          <p className="text-center text-neutral-500">
            দোকানের তথ্য পাওয়া যায়নি। Supabase কনফিগার করা হয়েছে কিনা যাচাই
            করুন।
          </p>
        )}
      </section>

      <div className="mt-auto">
        <Footer shop={shop} />
      </div>

      {shop ? <StorefrontCart shopId={shop.id} /> : null}
    </CartProvider>
  );
}
