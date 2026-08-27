"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AdminMenuTable } from "@/components/admin/AdminMenuTable";
import { AdminOrdersTable } from "@/components/admin/AdminOrdersTable";
import { cn } from "@/lib/utils";
import type { Shop } from "@/lib/database.types";

type Tab = "menu" | "orders";

export function DashboardClient({
  shop,
  userEmail,
}: {
  shop: Shop | null;
  userEmail: string | null;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("orders");

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="border-b border-neutral-800 bg-neutral-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-lg font-bold text-neutral-100">
              {shop?.name ?? "Admin"} Dashboard
            </h1>
            {userEmail ? (
              <p className="text-xs text-neutral-500">{userEmail}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800"
          >
            Sign Out
          </button>
        </div>
      </header>

      {!shop ? (
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p className="rounded-lg border border-amber-900/50 bg-amber-950/30 p-4 text-amber-400">
            কোনো active shop পাওয়া যায়নি। Supabase-এ `shops` টেবিলে একটি
            রেকর্ড যোগ করুন (is_active = true)।
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl px-4 py-6">
          <div className="mb-6 flex gap-2 border-b border-neutral-800">
            {(
              [
                { key: "orders", label: "Orders" },
                { key: "menu", label: "Menu Management" },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={cn(
                  "border-b-2 px-4 py-2 text-sm font-medium transition-colors",
                  tab === t.key
                    ? "border-amber-500 text-amber-500"
                    : "border-transparent text-neutral-400 hover:text-neutral-200",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === "orders" ? (
            <AdminOrdersTable shopId={shop.id} />
          ) : (
            <AdminMenuTable shopId={shop.id} />
          )}
        </div>
      )}
    </div>
  );
}
