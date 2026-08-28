import type { Shop } from "@/lib/database.types";

export function AboutSection({ shop }: { shop: Shop | null }) {
  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-12 text-center">
      <h2 className="mb-4 text-2xl font-bold text-neutral-100">আমাদের গল্প</h2>
      <p className="leading-relaxed text-neutral-400">
        {shop?.name ?? "আমাদের রেস্টুরেন্ট"} শুরু হয়েছিল একটি ছোট্ট পারিবারিক
        রান্নাঘর থেকে, যেখানে দাদীর হাতের রেসিপি আজও অক্ষত রয়েছে। প্রতিদিন
        সকালে বাজার থেকে তাজা উপকরণ সংগ্রহ করে, ভালোবাসা দিয়ে রান্না করি
        প্রতিটি পদ — যাতে প্রতিটি প্লেটে থাকে ঘরের আসল স্বাদ।
      </p>
    </section>
  );
}
