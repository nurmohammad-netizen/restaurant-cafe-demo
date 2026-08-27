"use client";

import { useState } from "react";
import { CartButton } from "@/components/cart/CartButton";
import { CartDrawer } from "@/components/cart/CartDrawer";

export function StorefrontCart({ shopId }: { shopId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CartButton onClick={() => setOpen(true)} />
      <CartDrawer shopId={shopId} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
