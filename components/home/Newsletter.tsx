"use client";

import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-yellow-500 py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-black text-yellow-500">
          <Mail size={30} />
        </div>

        <h2 className="text-4xl font-black text-black">
          Stay Updated
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-black/80">
          Be the first to know about new arrivals, football kits,
          exclusive offers and limited collections.
        </p>

        <form className="mx-auto mt-10 flex max-w-xl flex-col gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-full border-0 px-6 py-4 text-black outline-none"
          />

          <button
            type="submit"
            className="rounded-full bg-black px-8 py-4 font-bold text-white transition hover:bg-zinc-900"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}