"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { orderFormSchema } from "@/lib/validations";
import { formatTaka } from "@/lib/utils";
import { buildOrderWhatsAppMessage, buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import type { OrderItem, Shop } from "@/lib/database.types";

type Props = {
  shop: Shop;
  items: OrderItem[];
  subtotal: number;
  onBack: () => void;
  onSuccess: (orderId: string, whatsappUrl: string | null) => void;
};

export function OrderForm({ shop, items, subtotal, onBack, onSuccess }: Props) {
  const [values, setValues] = useState({
    customer_name: "",
    customer_phone: "",
    customer_address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    const result = orderFormSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    // Generated client-side and skip requesting the row back: the `orders`
    // RLS SELECT policy only allows authenticated (admin) reads, and Postgres
    // enforces that same policy on a RETURNING clause — so an anon insert
    // that asks for the row back gets rejected even though the insert itself
    // is allowed.
    const orderId = crypto.randomUUID();

    const supabase = createClient();
    const { error } = await supabase.from("orders").insert({
      id: orderId,
      shop_id: shop.id,
      customer_name: result.data.customer_name,
      customer_phone: result.data.customer_phone,
      customer_address: result.data.customer_address,
      notes: result.data.notes || null,
      items,
      total_amount: subtotal,
      status: "pending",
    });

    setSubmitting(false);

    if (error) {
      setSubmitError("অর্ডার সাবমিট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    // The Supabase row is already saved at this point — everything below
    // is an add-on notification, not the source of truth for the order.
    const whatsappMessage = buildOrderWhatsAppMessage({
      shopName: shop.name,
      orderId,
      customerName: result.data.customer_name,
      customerPhone: result.data.customer_phone,
      customerAddress: result.data.customer_address,
      items,
      total: subtotal,
    });
    const whatsappUrl = buildWhatsAppOrderUrl(shop.whatsapp_number, whatsappMessage);

    if (whatsappUrl) {
      // Best-effort: browsers can silently block a popup here since this
      // runs after an awaited network request, not synchronously inside
      // the click handler. The success screen also renders `whatsappUrl`
      // as a real button so the customer always has a working fallback.
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    onSuccess(orderId, whatsappUrl);
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-neutral-400 hover:text-neutral-200"
        >
          ← কার্টে ফিরে যান
        </button>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-300">
            আপনার নাম *
          </label>
          <input
            value={values.customer_name}
            onChange={(e) =>
              setValues((v) => ({ ...v, customer_name: e.target.value }))
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:border-amber-500"
            placeholder="যেমন: করিম উদ্দিন"
          />
          {errors.customer_name ? (
            <p className="mt-1 text-xs text-red-400">{errors.customer_name}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-300">
            মোবাইল নম্বর *
          </label>
          <input
            type="tel"
            value={values.customer_phone}
            onChange={(e) =>
              setValues((v) => ({ ...v, customer_phone: e.target.value }))
            }
            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:border-amber-500"
            placeholder="01XXXXXXXXX"
            inputMode="tel"
          />
          {errors.customer_phone ? (
            <p className="mt-1 text-xs text-red-400">{errors.customer_phone}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-300">
            ডেলিভারি ঠিকানা *
          </label>
          <textarea
            value={values.customer_address}
            onChange={(e) =>
              setValues((v) => ({ ...v, customer_address: e.target.value }))
            }
            rows={3}
            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:border-amber-500"
            placeholder="বাসা/রোড/এলাকা, থানা, জেলা"
          />
          {errors.customer_address ? (
            <p className="mt-1 text-xs text-red-400">
              {errors.customer_address}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-300">
            নোট (ঐচ্ছিক)
          </label>
          <textarea
            value={values.notes}
            onChange={(e) => setValues((v) => ({ ...v, notes: e.target.value }))}
            rows={2}
            className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:border-amber-500"
            placeholder="বিশেষ কোনো নির্দেশনা থাকলে লিখুন"
          />
        </div>

        {submitError ? (
          <p className="text-sm text-red-400">{submitError}</p>
        ) : null}
      </div>

      <div className="border-t border-neutral-800 p-4">
        <div className="mb-3 flex items-center justify-between text-sm text-neutral-400">
          <span>সর্বমোট (ক্যাশ অন ডেলিভারি)</span>
          <span className="text-base font-semibold text-neutral-100">
            {formatTaka(subtotal)}
          </span>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-neutral-950 transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "সাবমিট হচ্ছে..." : "Place Order"}
        </button>
      </div>
    </form>
  );
}
