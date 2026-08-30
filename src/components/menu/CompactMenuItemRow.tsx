"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatTaka } from "@/lib/utils";
import type { MenuItem } from "@/lib/database.types";

// Single-line row for everyday items (drinks, snacks) — deliberately
// smaller than FeaturedMenuItemCard so the menu's visual weight matches
// each dish's actual importance instead of a uniform card grid.
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
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-neutral-800">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            sizes="44px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg">
            🍽️
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-bold text-neutral-100">
          {item.name}
        </p>
        {item.description ? (
          <p className="truncate text-xs text-neutral-500">
            {item.description}
          </p>
        ) : null}
      </div>

      <span className="shrink-0 text-sm font-semibold text-amber-500">
        {formatTaka(item.price)}
      </span>

      <button
        type="button"
        onClick={handleAdd}
        aria-label={
          justAdded ? `${item.name} added to cart` : `Add ${item.name} to cart`
        }
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-base font-medium leading-none ${
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
