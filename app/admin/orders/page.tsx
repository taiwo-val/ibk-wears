import Navbar from "@/components/layout/Navbar";
import { supabaseAdmin } from "@/lib/supabase";
import OrderStatus from "@/components/admin/OrderStatus";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const {
    data: orders,
    error,
  } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <h1 className="text-4xl font-bold text-red-500">
          Failed to load orders
        </h1>

        <p className="mt-4 text-zinc-300">
          {error.message}
        </p>
      </main>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 pt-32 pb-20 text-white">
        <div className="mx-auto max-w-7xl">

          {/* Header */}

          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
              Admin Dashboard
            </p>

            <h1 className="mt-3 text-5xl font-black">
              Customer Orders
            </h1>

            <p className="mt-4 text-zinc-400">
              Manage customer orders and update their delivery status.
            </p>
          </div>

          {/* Empty */}

          {orders.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">

              <div className="text-5xl">
                📦
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                No Orders Yet
              </h2>

              <p className="mt-3 text-zinc-400">
                Customer orders will appear here when they place an order.
              </p>

            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1000px]">

                  <thead className="bg-zinc-800">

                    <tr>

                      <th className="p-5 text-left text-sm font-bold uppercase tracking-wider text-zinc-300">
                        Customer
                      </th>

                      <th className="p-5 text-left text-sm font-bold uppercase tracking-wider text-zinc-300">
                        Phone
                      </th>

                      <th className="p-5 text-left text-sm font-bold uppercase tracking-wider text-zinc-300">
                        Address
                      </th>

                      <th className="p-5 text-left text-sm font-bold uppercase tracking-wider text-zinc-300">
                        Total
                      </th>

                      <th className="p-5 text-left text-sm font-bold uppercase tracking-wider text-zinc-300">
                        Status
                      </th>

                      <th className="p-5 text-left text-sm font-bold uppercase tracking-wider text-zinc-300">
                        Date
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {orders.map((order) => (

                      <tr
                        key={order.id}
                        className="border-t border-zinc-800 transition hover:bg-zinc-800/40"
                      >

                        {/* Customer */}

                        <td className="p-5">
                          <div>
                            <p className="font-bold text-white">
                              {order.customer_name}
                            </p>

                            <p className="mt-1 max-w-[220px] break-all text-xs text-zinc-500">
                              Order ID: {order.id}
                            </p>
                          </div>
                        </td>

                        {/* Phone */}

                        <td className="p-5 text-zinc-300">
                          {order.phone}
                        </td>

                        {/* Address */}

                        <td className="p-5">

                          <p className="max-w-[260px] leading-6 text-zinc-300">
                            {order.address}
                          </p>

                        </td>

                        {/* Total */}

                        <td className="p-5">

                          <p className="font-bold text-yellow-500">
                            ₦
                            {Number(
                              order.total
                            ).toLocaleString()}
                          </p>

                        </td>

                        {/* Status */}

                        <td className="p-5">

                          <OrderStatus
                            id={order.id}
                            status={order.status}
                          />

                        </td>

                        {/* Date */}

                        <td className="p-5 text-zinc-400">

                          {new Date(
                            order.created_at
                          ).toLocaleDateString(
                            "en-NG",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>
          )}

        </div>
      </main>
    </>
  );
}