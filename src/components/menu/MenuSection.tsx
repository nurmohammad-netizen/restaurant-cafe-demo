import { FeaturedMenuItemCard } from "@/components/menu/FeaturedMenuItemCard";
import { CompactMenuItemRow } from "@/components/menu/CompactMenuItemRow";
import type { MenuCategory, MenuItem } from "@/lib/database.types";

// The shop's three signature dishes get the larger featured-card
// treatment wherever they appear; everything else lists compactly.
// Matched by name rather than a schema flag — simplest option for a
// fixed, named set of three dishes on a single-shop demo.
const SIGNATURE_DISH_NAMES = new Set([
  "Kacchi Biryani",
  "Chicken Biryani",
  "Haleem",
]);

function CategoryItems({ items }: { items: MenuItem[] }) {
  const featured = items.filter((item) => SIGNATURE_DISH_NAMES.has(item.name));
  const rest = items.filter((item) => !SIGNATURE_DISH_NAMES.has(item.name));

  return (
    <>
      {featured.length > 0 ? (
        <div
          className={`mb-4 grid gap-4 ${featured.length > 1 ? "sm:grid-cols-2" : ""}`}
        >
          {featured.map((item) => (
            <FeaturedMenuItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : null}

      {rest.length > 0 ? (
        <div className="divide-y divide-neutral-800 rounded-xl border border-neutral-800 bg-neutral-900/50">
          {rest.map((item) => (
            <CompactMenuItemRow key={item.id} item={item} />
          ))}
        </div>
      ) : null}
    </>
  );
}

export function MenuSection({
  categories,
  items,
}: {
  categories: MenuCategory[];
  items: MenuItem[];
}) {
  const grouped = categories
    .map((category) => ({
      category,
      items: items.filter((item) => item.category_id === category.id),
    }))
    .filter((group) => group.items.length > 0);

  const uncategorized = items.filter((item) => !item.category_id);

  if (grouped.length === 0 && uncategorized.length === 0) {
    return (
      <p className="text-center text-neutral-500">
        মেনু শীঘ্রই যুক্ত করা হবে। Menu coming soon.
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {grouped.map(({ category, items: categoryItems }) => (
        <div key={category.id}>
          <h3 className="font-display mb-4 text-xl font-bold text-neutral-100">
            {category.name}
          </h3>
          <CategoryItems items={categoryItems} />
        </div>
      ))}

      {uncategorized.length > 0 ? (
        <div>
          <h3 className="font-display mb-4 text-xl font-bold text-neutral-100">
            Other
          </h3>
          <CategoryItems items={uncategorized} />
        </div>
      ) : null}
    </div>
  );
}
