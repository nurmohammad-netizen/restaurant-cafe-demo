"use client";

import { useState } from "react";
import { CartButton } from "@/components/cart/CartButton";
import { CartDrawer } from "@/components/cart/CartDrawer";
import type { Shop } from "@/lib/database.types";

export function StorefrontCart({ shop }: { shop: Shop }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CartButton onClick={() => setOpen(true)} />
      <CartDrawer shop={shop} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
