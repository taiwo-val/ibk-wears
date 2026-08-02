import Link from "next/link";
import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabase";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const {
    data: products,
    error,
  } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  return (
    <main className="min-h-screen bg-black p-6 text-white md:p-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-500">
              Inventory
            </p>

            <h1 className="mt-2 text-4xl font-black md:text-5xl">
              Products
            </h1>

            <p className="mt-3 text-zinc-400">
              Manage your IBK WEARS products and stock.
            </p>
          </div>

          <Link
            href="/admin/products/new"
            className="rounded-xl bg-yellow-500 px-6 py-3 text-center font-bold text-black transition hover:bg-yellow-400"
          >
            + Add Product
          </Link>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-xl border border-red-500 bg-red-950/40 p-5 text-red-300">
            <p className="font-bold">
              Failed to load products
            </p>

            <p className="mt-2 text-sm">
              {error.message}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!error && (!products || products.length === 0) && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">

            <h2 className="text-2xl font-bold">
              No Products Yet
            </h2>

            <p className="mt-3 text-zinc-400">
              Add your first product to your store.
            </p>

            <Link
              href="/admin/products/new"
              className="mt-6 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black"
            >
              Add Product
            </Link>

          </div>
        )}

        {/* Products Table */}
        {products && products.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-zinc-800">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead className="bg-zinc-900">

                  <tr>
                    <th className="p-5 text-left">
                      Image
                    </th>

                    <th className="p-5 text-left">
                      Product
                    </th>

                    <th className="p-5 text-left">
                      Category
                    </th>

                    <th className="p-5 text-left">
                      Price
                    </th>

                    <th className="p-5 text-left">
                      Stock
                    </th>

                    <th className="p-5 text-left">
                      Status
                    </th>

                    <th className="p-5 text-left">
                      Actions
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {products.map((product) => {

                    const stock = Number(
                      product.stock ?? 0
                    );

                    const isInStock =
                      stock > 0 &&
                      product.in_stock === true;

                    return (
                      <tr
                        key={product.id}
                        className="border-t border-zinc-800 transition hover:bg-zinc-950"
                      >

                        {/* Image */}
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

                        {/* Product */}
                        <td className="p-4">

                          <div>
                            <p className="font-bold">
                              {product.name}
                            </p>

                            {product.featured && (
                              <span className="mt-2 inline-block rounded-full bg-yellow-500 px-2 py-1 text-xs font-bold text-black">
                                Featured
                              </span>
                            )}
                          </div>

                        </td>

                        {/* Category */}
                        <td className="p-4 text-zinc-300">
                          {product.category}
                        </td>

                        {/* Price */}
                        <td className="p-4 font-bold text-yellow-500">
                          ₦
                          {Number(
                            product.price
                          ).toLocaleString()}
                        </td>

                        {/* Stock */}
                        <td className="p-4">

                          <span
                            className={
                              stock === 0
                                ? "font-bold text-red-500"
                                : stock <= 5
                                ? "font-bold text-orange-400"
                                : "font-bold text-green-500"
                            }
                          >
                            {stock}
                          </span>

                        </td>

                        {/* Status */}
                        <td className="p-4">

                          {isInStock ? (
                            stock <= 5 ? (
                              <span className="rounded-full bg-orange-500/20 px-3 py-2 text-xs font-bold text-orange-400">
                                Low Stock
                              </span>
                            ) : (
                              <span className="rounded-full bg-green-500/20 px-3 py-2 text-xs font-bold text-green-400">
                                In Stock
                              </span>
                            )
                          ) : (
                            <span className="rounded-full bg-red-500/20 px-3 py-2 text-xs font-bold text-red-400">
                              Out of Stock
                            </span>
                          )}

                        </td>

                        {/* Actions */}
                        <td className="p-4">

                          <div className="flex gap-3">

                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold transition hover:bg-blue-500"
                            >
                              Edit
                            </Link>

                            <DeleteButton
                              id={product.id}
                            />

                          </div>

                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}