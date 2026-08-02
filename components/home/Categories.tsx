"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shirt,
  Trophy,
  Watch,
  ShoppingBag,
  Backpack,
  Footprints,
} from "lucide-react";

const categories = [
  {
    title: "Jerseys",
    icon: Trophy,
    image: "/images/categories/jerseys.jpg",
    href: "/shop?category=jerseys",
  },
  {
    title: "Football Boots",
    icon: Footprints,
    image: "/images/categories/boots.jpg",
    href: "/shop?category=boots",
  },
  {
    title: "Clothing",
    icon: Shirt,
    image: "/images/categories/clothing.jpg",
    href: "/shop?category=clothing",
  },
  {
    title: "Watches",
    icon: Watch,
    image: "/images/categories/watches.jpg",
    href: "/shop?category=watches",
  },
  {
    title: "Bags",
    icon: Backpack,
    image: "/images/categories/bags.jpg",
    href: "/shop?category=bags",
  },
  {
    title: "Accessories",
    icon: ShoppingBag,
    image: "/images/categories/accessories.jpg",
    href: "/shop?category=accessories",
  },
];

export default function Categories() {
  return (
    <section className="bg-[#050505] py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 text-center">
          <p className="mb-3 uppercase tracking-[0.4em] text-yellow-500">
            Shop Collection
          </p>

          <h2 className="text-4xl font-black text-white md:text-5xl">
            Shop By Category
          </h2>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                <Link
                  href={category.href}
                  className="group relative block overflow-hidden rounded-3xl"
                >
                  <div
                    className="h-80 bg-cover bg-center duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${category.image})`,
                    }}
                  />

                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/45 transition" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center">

                    <div className="mb-5 rounded-full bg-yellow-500 p-4 text-black">
                      <Icon size={32} />
                    </div>

                    <h3 className="text-3xl font-bold text-white">
                      {category.title}
                    </h3>

                  </div>

                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}