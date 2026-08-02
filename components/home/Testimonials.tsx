"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Daniel A.",
    review:
      "The jersey quality exceeded my expectations. Fast delivery and excellent customer service.",
  },
  {
    name: "Michael O.",
    review:
      "I ordered football boots and they were exactly as advertised. I'll definitely order again.",
  },
  {
    name: "Samuel T.",
    review:
      "IBK WEARS has become my go-to store for football kits and men's fashion.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 uppercase tracking-[0.4em] text-yellow-500">
            Testimonials
          </p>

          <h2 className="text-5xl font-black text-white">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8"
            >
              <div className="mb-6 flex gap-1 text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="leading-8 text-gray-300">
                "{item.review}"
              </p>

              <h3 className="mt-8 text-xl font-bold text-white">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}