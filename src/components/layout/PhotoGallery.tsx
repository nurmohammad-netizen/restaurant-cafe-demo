import Image from "next/image";

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1709548145082-04d0cde481d4?w=800&q=80&auto=format&fit=crop",
    alt: "আমাদের রেস্টুরেন্টের ভেতরের পরিবেশ",
  },
  {
    src: "https://images.unsplash.com/photo-1759301495161-31027c795358?w=800&q=80&auto=format&fit=crop",
    alt: "আরামদায়ক বসার জায়গা",
  },
  {
    src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80&auto=format&fit=crop",
    alt: "আমাদের রান্নাঘরে প্রস্তুতি",
  },
];

export function PhotoGallery() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      <h2 className="font-display mb-8 text-center text-2xl font-bold text-neutral-100">
        আমাদের পরিবেশ
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {GALLERY.map((photo) => (
          <div
            key={photo.src}
            className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-900"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 33vw, 240px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
