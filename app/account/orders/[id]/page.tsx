import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function OrderDetails({
  params,
}: Props) {
  const { id } = await params;

  const supabase =
    await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: order } =
    await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

  if (!order) {
    notFound();
  }

  const items =
    typeof order.items === "string"
      ? JSON.parse(order.items)
      : order.items;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black pt-32 pb-20 text-white">

        <div className="mx-auto max-w-6xl px-6">

          <h1 className="text-5xl font-black">
            Order #{order.id}
          </h1>

          <p className="mt-3 text-zinc-400">
            {new Date(order.created_at).toLocaleString()}
          </p>

          {/* Status */}

          <div className="mt-10 rounded-2xl bg-zinc-900 p-8">

            <h2 className="text-2xl font-bold">
              Order Status
            </h2>

            <div className="mt-8 flex flex-wrap gap-6">

              <div
                className={`rounded-xl px-5 py-3 font-bold ${
                  order.status === "Pending"
                    ? "bg-yellow-500 text-black"
                    : "bg-zinc-800"
                }`}
              >
                📥 Pending
              </div>

              <div
                className={`rounded-xl px-5 py-3 font-bold ${
                  order.status === "Processing"
                    ? "bg-blue-600"
                    : "bg-zinc-800"
                }`}
              >
                📦 Processing
              </div>

              <div
                className={`rounded-xl px-5 py-3 font-bold ${
                  order.status === "Shipped"
                    ? "bg-cyan-600"
                    : "bg-zinc-800"
                }`}
              >
                🚚 Shipped
              </div>

              <div
                className={`rounded-xl px-5 py-3 font-bold ${
                  order.status === "Delivered"
                    ? "bg-green-600"
                    : "bg-zinc-800"
                }`}
              >
                ✅ Delivered
              </div>

            </div>

          </div>

          {/* Products */}

          <div className="mt-10 rounded-2xl bg-zinc-900 p-8">

            <h2 className="mb-8 text-2xl font-bold">
              Products
            </h2>

            <div className="space-y-6">

              {items.map(
                (item: any, index: number) => (

                  <div
                    key={index}
                    className="flex items-center gap-5 rounded-xl bg-zinc-800 p-5"
                  >

                    <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-zinc-700">

                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : null}

                    </div>

                    <div className="flex-1">

                      <h3 className="text-xl font-bold">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-zinc-400">
                        Quantity: {item.quantity}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-xl font-bold text-yellow-500">
                        ₦
                        {Number(item.price).toLocaleString()}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

          {/* Order Summary */}

          <div className="mt-10 rounded-2xl bg-zinc-900 p-8">

            <h2 className="mb-6 text-2xl font-bold">
              Order Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Subtotal
                </span>

                <span>
                  ₦{Number(order.total).toLocaleString()}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Shipping
                </span>

                <span>
                  ₦0
                </span>

              </div>

              <div className="border-t border-zinc-700 pt-5">

                <div className="flex justify-between text-3xl font-black">

                  <span>Total</span>

                  <span className="text-yellow-500">
                    ₦
                    {Number(order.total).toLocaleString()}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </>
  );
}