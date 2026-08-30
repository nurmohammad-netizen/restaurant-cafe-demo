import type { Shop } from "@/lib/database.types";

export function LocationSection({ shop }: { shop: Shop | null }) {
  const address = shop?.address ?? "Dhaka, Bangladesh";
  const mapQuery = encodeURIComponent(address);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      <h2 className="font-display mb-6 text-center text-2xl font-bold text-neutral-100">
        আমাদের অবস্থান
      </h2>
      <div className="overflow-hidden rounded-xl border border-neutral-800">
        <iframe
          title="আমাদের অবস্থান — ম্যাপ"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          className="h-64 w-full border-0 sm:h-80"
          style={{ filter: "invert(90%) hue-rotate(180deg)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="flex flex-wrap items-center justify-between gap-3 bg-neutral-900 p-4">
          <p className="text-sm text-neutral-300">
            <span aria-hidden>📍</span> {address}
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-amber-500 px-4 py-1.5 text-xs font-semibold text-neutral-950 transition-colors hover:bg-amber-400"
          >
            দিকনির্দেশ পান
          </a>
        </div>
      </div>
    </section>
  );
}
