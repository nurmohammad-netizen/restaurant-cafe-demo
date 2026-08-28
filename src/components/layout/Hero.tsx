import Image from "next/image";
import type { Shop } from "@/lib/database.types";

export function Hero({ shop }: { shop: Shop | null }) {
  return (
    <section className="relative overflow-hidden px-4 py-24 text-center sm:py-32">
      <Image
        src="https://images.unsplash.com/photo-1642972420043-4736c570a716?q=80&auto=format&fit=crop"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Dark gradient overlay — keeps headline/CTA readable over the photo
          while still showing enough of the dish to be appetizing. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/90 via-neutral-950/75 to-neutral-950/90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(245,158,11,0.35), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-500">
          Cash on Delivery
        </p>
        <h1 className="text-4xl font-extrabold text-neutral-50 drop-shadow-sm sm:text-5xl">
          {shop?.name ?? "Dhaka Delights Cafe"}
        </h1>
        <p className="mt-4 text-lg text-neutral-200 drop-shadow-sm">
          ঘরে বসেই অর্ডার করুন প্রিয় খাবার — ডেলিভারিতে ক্যাশ পেমেন্ট
        </p>
        <a
          href="#menu"
          className="mt-8 inline-block rounded-full bg-amber-500 px-8 py-3 font-semibold text-neutral-950 shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-400"
        >
          Order Now
        </a>
      </div>
    </section>
  );
}
