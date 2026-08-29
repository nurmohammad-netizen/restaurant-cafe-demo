import type { Shop } from "@/lib/database.types";

// Subtle woven-jute texture (coarse diagonal crosshatch), very low opacity
// so it reads as texture, not pattern. Tiled via CSS, not a photo.
const JUTE_TEXTURE = `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'>
  <path d='M0 0 L16 16 M16 0 L0 16' stroke='#78716c' stroke-width='0.6' opacity='0.18'/>
</svg>`;

export function Footer({ shop }: { shop: Shop | null }) {
  const whatsapp = shop?.whatsapp_number?.replace(/[^0-9]/g, "");

  return (
    <footer
      className="border-t border-neutral-800 bg-neutral-950 px-4 py-10 text-neutral-400"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(JUTE_TEXTURE)}")`,
      }}
    >
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <div>
          <h3 className="text-lg font-bold text-neutral-100">
            {shop?.name ?? "আমাদের রেস্টুরেন্ট"}
          </h3>
          {shop?.address ? <p className="mt-1 text-sm">{shop.address}</p> : null}
          {shop?.phone ? (
            <p className="mt-1 text-sm">
              <a href={`tel:${shop.phone}`} className="hover:text-amber-500">
                {shop.phone}
              </a>
            </p>
          ) : null}
        </div>

        {whatsapp ? (
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-500"
          >
            💬 WhatsApp-এ যোগাযোগ করুন
          </a>
        ) : null}

        <p className="text-xs text-neutral-600">
          Built with Next.js, Tailwind CSS & Claude Code
        </p>

        {/* Required attribution for the Mishti Doi photo (CC BY-SA 4.0) —
            every other image on this site is attribution-free, this is the
            one exception. */}
        <p className="text-xs text-neutral-700">
          মিষ্টি দইয়ের ছবি: Masum-al-Hasan Rocky ·{" "}
          <a
            href="https://commons.wikimedia.org/wiki/File:Bogurar_doi.jpg"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-amber-500"
          >
            Wikimedia Commons
          </a>{" "}
          (CC BY-SA 4.0)
        </p>
      </div>
    </footer>
  );
}
