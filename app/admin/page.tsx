import Link from "next/link";
import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabase";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [{ data: products }, { data: orders }] = await Promise.all([
    supabaseAdmin
      .from("products")
      .select("*")
      .order("id", { ascending: false }),

    supabaseAdmin
      .from("orders")
      .select("*"),
  ]);

  const totalProducts = products?.length ?? 0;
  const totalOrders = orders?.length ?? 0;

  const pendingOrders =
    orders?.filter(
      (order) => order.status === "Pending"
    ).length ?? 0;

  const totalRevenue =
    orders?.reduce(
      (sum, order) => sum + Number(order.total),
      0
    ) ?? 0;

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-black">
              IBK WEARS ADMIN
            </h1>

            <p className="mt-2 text-zinc-400">
              Manage your business
            </p>
          </div>

          <div className="flex gap-4">

            <Link
              href="/admin/orders"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold"
            >
              Orders
            </Link>

            <Link
              href="/admin/products/new"
              className="rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black"
            >
              + Add Product
            </Link>

          </div>

        </div>

        {/* Dashboard Cards */}

        <div className="mb-10 grid gap-6 md:grid-cols-4">

          <div className="rounded-2xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Total Products
            </p>

            <h2 className="mt-3 text-4xl font-black text-yellow-500">
              {totalProducts}
            </h2>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Total Orders
            </p>

            <h2 className="mt-3 text-4xl font-black text-green-500">
              {totalOrders}
            </h2>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Pending Orders
            </p>

            <h2 className="mt-3 text-4xl font-black text-orange-500">
              {pendingOrders}
            </h2>
          </div>

          <div className="rounded-2xl bg-zinc-900 p-6">
            <p className="text-zinc-400">
              Total Revenue
            </p>

            <h2 className="mt-3 text-4xl font-black text-cyan-400">
              ₦{totalRevenue.toLocaleString()}
            </h2>
          </div>

        </div>

        {/* Products Table */}

        <div className="overflow-hidden rounded-2xl border border-zinc-800">

          <table className="w-full">

            <thead className="bg-zinc-900">
              <tr>
                <th className="p-5 text-left">Image</th>
                <th className="p-5 text-left">Product</th>
                <th className="p-5 text-left">Category</th>
                <th className="p-5 text-left">Price</th>
                <th className="p-5 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>

              {products?.map((product) => (

                <tr
                  key={product.id}
                  className="border-t border-zinc-800"
                >

                  <td className="p-4">

                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={70}
                        height={70}
                        className="h-[70px] w-[70px] rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-[70px] w-[70px] items-center justify-center rounded-xl bg-zinc-800 text-xs text-zinc-500">
                        No Image
                      </div>
                    )}

                  </td>

                  <td className="font-semibold">
                    {product.name}
                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td>
                    ₦{Number(product.price).toLocaleString()}
                  </td>

                  <td>

                    <div className="flex gap-3">

                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="rounded-lg bg-blue-600 px-4 py-2"
                      >
                        Edit
                      </Link>

                      <DeleteButton id={product.id} />

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Recent Orders */}

        <div className="mt-12 overflow-hidden rounded-2xl border border-zinc-800">

          <div className="border-b border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-black">
              Recent Orders
            </h2>
          </div>

          <table className="w-full">

            <thead className="bg-zinc-950">
              <tr>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Total</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>

              {orders?.length ? (
                orders.slice(0, 5).map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-zinc-800"
                  >
                    <td className="p-4">
                      {order.customer_name}
                    </td>

                    <td className="p-4">
                      {order.customer_email}
                    </td>

                    <td className="p-4">
                      ₦{Number(order.total).toLocaleString()}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-4 py-2 text-sm font-bold ${
                          order.status === "Completed"
                            ? "bg-green-600"
                            : "bg-yellow-600 text-black"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-zinc-500"
                  >
                    No orders yet.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </main>
  );
}