"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatTaka } from "@/lib/utils";
import type { MenuItem } from "@/lib/database.types";

// Row for everyday items (drinks, snacks) — still shows a real photo and
// a legible name/price, just at a smaller scale than FeaturedMenuItemCard
// so the menu's visual weight matches each dish's actual importance
// instead of a uniform card grid or a plain text list.
export function CompactMenuItemRow({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(resetTimeout.current), []);

  function handleAdd() {
    addItem({ menu_item_id: item.id, name: item.name, price: item.price });
    setJustAdded(true);
    clearTimeout(resetTimeout.current);
    resetTimeout.current = setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <div className="flex items-center gap-4 px-4 py-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-800">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl">
            🍽️
          </div>
        )}
      </div>

      {/* No truncation on the name — a clipped dish name is a real
          usability bug (customers can't tell what they're ordering), so
          it wraps to a second line instead of being cut off. */}
      <div className="min-w-0 flex-1">
        {/* text-lg matches Hero's subtitle ("ডেলিভারিতে ক্যাশ পেমেন্ট",
            src/components/layout/Hero.tsx) — same font-size step in the
            page's type scale, kept consistent rather than a bespoke
            value. Weight/typeface still carry the visual emphasis. */}
        <p className="font-display text-lg leading-tight font-extrabold break-words text-neutral-100">
          {item.name}
        </p>
        {item.description ? (
          <p className="mt-1 line-clamp-2 text-sm text-neutral-400">
            {item.description}
          </p>
        ) : null}
      </div>

      <span className="shrink-0 text-base font-semibold text-amber-500">
        {formatTaka(item.price)}
      </span>

      <button
        type="button"
        onClick={handleAdd}
        aria-label={
          justAdded ? `${item.name} added to cart` : `Add ${item.name} to cart`
        }
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-medium leading-none ${
          justAdded
            ? "scale-110 bg-betel-600 text-neutral-50"
            : "bg-amber-500 text-neutral-950 transition-colors hover:bg-amber-400 active:bg-amber-600"
        }`}
        style={{ transition: "transform 0.2s ease" }}
      >
        {justAdded ? "✓" : "+"}
      </button>
    </div>
  );
}
