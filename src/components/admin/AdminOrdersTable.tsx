"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatTaka } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/database.types";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-neutral-700 text-neutral-200",
  confirmed: "bg-blue-900 text-blue-300",
  preparing: "bg-amber-900 text-amber-300",
  out_for_delivery: "bg-purple-900 text-purple-300",
  delivered: "bg-green-900 text-green-300",
  cancelled: "bg-red-900 text-red-300",
};

export function AdminOrdersTable({ shopId }: { shopId: string }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function loadOrders() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("shop_id", shopId)
      .order("created_at", { ascending: false })
      .returns<Order[]>();
    setOrders(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId]);

  async function handleStatusChange(orderId: string, status: OrderStatus) {
    setUpdatingId(orderId);
    const supabase = createClient();
    await supabase.from("orders").update({ status }).eq("id", orderId);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o)),
    );
    setUpdatingId(null);
  }

  if (loading) {
    return <p className="text-neutral-500">লোড হচ্ছে...</p>;
  }

  if (orders.length === 0) {
    return <p className="text-neutral-500">এখনো কোনো অর্ডার আসেনি।</p>;
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="rounded-lg border border-neutral-800 bg-neutral-900"
        >
          <button
            type="button"
            onClick={() =>
              setExpandedId(expandedId === order.id ? null : order.id)
            }
            className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3 text-left"
          >
            <div className="min-w-0">
              <p className="font-medium text-neutral-100">
                {order.customer_name}{" "}
                <span className="text-neutral-500">· {order.customer_phone}</span>
              </p>
              <p className="text-xs text-neutral-500">
                {new Date(order.created_at).toLocaleString("en-BD")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-amber-500">
                {formatTaka(order.total_amount)}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[order.status]}`}
              >
                {order.status.replace(/_/g, " ")}
              </span>
            </div>
          </button>

          {expandedId === order.id ? (
            <div className="space-y-3 border-t border-neutral-800 px-4 py-3">
              <div>
                <p className="text-xs font-medium uppercase text-neutral-500">
                  ঠিকানা
                </p>
                <p className="text-sm text-neutral-300">
                  {order.customer_address}
                </p>
              </div>

              {order.notes ? (
                <div>
                  <p className="text-xs font-medium uppercase text-neutral-500">
                    নোট
                  </p>
                  <p className="text-sm text-neutral-300">{order.notes}</p>
                </div>
              ) : null}

              <div>
                <p className="mb-1 text-xs font-medium uppercase text-neutral-500">
                  আইটেম
                </p>
                <ul className="space-y-1">
                  {order.items.map((item) => (
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
                </ul>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium uppercase text-neutral-500">
                  Status
                </label>
                <select
                  value={order.status}
                  disabled={updatingId === order.id}
                  onChange={(e) =>
                    handleStatusChange(order.id, e.target.value as OrderStatus)
                  }
                  className="w-full max-w-xs rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-amber-500"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
