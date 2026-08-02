"use client";

import { useCart } from "@/context/CartContext";

type Props = {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    stock: number;
  };
  disabled?: boolean;
};

export default function AddToCartButton({
  product,
  disabled = false,
}: Props) {
  const { addToCart } = useCart();

  function handleClick() {
    if (disabled || product.stock <= 0) {
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: Number(product.price),
      quantity: 1,
    });

    alert("✅ Added to cart");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || product.stock <= 0}
      className={`rounded-xl px-8 py-4 font-bold transition ${
        disabled || product.stock <= 0
          ? "cursor-not-allowed bg-zinc-700 text-zinc-400"
          : "bg-yellow-500 text-black hover:bg-yellow-400"
      }`}
    >
      {disabled || product.stock <= 0
        ? "❌ Out of Stock"
        : "🛒 Add to Cart"}
    </button>
  );
}