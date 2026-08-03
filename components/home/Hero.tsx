"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-black pt-20">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero/hero.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

      {/* Decorative Blur */}
      <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-sm font-semibold uppercase tracking-[0.5em] text-yellow-500"
          >
            Premium Fashion Store
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-black leading-tight text-white md:text-7xl"
          >
            Dress Better.
            <br />
            Play Better.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-8 max-w-xl text-lg leading-8 text-gray-300"
          >
            Premium Jerseys, Football Boots, Watches, Sneakers,
            Casual Wear and Accessories for Men.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-10 flex flex-wrap gap-5"
          >
            <Link
              href="/shop"
              className="inline-flex items-center rounded-full bg-yellow-500 px-8 py-4 font-semibold text-black transition hover:bg-yellow-400"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <a
              href="https://wa.me/08067942779"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-yellow-500 px-8 py-4 font-semibold text-white transition hover:bg-yellow-500 hover:text-black"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Order on WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-16 grid grid-cols-3 gap-8"
          >
            <div>
              <h3 className="text-3xl font-black text-yellow-500">500+</h3>
              <p className="mt-2 text-sm text-gray-400">Premium Products</p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-yellow-500">100%</h3>
              <p className="mt-2 text-sm text-gray-400">Authentic Quality</p>
            </div>

            <div>
              <h3 className="text-3xl font-black text-yellow-500">24/7</h3>
              <p className="mt-2 text-sm text-gray-400">WhatsApp Support</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="h-10 w-6 rounded-full border border-yellow-500 flex justify-center">
          <div className="mt-2 h-2 w-2 animate-bounce rounded-full bg-yellow-500" />
        </div>
      </div>
    </section>
  );
}