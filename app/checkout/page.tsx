"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, clearCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setOrderError("");

    if (cart.length === 0) {
      setOrderError("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: customerName,
          phone,
          address,
          items: cart,
        }),
      });

      const result = await response.json();

      console.log("ORDER API RESPONSE:", result);

      if (!response.ok) {
        const message =
          result.error ||
          "The order could not be placed.";

        setOrderError(message);

        return;
      }

      const orderItems = cart
        .map(
          (item) =>
            `${item.name} x${item.quantity}`
        )
        .join("\n");

      const orderTotal = Number(
        result.order?.total ?? total
      );

      const orderId =
        result.order?.id ?? "N/A";

      clearCart();

      const message = encodeURIComponent(
        `Hello IBK WEARS!

My Name: ${customerName}

Phone: ${phone}

Address: ${address}

Order Items:
${orderItems}

Order Total: ₦${orderTotal.toLocaleString()}

Order ID: ${orderId}

I have just placed an order on your website.`
      );

      window.location.href =
        `https://wa.me/08067942779?text=${message}`;
    } catch (error) {
      console.error(
        "CHECKOUT ERROR:",
        error
      );

      setOrderError(
        error instanceof Error
          ? error.message
          : "Something went wrong while placing your order."
      );
    } finally {
      setLoading(false);
    }
  }

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-black px-6 pt-32 pb-20 text-white">
          <div className="mx-auto max-w-3xl text-center">

            <h1 className="text-5xl font-black">
              Checkout
            </h1>

            <p className="mt-8 text-zinc-400">
              Your cart is empty.
            </p>

            <button
              onClick={() => router.push("/shop")}
              className="mt-8 rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black hover:bg-yellow-400"
            >
              Continue Shopping
            </button>

          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 pt-32 pb-20 text-white">
        <div className="mx-auto max-w-4xl">

          <h1 className="mb-10 text-5xl font-black">
            Checkout
          </h1>

          {orderError && (
            <div className="mb-8 rounded-2xl border border-red-500 bg-red-950/40 p-6">
              <h2 className="text-lg font-bold text-red-400">
                Unable to place order
              </h2>

              <p className="mt-2 text-red-200">
                {orderError}
              </p>
            </div>
          )}

          <div className="mb-8 rounded-2xl bg-zinc-900 p-6">

            <h2 className="mb-6 text-2xl font-bold">
              Your Order
            </h2>

            <div className="space-y-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-zinc-800 pb-4"
                >
                  <div>
                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-sm text-zinc-400">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold text-yellow-500">
                    ₦
                    {(
                      item.price *
                      item.quantity
                    ).toLocaleString()}
                  </p>
                </div>
              ))}

            </div>

            <div className="mt-6 border-t border-zinc-800 pt-6">

              <div className="flex justify-between text-2xl font-black">
                <span>
                  Total
                </span>

                <span className="text-yellow-500">
                  ₦{total.toLocaleString()}
                </span>
              </div>

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-zinc-900 p-8"
          >

            <h2 className="mb-8 text-2xl font-bold">
              Delivery Information
            </h2>

            <div className="space-y-6">

              <div>
                <label
                  htmlFor="customerName"
                  className="mb-2 block font-semibold"
                >
                  Full Name
                </label>

                <input
                  id="customerName"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(e.target.value)
                  }
                  className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block font-semibold"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="mb-2 block font-semibold"
                >
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  placeholder="Enter your full delivery address"
                  required
                  rows={5}
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-yellow-500 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Checking Stock..."
                  : "Place Order"}
              </button>

            </div>

          </form>

        </div>
      </main>

      <Footer />
    </>
  );
}