import { MenuItemCard } from "@/components/menu/MenuItemCard";
import type { MenuCategory, MenuItem } from "@/lib/database.types";

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
          <h3 className="mb-4 text-xl font-bold text-neutral-100">
            {category.name}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {categoryItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}

      {uncategorized.length > 0 ? (
        <div>
          <h3 className="mb-4 text-xl font-bold text-neutral-100">Other</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {uncategorized.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
