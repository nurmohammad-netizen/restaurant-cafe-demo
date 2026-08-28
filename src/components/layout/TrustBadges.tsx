const BADGES = [
  { icon: "👨‍👩‍👧‍👦", label: "৫০০+ সন্তুষ্ট গ্রাহক" },
  { icon: "🥗", label: "প্রতিদিন তাজা উপকরণ" },
  { icon: "🛵", label: "৩০ মিনিটে ডেলিভারি" },
  { icon: "⭐", label: "৪.৮ গড় রেটিং" },
];

export function TrustBadges() {
  return (
    <section className="border-y border-neutral-800 bg-neutral-900/50 px-4 py-8">
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
        {BADGES.map((badge) => (
          <div
            key={badge.label}
            className="flex flex-col items-center gap-1.5 text-center"
          >
            <span className="text-2xl" aria-hidden>
              {badge.icon}
            </span>
            <span className="text-sm font-medium text-neutral-300">
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
