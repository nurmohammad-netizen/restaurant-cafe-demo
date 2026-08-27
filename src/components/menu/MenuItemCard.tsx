"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatTaka } from "@/lib/utils";
import type { MenuItem } from "@/lib/database.types";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <div className="flex gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-3 sm:p-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-800 sm:h-24 sm:w-24">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl">
            🍽️
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h3 className="truncate font-semibold text-neutral-100">
            {item.name}
          </h3>
          {item.description ? (
            <p className="mt-0.5 line-clamp-2 text-sm text-neutral-400">
              {item.description}
            </p>
          ) : null}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-amber-500">
            {formatTaka(item.price)}
          </span>
          <button
            type="button"
            onClick={() =>
              addItem({
                menu_item_id: item.id,
                name: item.name,
                price: item.price,
              })
            }
            className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-amber-400 active:bg-amber-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
