const POINTS = [
  {
    icon: "💰",
    text: "কোনো ডেলিভারি অ্যাপ কমিশন নেই — পুরো মূল্যটাই যায় ভালো খাবার তৈরিতে",
  },
  {
    icon: "📞",
    text: "সরাসরি আমাদের সাথে যোগাযোগ, দ্রুত সাড়া ও সমাধান",
  },
  {
    icon: "🤝",
    text: "সরাসরি অর্ডার করে স্থানীয় ব্যবসাকে সহায়তা করুন",
  },
];

export function WhyOrderDirect() {
  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-12">
      <h2 className="mb-6 text-center text-2xl font-bold text-neutral-100">
        কেন সরাসরি অর্ডার করবেন?
      </h2>
      <div className="space-y-3">
        {POINTS.map((point) => (
          <div
            key={point.text}
            className="flex items-start gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-4"
          >
            <span className="text-xl" aria-hidden>
              {point.icon}
            </span>
            <p className="text-sm leading-relaxed text-neutral-300">
              {point.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
