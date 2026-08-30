const STATS = [
  { value: "৫০০+", label: "সম্পন্ন অর্ডার" },
  { value: "৪.৮★", label: "গড় রেটিং" },
  { value: "৩+", label: "বছর ঢাকায় সেবা" },
];

export function StatsBar() {
  return (
    <section className="bg-gradient-to-r from-amber-950/30 via-neutral-900 to-amber-950/30 px-4 py-10">
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4 text-center">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-3xl font-extrabold text-amber-500 sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
