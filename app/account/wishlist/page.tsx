import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import WishlistButton from "@/components/wishlist/WishlistButton";

export const dynamic = "force-dynamic";

export default async function WishlistPage() {
  const supabase =
    await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const {
    data: wishlistItems,
    error,
  } = await supabaseAdmin
    .from("wishlists")
    .select(`
      product_id,
      products (
        id,
        name,
        category,
        price,
        image,
        stock,
        in_stock,
        featured
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  const products =
    wishlistItems
      ?.map((item) => item.products)
      .filter(Boolean) ?? [];

  return (
    <main className="min-h-screen bg-black px-6 pt-32 pb-20 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">

          <Link
            href="/account"
            className="text-yellow-500 hover:underline"
          >
            ← Back to Account
          </Link>

          <p className="mt-8 uppercase tracking-[0.3em] text-yellow-500">
            My Account
          </p>

          <h1 className="mt-3 text-5xl font-black">
            My Wishlist
          </h1>

          <p className="mt-4 text-zinc-400">
            Products you've saved for later.
          </p>

        </div>

        {error && (
          <div className="rounded-2xl border border-red-500 bg-red-950/40 p-6 text-red-300">
            {error.message}
          </div>
        )}

        {!error && products.length === 0 && (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-16 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500">
              ❤️
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              Your Wishlist Is Empty
            </h2>

            <p className="mt-3 text-zinc-400">
              Save products you love and find them here later.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black hover:bg-yellow-400"
            >
              Explore Products
            </Link>

          </div>
        )}

        {products.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {products.map((product: any) => {

              const stock =
                Number(
                  product.stock ?? 0
                );

              const isInStock =
                stock > 0 &&
                product.in_stock === true;

              return (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-2xl bg-zinc-900"
                >

                  <div className="relative h-80 bg-zinc-800">

                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-zinc-500">
                        No Image
                      </div>
                    )}

                    <div className="absolute right-4 top-4">
                      <WishlistButton
                        productId={product.id}
                        initialWishlisted={true}
                      />
                    </div>

                  </div>

                  <div className="p-5">

                    <p className="text-sm uppercase tracking-wider text-yellow-500">
                      {product.category}
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      {product.name}
                    </h2>

                    <p className="mt-4 text-2xl font-black text-yellow-500">
                      ₦
                      {Number(
                        product.price
                      ).toLocaleString()}
                    </p>

                    <p
                      className={`mt-3 text-sm font-semibold ${
                        isInStock
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {isInStock
                        ? stock <= 5
                          ? `Only ${stock} left`
                          : "In Stock"
                        : "Out of Stock"}
                    </p>

                    <Link
                      href={`/shop/${product.id}`}
                      className="mt-6 block rounded-xl bg-yellow-500 py-3 text-center font-bold text-black hover:bg-yellow-400"
                    >
                      View Product
                    </Link>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </main>
  );
}