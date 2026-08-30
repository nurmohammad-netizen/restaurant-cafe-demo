"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatTaka } from "@/lib/utils";
import type { MenuItem } from "@/lib/database.types";

// Larger card treatment for the shop's signature dishes — bigger image,
// a betel-green tag, headline-weight name and price — so importance
// shows up in the layout, not just the copy. See CompactMenuItemRow for
// the everyday-item counterpart.
export function FeaturedMenuItemCard({ item }: { item: MenuItem }) {
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
    <div className="overflow-hidden rounded-2xl border border-brass-500/40 bg-neutral-900">
      <div className="relative h-48 w-full bg-neutral-800 sm:h-56">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">
            🍽️
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <span className="mb-2 inline-block rounded-full border border-betel-600 bg-betel-900/60 px-2.5 py-0.5 text-xs font-medium text-betel-400">
          সিগনেচার ডিশ
        </span>
        <h3 className="font-display text-xl font-bold text-neutral-100">
          {item.name}
        </h3>
        {item.description ? (
          <p className="mt-1 text-sm text-neutral-400">{item.description}</p>
        ) : null}

        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl font-bold text-amber-500">
            {formatTaka(item.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              justAdded
                ? "scale-105 bg-betel-600 text-neutral-50"
                : "bg-amber-500 text-neutral-950 transition-colors hover:bg-amber-400 active:bg-amber-600"
            }`}
            style={{ transition: "transform 0.2s ease" }}
          >
            {justAdded ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
