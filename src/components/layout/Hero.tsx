import Image from "next/image";
import type { Shop } from "@/lib/database.types";

export function Hero({ shop }: { shop: Shop | null }) {
  return (
    <section className="relative overflow-hidden px-4 py-28 text-center sm:py-36">
      <Image
        src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&auto=format&fit=crop"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-ken-burns object-cover"
      />

      {/* Brick-and-turmeric overlay (brand tones, not flat black). Kept
          moderate rather than heavy — the source photo is already
          dark/moody on its own (dark navy fabric, deep shadows), so a
          strong wash on top crushes it to near-black. Legibility leans on
          font weight + text-shadow below, not on flattening the photo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-amber-950/35 to-black/70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(198,137,47,0.4), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl">
        <p className="mb-3 inline-block border-b border-brass-500/50 pb-1 text-sm font-medium text-amber-400">
          {shop?.name ?? "Dhaka Delights Cafe"}
        </p>
        <h1
          className="font-display text-4xl font-bold text-neutral-50 sm:text-5xl md:text-6xl"
          style={{ textShadow: "0 4px 24px rgba(0, 0, 0, 0.6)" }}
        >
          ঘরে বসেই অর্ডার করুন প্রিয় খাবার
        </h1>
        <p
          className="mt-4 text-lg text-neutral-200"
          style={{ textShadow: "0 2px 12px rgba(0, 0, 0, 0.6)" }}
        >
          ডেলিভারিতে ক্যাশ পেমেন্ট
        </p>
        <a
          href="#menu"
          className="cta-glow-pulse mt-8 inline-block rounded-full bg-amber-500 px-8 py-3 font-semibold text-neutral-950 transition-colors hover:bg-amber-400"
        >
          Order Now
        </a>
      </div>
    </section>
  );
}
