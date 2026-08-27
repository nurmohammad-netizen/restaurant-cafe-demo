"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { menuItemFormSchema } from "@/lib/validations";
import type { MenuCategory, MenuItem } from "@/lib/database.types";

type Props = {
  shopId: string;
  categories: MenuCategory[];
  item: MenuItem | null;
  onClose: () => void;
  onSaved: () => void;
};

export function MenuItemFormModal({
  shopId,
  categories,
  item,
  onClose,
  onSaved,
}: Props) {
  const [name, setName] = useState(item?.name ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [price, setPrice] = useState(item ? String(item.price) : "");
  const [categoryId, setCategoryId] = useState<string | null>(
    item?.category_id ?? categories[0]?.id ?? null,
  );
  const [isAvailable, setIsAvailable] = useState(item?.is_available ?? true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    item?.image_url ?? null,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaveError(null);

    const result = menuItemFormSchema.safeParse({
      name,
      description,
      price,
      category_id: categoryId,
      is_available: isAvailable,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSaving(true);

    const supabase = createClient();

    let finalImageUrl = item?.image_url ?? null;
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `${shopId}/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("menu-images")
        .upload(path, imageFile, { upsert: true });

      if (uploadError) {
        setSaveError("ছবি আপলোড করা যায়নি।");
        setSaving(false);
        return;
      }

      finalImageUrl = supabase.storage.from("menu-images").getPublicUrl(path)
        .data.publicUrl;
    }

    const payload = {
      shop_id: shopId,
      name: result.data.name,
      description: result.data.description || null,
      price: result.data.price,
      category_id: result.data.category_id,
      is_available: result.data.is_available,
      image_url: finalImageUrl,
    };

    const { error } = item
      ? await supabase.from("menu_items").update(payload).eq("id", item.id)
      : await supabase.from("menu_items").insert(payload);

    setSaving(false);

    if (error) {
      setSaveError("সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    onSaved();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900 p-6">
        <h3 className="mb-4 text-lg font-bold text-neutral-100">
          {item ? "আইটেম এডিট করুন" : "নতুন আইটেম যোগ করুন"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">
              নাম *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:border-amber-500"
            />
            {errors.name ? (
              <p className="mt-1 text-xs text-red-400">{errors.name}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">
              বিবরণ
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-neutral-300">
                মূল্য (৳) *
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputMode="decimal"
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:border-amber-500"
              />
              {errors.price ? (
                <p className="mt-1 text-xs text-red-400">{errors.price}</p>
              ) : null}
            </div>

            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-neutral-300">
                ক্যাটাগরি
              </label>
              <select
                value={categoryId ?? ""}
                onChange={(e) => setCategoryId(e.target.value || null)}
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:border-amber-500"
              >
                <option value="">— কোনোটি না —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-300">
              ছবি
            </label>
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- transient local/object URL preview, not worth Next/Image config
              <img
                src={previewUrl}
                alt="Preview"
                className="mb-2 h-20 w-20 rounded-lg object-cover"
              />
            ) : null}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setImageFile(file);
                setPreviewUrl(file ? URL.createObjectURL(file) : item?.image_url ?? null);
              }}
              className="w-full text-sm text-neutral-300 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-800 file:px-3 file:py-1.5 file:text-neutral-200"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-neutral-300">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="h-4 w-4 rounded border-neutral-700 bg-neutral-800"
            />
            পাওয়া যাচ্ছে (customers can order this)
          </label>

          {saveError ? (
            <p className="text-sm text-red-400">{saveError}</p>
          ) : null}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-neutral-700 py-2 text-sm font-medium text-neutral-300 hover:bg-neutral-800"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-amber-500 py-2 text-sm font-semibold text-neutral-950 hover:bg-amber-400 disabled:opacity-60"
            >
              {saving ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
