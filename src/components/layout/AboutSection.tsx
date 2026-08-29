import Image from "next/image";
import type { Shop } from "@/lib/database.types";

export function AboutSection({ shop }: { shop: Shop | null }) {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-14">
      <div className="grid items-center gap-8 sm:grid-cols-2 sm:gap-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl shadow-black/40">
          <Image
            src="https://images.unsplash.com/photo-1670819916552-67698b1c86ae?q=80&auto=format&fit=crop"
            alt="আমাদের রান্নাঘরে রান্নার দৃশ্য"
            fill
            sizes="(max-width: 640px) 100vw, 480px"
            className="object-cover"
          />
          {/* Thin amber ring ties the photo back to the brand accent
              without adding another loud visual element. */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-amber-500/20" />
        </div>

        <div className="text-center sm:text-left">
          <h2 className="mb-4 text-2xl font-bold text-neutral-100">
            আমাদের গল্প
          </h2>
          <p className="leading-relaxed text-neutral-400">
            {shop?.name ?? "আমাদের রেস্টুরেন্ট"} শুরু হয়েছিল একটি ছোট্ট
            পারিবারিক রান্নাঘর থেকে, যেখানে দাদীর হাতের রেসিপি আজও অক্ষত
            রয়েছে। প্রতিদিন সকালে বাজার থেকে তাজা উপকরণ সংগ্রহ করে,
            ভালোবাসা দিয়ে রান্না করি প্রতিটি পদ — যাতে প্রতিটি প্লেটে থাকে
            ঘরের আসল স্বাদ।
          </p>
        </div>
      </div>
    </section>
  );
}
