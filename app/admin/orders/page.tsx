import Navbar from "@/components/layout/Navbar";
import { supabaseAdmin } from "@/lib/supabase";
import OrderStatus from "@/components/admin/OrderStatus";

export default async function OrdersPage() {
  const { data: orders, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <h1 className="text-4xl font-bold text-red-500">
          Failed to load orders
        </h1>

        <p className="mt-4">{error.message}</p>
      </main>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black pt-32 pb-20 text-white">
        <div className="mx-auto max-w-7xl px-6">

          <h1 className="mb-10 text-5xl font-black">
            Customer Orders
          </h1>

          {orders.length === 0 ? (
            <div className="rounded-xl bg-zinc-900 p-10 text-center">
              No orders yet.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl bg-zinc-900">

              <table className="w-full">

                <thead className="bg-zinc-800">

                  <tr>

                    <th className="p-4 text-left">
                      Customer
                    </th>

                    <th className="p-4 text-left">
                      Phone
                    </th>

                    <th className="p-4 text-left">
                      Address
                    </th>

                    <th className="p-4 text-left">
                      Total
                    </th>

                    <th className="p-4 text-left">
                      Status
                    </th>

                    <th className="p-4 text-left">
                      Date
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-t border-zinc-800"
                    >

                     <td className="p-4">
  <OrderStatus
    id={order.id}
    status={order.status}
  />
</td>

                      <td className="p-4">
                        {order.phone}
                      </td>

                      <td className="p-4">
                        {order.address}
                      </td>

                      <td className="p-4 text-yellow-500 font-bold">
                        ₦{Number(order.total).toLocaleString()}
                      </td>

                      <td className="p-4">
                        {order.status}
                      </td>

                      <td className="p-4">
                        {new Date(
                          order.created_at
                        ).toLocaleDateString()}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>
      </main>
    </>
  );
}