"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { OrderForm } from "@/components/order/OrderForm";
import { formatTaka } from "@/lib/utils";
import type { OrderItem, Shop } from "@/lib/database.types";

type Step = "cart" | "checkout" | "success";

export function CartDrawer({
  shop,
  open,
  onClose,
}: {
  shop: Shop;
  open: boolean;
  onClose: () => void;
}) {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [lastOrderSummary, setLastOrderSummary] = useState<{
    items: OrderItem[];
    subtotal: number;
  } | null>(null);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState<string | null>(null);
  const [whatsappJustSent, setWhatsappJustSent] = useState(false);
  const whatsappResetTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => () => clearTimeout(whatsappResetTimeout.current), []);

  function handleClose() {
    onClose();
    // Reset to the cart view after the drawer closing animation settles.
    setTimeout(() => setStep("cart"), 200);
  }

  function handleOrderSuccess(orderId: string, whatsappUrl: string | null) {
    setLastOrderId(orderId);
    setLastOrderSummary({ items, subtotal });
    setLastWhatsAppUrl(whatsappUrl);
    setStep("success");
    clearCart();
  }

  function handleResendWhatsApp() {
    if (!lastWhatsAppUrl) return;
    window.open(lastWhatsAppUrl, "_blank", "noopener,noreferrer");
    setWhatsappJustSent(true);
    clearTimeout(whatsappResetTimeout.current);
    whatsappResetTimeout.current = setTimeout(
      () => setWhatsappJustSent(false),
      1200,
    );
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close cart"
        onClick={handleClose}
        className="absolute inset-0 bg-black/60"
      />
      <div className="relative flex h-full w-full max-w-md flex-col bg-neutral-900 shadow-xl">
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-4">
          <h2 className="text-lg font-bold text-neutral-100">
            {step === "cart" && "আপনার কার্ট"}
            {step === "checkout" && "চেকআউট"}
            {step === "success" && "অর্ডার সফল হয়েছে"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100"
          >
            ✕
          </button>
        </div>

        {step === "cart" ? (
          <div className="flex flex-1 flex-col overflow-hidden">
            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 text-neutral-500">
                <span className="text-3xl">🛒</span>
                <p>আপনার কার্ট খালি</p>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                  {items.map((item) => (
                    <li
                      key={item.menu_item_id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-neutral-800 p-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-neutral-100">
                          {item.name}
                        </p>
                        <p className="text-sm text-amber-500">
                          {formatTaka(item.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.menu_item_id, item.quantity - 1)
                          }
                          className="h-7 w-7 rounded-md bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-neutral-100">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.menu_item_id, item.quantity + 1)
                          }
                          className="h-7 w-7 rounded-md bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.menu_item_id)}
                          className="ml-1 text-neutral-500 hover:text-red-400"
                          aria-label={`Remove ${item.name}`}
                        >
                          🗑
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-neutral-800 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-neutral-400">সাবটোটাল</span>
                    <span className="text-lg font-semibold text-neutral-100">
                      {formatTaka(subtotal)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("checkout")}
                    className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-neutral-950 transition-colors hover:bg-amber-400"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        ) : null}

        {step === "checkout" ? (
          <OrderForm
            shop={shop}
            items={items}
            subtotal={subtotal}
            onBack={() => setStep("cart")}
            onSuccess={handleOrderSuccess}
          />
        ) : null}

        {step === "success" ? (
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6 text-center">
              <span className="text-4xl">✅</span>
              <h3 className="text-xl font-bold text-neutral-100">
                অর্ডার সাবমিট হয়েছে!
              </h3>
              <p className="text-neutral-400">
                অর্ডার আইডি:{" "}
                <span className="font-mono text-neutral-200">
                  {lastOrderId?.slice(0, 8)}
                </span>
              </p>

              {lastOrderSummary ? (
                <ul className="space-y-2 rounded-lg border border-neutral-800 p-3 text-left">
                  {lastOrderSummary.items.map((item) => (
                    <li
                      key={item.menu_item_id}
                      className="flex justify-between text-sm text-neutral-300"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>{formatTaka(item.price * item.quantity)}</span>
                    </li>
                  ))}
                  <li className="flex justify-between border-t border-neutral-800 pt-2 font-semibold text-neutral-100">
                    <span>সর্বমোট</span>
                    <span>{formatTaka(lastOrderSummary.subtotal)}</span>
                  </li>
                </ul>
              ) : null}

              <p className="text-sm text-neutral-500">
                ক্যাশ অন ডেলিভারি — ডেলিভারির সময় টাকা দিন। আমরা শীঘ্রই
                আপনার সাথে যোগাযোগ করব।
              </p>

              {lastWhatsAppUrl ? (
                <div>
                  {/* Order confirmation was already sent automatically on
                      checkout — this button is the visible fallback in case
                      the browser blocked that popup, plus a way to resend. */}
                  <button
                    type="button"
                    onClick={handleResendWhatsApp}
                    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white transition-colors ${
                      whatsappJustSent
                        ? "bg-betel-500"
                        : "bg-betel-600 hover:bg-betel-500"
                    }`}
                  >
                    {whatsappJustSent
                      ? "✓ পাঠানো হয়েছে"
                      : "💬 WhatsApp-এ অর্ডার পাঠান"}
                  </button>
                </div>
              ) : null}
            </div>
            <div className="border-t border-neutral-800 p-4">
              <button
                type="button"
                onClick={handleClose}
                className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-neutral-950 hover:bg-amber-400"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
