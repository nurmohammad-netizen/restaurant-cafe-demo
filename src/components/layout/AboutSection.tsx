import Image from "next/image";

export function AboutSection() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-14">
      <div className="grid items-center gap-8 sm:grid-cols-2 sm:gap-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl shadow-black/40">
          <Image
            src="https://images.unsplash.com/photo-1670819916552-67698b1c86ae?q=80&auto=format&fit=crop"
            alt="আমাদের রান্নাঘরে রান্নার দৃশ্য"
            fill
            sizes="(max-width: 640px) 100vw, 480px"
            className="object-cover"
          />
          {/* Thin amber ring ties the photo back to the brand accent
              without adding another loud visual element. */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-amber-500/20" />
        </div>

        <div className="text-center sm:text-left">
          <h2 className="mb-4 text-2xl font-bold text-neutral-100">
            আমাদের গল্প
          </h2>
          <p className="leading-relaxed text-neutral-300">
            Dhaka Delights Cafe-র যাত্রা শুরু হয়েছিল একটি ছোট্ট পারিবারিক
            রান্নাঘর থেকে, যেখানে আমাদের দাদীর হাতের রেসিপি আজও অক্ষত রয়েছে
            প্রতিটি পদে। প্রতিদিন ভোরে বাজার থেকে সংগ্রহ করা তাজা উপকরণ, আর
            প্রজন্ম ধরে চলে আসা রান্নার কৌশল — এই দুইয়ের মিলনেই তৈরি হয়
            আমাদের প্রতিটি খাবার। আমরা বিশ্বাস করি, ভালো খাবার মানেই শুধু
            পেট ভরানো না, বরং একটা মুহূর্ত তৈরি করা — পরিবারের সাথে,
            বন্ধুদের সাথে ভাগ করে নেওয়ার মতো একটা স্মৃতি। আজ ঢাকার হাজারো
            পরিবারের প্রতিদিনের খাবারের অংশ হতে পেরে আমরা গর্বিত, আর প্রতিটি
            অর্ডারেই সেই একই যত্ন অক্ষুণ্ণ রাখার চেষ্টা করি।
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-500">
            Dhaka Delights Cafe began in a small family kitchen, where our
            grandmother&rsquo;s recipes still live on in every dish we
            serve. Fresh ingredients gathered each dawn from the local
            market, combined with cooking techniques passed down through
            generations — that&rsquo;s the heart of everything we make. We
            believe good food isn&rsquo;t just about filling a plate;
            it&rsquo;s about creating a moment worth sharing, with family,
            with friends. Today, we&rsquo;re proud to be part of thousands
            of Dhaka families&rsquo; everyday meals, and we carry that same
            care into every single order.
          </p>
        </div>
      </div>
    </section>
  );
}
