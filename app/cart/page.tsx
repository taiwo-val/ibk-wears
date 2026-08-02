"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black pt-32 pb-20 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">

            <h1 className="text-5xl font-black">
              Your Cart
            </h1>

            <p className="mt-8 text-zinc-400">
              Your cart is empty.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black hover:bg-yellow-400"
            >
              Continue Shopping
            </Link>

          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black pt-32 pb-20 text-white">
        <div className="mx-auto max-w-7xl px-6">

          <h1 className="mb-12 text-5xl font-black">
            Shopping Cart
          </h1>

          <div className="space-y-6">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center gap-6 rounded-2xl bg-zinc-900 p-6 md:flex-row"
              >

                <div className="relative h-36 w-36 overflow-hidden rounded-xl bg-zinc-800">

                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-zinc-500">
                      No Image
                    </div>
                  )}

                </div>

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="mt-2 text-yellow-500">
                    ₦{item.price.toLocaleString()}
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="rounded bg-zinc-700 px-4 py-2 hover:bg-zinc-600"
                  >
                    −
                  </button>

                  <span className="text-xl font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="rounded bg-zinc-700 px-4 py-2 hover:bg-zinc-600"
                  >
                    +
                  </button>

                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-xl bg-red-600 px-6 py-3 font-bold hover:bg-red-500"
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

          <div className="mt-12 rounded-2xl bg-zinc-900 p-8">

            <h2 className="text-3xl font-black">
              Total: ₦{total.toLocaleString()}
            </h2>

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={clearCart}
                className="rounded-xl bg-red-600 px-8 py-4 font-bold hover:bg-red-500"
              >
                Clear Cart
              </button>

              <Link
                href="/checkout"
                className="rounded-xl bg-green-600 px-8 py-4 font-bold text-white hover:bg-green-500"
              >
                Proceed to Checkout
              </Link>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}