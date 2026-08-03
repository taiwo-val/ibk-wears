"use client";

import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/cart/AddToCartButton";

type Product = {
  id: string;
  name: string;
  description?: string | null;
  category: string;
  price: number;
  image?: string | null;
  stock?: number | null;
  in_stock?: boolean | null;
  featured?: boolean | null;
};

type Props = {
  product: Product | null;
  onClose: () => void;
};

export default function QuickViewModal({
  product,
  onClose,
}: Props) {
  if (!product) return null;

  const stock = Number(product.stock ?? 0);

  const isInStock =
    stock > 0 &&
    product.in_stock === true;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-6">

      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-zinc-900">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 rounded-full bg-red-600 px-4 py-2 font-bold text-white"
        >
          ✕
        </button>

        <div className="grid lg:grid-cols-2">

          <div className="relative h-[550px] bg-zinc-800">

            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-zinc-500">
                No Image
              </div>
            )}

          </div>

          <div className="p-10">

            {product.featured && (
              <span className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-black">
                ⭐ Featured
              </span>
            )}

            <p className="mt-6 uppercase tracking-[0.3em] text-yellow-500">
              {product.category}
            </p>

            <h2 className="mt-4 text-5xl font-black">
              {product.name}
            </h2>

            <h3 className="mt-6 text-4xl font-bold text-yellow-500">
              ₦{Number(product.price).toLocaleString()}
            </h3>

            <p className="mt-8 leading-8 text-zinc-400">
              {product.description}
            </p>

            <div className="mt-8">

              {isInStock ? (
                <p className="font-bold text-green-500">
                  ✅ {stock} in stock
                </p>
              ) : (
                <p className="font-bold text-red-500">
                  ❌ Out of Stock
                </p>
              )}

            </div>

            <div className="mt-10 space-y-4">

              <AddToCartButton
                product={{
                  id: product.id,
                  name: product.name,
                  image: product.image || "",
                  price: Number(product.price),
                  stock,
                }}
                disabled={!isInStock}
              />

              <a
                href={`https://wa.me/08067942779?text=${encodeURIComponent(
                  `Hello IBK WEARS, I want to order ${product.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-green-500 py-4 text-center font-bold text-green-500 hover:bg-green-500 hover:text-black"
              >
                📱 Order on WhatsApp
              </a>

              <Link
                href={`/shop/${product.id}`}
                onClick={onClose}
                className="block rounded-xl bg-yellow-500 py-4 text-center font-bold text-black"
              >
                View Full Product
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}