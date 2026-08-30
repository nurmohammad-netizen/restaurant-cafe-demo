const REVIEWS = [
  {
    name: "রাহুল আহমেদ",
    rating: 5,
    text: "বিরিয়ানিটা একদম পারফেক্ট ছিল, ডেলিভারিও অনেক দ্রুত পেয়েছি। আবার অর্ডার করব ইনশাআল্লাহ!",
  },
  {
    name: "সাদিয়া ইসলাম",
    rating: 5,
    text: "খাবারের মান খুবই ভালো, দামও সাশ্রয়ী। বার্গারটা ছিল অসাধারণ, বাচ্চারাও খুব পছন্দ করেছে।",
  },
  {
    name: "করিম উদ্দিন",
    rating: 4,
    text: "প্যাকেজিং সুন্দর ছিল, খাবার গরম অবস্থায় পেয়েছি। ক্যাশ অন ডেলিভারি হওয়ায় অর্ডার করা সহজ হয়েছে।",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-12">
      <h2 className="font-display mb-1 text-center text-2xl font-bold text-neutral-100">
        গ্রাহকদের মতামত
      </h2>
      <p className="mb-8 text-center text-xs text-neutral-600">
        নমুনা রিভিউ · ডেমো কন্টেন্ট
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {REVIEWS.map((review) => (
          <div
            key={review.name}
            className="rounded-xl border border-neutral-800 bg-neutral-900 p-4"
          >
            <div className="mb-2 text-amber-500" aria-hidden>
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
            <p className="mb-3 text-sm leading-relaxed text-neutral-300">
              &ldquo;{review.text}&rdquo;
            </p>
            <p className="text-sm font-medium text-neutral-100">
              — {review.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
