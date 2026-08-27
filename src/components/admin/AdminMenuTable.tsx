"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MenuItemFormModal } from "@/components/admin/MenuItemFormModal";
import { formatTaka, cn } from "@/lib/utils";
import type { MenuCategory, MenuItem } from "@/lib/database.types";

export function AdminMenuTable({ shopId }: { shopId: string }) {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function loadData() {
    setLoading(true);
    const supabase = createClient();
    const [{ data: categoryData }, { data: itemData }] = await Promise.all([
      supabase
        .from("menu_categories")
        .select("*")
        .eq("shop_id", shopId)
        .order("display_order")
        .returns<MenuCategory[]>(),
      supabase
        .from("menu_items")
        .select("*")
        .eq("shop_id", shopId)
        .order("name")
        .returns<MenuItem[]>(),
    ]);
    setCategories(categoryData ?? []);
    setItems(itemData ?? []);
    setLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shopId]);

  function openAddModal() {
    setEditingItem(null);
    setShowModal(true);
  }

  function openEditModal(item: MenuItem) {
    setEditingItem(item);
    setShowModal(true);
  }

  async function handleToggleAvailability(item: MenuItem) {
    const supabase = createClient();
    await supabase
      .from("menu_items")
      .update({ is_available: !item.is_available })
      .eq("id", item.id);
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, is_available: !i.is_available } : i,
      ),
    );
  }

  async function handleDelete(item: MenuItem) {
    if (!window.confirm(`"${item.name}" ডিলিট করতে চান?`)) return;
    const supabase = createClient();
    await supabase.from("menu_items").delete().eq("id", item.id);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  function categoryName(categoryId: string | null) {
    return categories.find((c) => c.id === categoryId)?.name ?? "—";
  }

  if (loading) {
    return <p className="text-neutral-500">লোড হচ্ছে...</p>;
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={openAddModal}
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-neutral-950 hover:bg-amber-400"
        >
          + নতুন আইটেম
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-neutral-500">কোনো মেনু আইটেম নেই।</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-neutral-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-900 text-neutral-400">
              <tr>
                <th className="px-4 py-3 font-medium">নাম</th>
                <th className="px-4 py-3 font-medium">ক্যাটাগরি</th>
                <th className="px-4 py-3 font-medium">মূল্য</th>
                <th className="px-4 py-3 font-medium">স্ট্যাটাস</th>
                <th className="px-4 py-3 font-medium">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800">
              {items.map((item) => (
                <tr key={item.id} className="bg-neutral-950">
                  <td className="px-4 py-3 text-neutral-100">{item.name}</td>
                  <td className="px-4 py-3 text-neutral-400">
                    {categoryName(item.category_id)}
                  </td>
                  <td className="px-4 py-3 text-neutral-300">
                    {formatTaka(item.price)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => handleToggleAvailability(item)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium",
                        item.is_available
                          ? "bg-green-900 text-green-300"
                          : "bg-neutral-800 text-neutral-500",
                      )}
                    >
                      {item.is_available ? "Available" : "Unavailable"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="text-amber-500 hover:text-amber-400"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal ? (
        <MenuItemFormModal
          shopId={shopId}
          categories={categories}
          item={editingItem}
          onClose={() => setShowModal(false)}
          onSaved={() => {
            setShowModal(false);
            loadData();
          }}
        />
      ) : null}
    </div>
  );
}
