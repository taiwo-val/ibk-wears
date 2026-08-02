import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: orders, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black pt-32 pb-20 text-white">
        <div className="mx-auto max-w-7xl px-6">

          <h1 className="mb-10 text-5xl font-black">
            My Orders
          </h1>

          {error && (
            <p className="text-red-500">
              {error.message}
            </p>
          )}

          {!orders?.length && (
            <div className="rounded-2xl bg-zinc-900 p-10 text-center">
              <h2 className="text-3xl font-bold">
                No Orders Yet
              </h2>

              <p className="mt-4 text-zinc-400">
                You haven't placed any orders.
              </p>
            </div>
          )}

          <div className="space-y-6">

            {orders?.map((order) => (

              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="block rounded-2xl bg-zinc-900 p-8 transition hover:bg-zinc-800"
              >

                <div className="flex flex-wrap items-center justify-between gap-4">

                  <div>

                    <h2 className="text-2xl font-bold">
                      Order #{order.id}
                    </h2>

                    <p className="mt-2 text-zinc-400">
                      {new Date(
                        order.created_at
                      ).toLocaleString()}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-3xl font-black text-yellow-500">
                      ₦
                      {Number(order.total).toLocaleString()}
                    </p>

                    <span
                      className={`mt-3 inline-block rounded-full px-4 py-2 text-sm font-bold ${
                        order.status === "Delivered"
                          ? "bg-green-600"
                          : order.status === "Shipped"
                          ? "bg-blue-600"
                          : order.status === "Processing"
                          ? "bg-yellow-500 text-black"
                          : "bg-zinc-700"
                      }`}
                    >
                      {order.status}
                    </span>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}