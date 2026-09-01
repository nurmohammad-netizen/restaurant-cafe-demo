import { formatTaka } from "@/lib/utils";
import type { OrderItem } from "@/lib/database.types";

type OrderWhatsAppMessageInput = {
  shopName: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
};

// Builds the customer-facing order slip sent to the shop's WhatsApp. Kept
// separate from OrderForm so the message format can be unit-tested/reused
// without a component. Order IDs are client-generated UUIDs (see
// OrderForm's crypto.randomUUID() comment) — too long to read out over
// WhatsApp, so this shows the same short form already used on the
// on-screen success receipt.
export function buildOrderWhatsAppMessage({
  shopName,
  orderId,
  customerName,
  customerPhone,
  customerAddress,
  items,
  total,
}: OrderWhatsAppMessageInput): string {
  const itemLines = items
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} (${item.quantity}x) - ${formatTaka(item.price * item.quantity)}`,
    )
    .join("\n");

  return (
    `*🍔 নতুন অর্ডার নিশ্চিত হয়েছে (${shopName}) 🍔*\n\n` +
    `*🆔 অর্ডার আইডি:* #${orderId.slice(0, 8).toUpperCase()}\n` +
    `*👤 কাস্টমার:* ${customerName}\n` +
    `*📞 ফোন নম্বর:* ${customerPhone}\n` +
    `*📍 ডেলিভারি ঠিকানা:* ${customerAddress}\n\n` +
    `*🛒 অর্ডারের বিবরণ:*\n${itemLines}\n\n` +
    `*💰 মোট বিল:* ${formatTaka(total)}\n\n` +
    `_অর্ডারটি সফলভাবে সংরক্ষণ করা হয়েছে। ডেলিভারিতে ক্যাশ পেমেন্ট (COD) প্রযোজ্য।_`
  );
}

// null when the shop has no WhatsApp number on file — callers should skip
// opening WhatsApp rather than send someone to a broken wa.me link.
export function buildWhatsAppOrderUrl(
  whatsappNumber: string | null,
  message: string,
): string | null {
  const digitsOnly = whatsappNumber?.replace(/[^0-9]/g, "");
  if (!digitsOnly) return null;
  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}
