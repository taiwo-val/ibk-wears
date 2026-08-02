import Image from "next/image";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";

export default async function FeaturedProducts() {
  const { data: products, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("featured", true)
    .order("id", { ascending: false })
    .limit(4);

  if (error) {
    return (
      <section className="py-16 text-center text-red-500">
        {error.message}
      </section>
    );
  }

  if (!products?.length) {
    return (
      <section className="py-16 text-center text-zinc-400">
        No featured products yet.
      </section>
    );
  }

  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-center text-4xl font-black">
          Featured Products
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="overflow-hidden rounded-2xl bg-zinc-900 transition hover:scale-105"
            >
              <div className="relative h-80 w-full bg-zinc-800">
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
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold">
                  {product.name}
                </h3>

                <p className="mt-2 text-zinc-400">
                  {product.category}
                </p>

                <p className="mt-4 text-2xl font-black text-yellow-500">
                  ₦{Number(product.price).toLocaleString()}
                </p>

                <Link
                  href={`/shop/${product.id}`}
                  className="mt-6 block rounded-xl bg-yellow-500 py-3 text-center font-bold text-black"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}