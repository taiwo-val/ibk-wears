import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type OrderItem = {
  id?: string;
  name?: string;
  product_name?: string;
  price?: number;
  quantity?: number;
};

type Order = {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  items: OrderItem[] | null;
  total: number | string;
  status: string | null;
  created_at: string;
  user_id: string | null;
};

function formatCurrency(value: number | string) {
  const amount = Number(value) || 0;

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getStatusClasses(status: string) {
  switch (status.toLowerCase()) {
    case "processing":
      return "border-blue-500/40 bg-blue-500/10 text-blue-400";

    case "shipped":
      return "border-purple-500/40 bg-purple-500/10 text-purple-400";

    case "delivered":
      return "border-green-500/40 bg-green-500/10 text-green-400";

    case "cancelled":
    case "canceled":
      return "border-red-500/40 bg-red-500/10 text-red-400";

    default:
      return "border-yellow-500/40 bg-yellow-500/10 text-yellow-400";
  }
}

export default async function CustomerOrdersPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/account/orders");
  }

  /*
   * The authenticated user's ID is always used as the filter.
   * This prevents one customer from seeing another customer's orders.
   */
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(
      `
        id,
        customer_name,
        phone,
        address,
        items,
        total,
        status,
        created_at,
        user_id
      `
    )
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  const orders = (data ?? []) as Order[];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 pb-20 pt-32 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <Link
              href="/account"
              className="font-semibold text-yellow-500 transition hover:text-yellow-400"
            >
              ← Back to Account
            </Link>

            <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h1 className="text-4xl font-black sm:text-5xl">
                  My Orders
                </h1>

                <p className="mt-3 text-zinc-400">
                  View your order history and current order status.
                </p>
              </div>

              <Link
                href="/shop"
                className="rounded-xl bg-yellow-500 px-6 py-3 text-center font-bold text-black transition hover:bg-yellow-400"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-red-500 bg-red-950/40 p-6">
              <h2 className="font-bold text-red-400">
                Unable to load orders
              </h2>

              <p className="mt-2 text-sm text-red-200">
                {error.message}
              </p>
            </div>
          )}

          {!error && orders.length === 0 && (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10 text-center">
              <div className="text-6xl">📦</div>

              <h2 className="mt-6 text-2xl font-bold">
                You have no orders yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-zinc-400">
                Products you purchase from IBK WEARS will appear here.
              </p>

              <Link
                href="/shop"
                className="mt-8 inline-block rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black transition hover:bg-yellow-400"
              >
                Start Shopping
              </Link>
            </div>
          )}

          {!error && orders.length > 0 && (
            <div className="space-y-6">
              {orders.map((order) => {
                const status = order.status || "Pending";

                const items = Array.isArray(order.items)
                  ? order.items
                  : [];

                const totalQuantity = items.reduce(
                  (sum, item) =>
                    sum + Number(item.quantity || 0),
                  0
                );

                return (
                  <article
                    key={order.id}
                    className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
                  >
                    <div className="flex flex-col justify-between gap-5 border-b border-zinc-800 p-6 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-sm text-zinc-500">
                          Order ID
                        </p>

                        <p className="mt-1 break-all font-mono text-sm font-semibold text-white">
                          {order.id}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full border px-4 py-2 text-sm font-bold ${getStatusClasses(
                            status
                          )}`}
                        >
                          {status}
                        </span>

                        <span className="text-sm text-zinc-400">
                          {new Date(
                            order.created_at
                          ).toLocaleString("en-NG", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-8 p-6 lg:grid-cols-[1fr_280px]">
                      <div>
                        <h2 className="text-xl font-bold">
                          Order Items
                        </h2>

                        {items.length === 0 ? (
                          <p className="mt-4 text-zinc-400">
                            No item information is available for
                            this order.
                          </p>
                        ) : (
                          <div className="mt-5 space-y-4">
                            {items.map((item, index) => {
                              const name =
                                item.name ||
                                item.product_name ||
                                "Product";

                              const quantity =
                                Number(item.quantity) || 1;

                              const price =
                                Number(item.price) || 0;

                              return (
                                <div
                                  key={`${order.id}-${item.id ?? index}`}
                                  className="flex items-start justify-between gap-5 border-b border-zinc-800 pb-4"
                                >
                                  <div>
                                    <p className="font-semibold">
                                      {name}
                                    </p>

                                    <p className="mt-1 text-sm text-zinc-400">
                                      Quantity: {quantity}
                                    </p>
                                  </div>

                                  <p className="shrink-0 font-bold text-yellow-500">
                                    {formatCurrency(
                                      price * quantity
                                    )}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <div className="rounded-2xl bg-black/40 p-6">
                        <h2 className="text-xl font-bold">
                          Order Summary
                        </h2>

                        <div className="mt-5 space-y-4 text-sm">
                          <div className="flex justify-between gap-4">
                            <span className="text-zinc-400">
                              Customer
                            </span>

                            <span className="text-right font-semibold">
                              {order.customer_name}
                            </span>
                          </div>

                          <div className="flex justify-between gap-4">
                            <span className="text-zinc-400">
                              Phone
                            </span>

                            <span className="text-right font-semibold">
                              {order.phone}
                            </span>
                          </div>

                          <div className="flex justify-between gap-4">
                            <span className="text-zinc-400">
                              Items
                            </span>

                            <span className="font-semibold">
                              {totalQuantity}
                            </span>
                          </div>

                          <div className="border-t border-zinc-800 pt-4">
                            <p className="text-zinc-400">
                              Delivery Address
                            </p>

                            <p className="mt-2 leading-6 text-white">
                              {order.address}
                            </p>
                          </div>

                          <div className="flex justify-between border-t border-zinc-800 pt-5 text-lg">
                            <span className="font-bold">
                              Total
                            </span>

                            <span className="font-black text-yellow-500">
                              {formatCurrency(order.total)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}