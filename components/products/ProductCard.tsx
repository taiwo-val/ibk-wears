"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
}: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 transition duration-300 hover:border-yellow-500">
      <Link href={`/shop/${id}`}>
        <div className="relative h-80 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="space-y-3 p-6">
        <span className="text-sm uppercase tracking-widest text-yellow-500">
          {category}
        </span>

        <h3 className="text-xl font-bold text-white">
          {name}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-black text-white">
            ₦{price.toLocaleString()}
          </p>

          <button className="rounded-full bg-yellow-500 p-3 text-black transition hover:scale-110">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}