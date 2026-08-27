"use client";

import { useCart } from "@/context/CartContext";

export function CartButton({ onClick }: { onClick: () => void }) {
  const { itemCount } = useCart();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open cart"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-neutral-950 shadow-lg transition-transform hover:scale-105 active:scale-95"
    >
      <span className="text-2xl">🛒</span>
      {itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {itemCount}
        </span>
      ) : null}
    </button>
  );
}
