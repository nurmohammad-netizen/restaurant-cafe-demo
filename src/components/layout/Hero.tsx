import type { Shop } from "@/lib/database.types";

export function Hero({ shop }: { shop: Shop | null }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950 px-4 py-20 text-center sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(245,158,11,0.35), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-2xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-amber-500">
          Cash on Delivery
        </p>
        <h1 className="text-4xl font-extrabold text-neutral-50 sm:text-5xl">
          {shop?.name ?? "Dhaka Delights Cafe"}
        </h1>
        <p className="mt-4 text-lg text-neutral-400">
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
