import Image from "next/image";

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1613274554329-70f997f5789f?w=800&q=80&auto=format&fit=crop",
    alt: "আমাদের রেস্টুরেন্টের বসার জায়গা",
  },
  {
    src: "https://images.unsplash.com/photo-1526069631228-723c945bea6b?w=800&q=80&auto=format&fit=crop",
    alt: "আরামদায়ক পরিবেশ",
  },
  {
    src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80&auto=format&fit=crop",
    alt: "আমাদের রান্নাঘরে প্রস্তুতি",
  },
];

export function PhotoGallery() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      <h2 className="mb-8 text-center text-2xl font-bold text-neutral-100">
        আমাদের পরিবেশ
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {GALLERY.map((photo) => (
          <div
            key={photo.src}
            className="relative aspect-square overflow-hidden rounded-xl bg-neutral-900"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 33vw, 240px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
