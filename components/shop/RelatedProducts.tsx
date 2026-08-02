import Link from "next/link";
import Image from "next/image";
import { supabaseAdmin } from "@/lib/supabase";

type Props = {
  category: string;
  currentProductId: string;
};

export default async function RelatedProducts({
  category,
  currentProductId,
}: Props) {
  const { data: products } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("id", currentProductId)
    .limit(4);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mt-24">
      <h2 className="mb-8 text-3xl font-bold text-white">
        You May Also Like
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shop/${product.id}`}
            className="overflow-hidden rounded-2xl bg-zinc-900 transition hover:-translate-y-1"
          >
            <div className="relative h-72">
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
              <p className="text-sm uppercase tracking-widest text-yellow-500">
                {product.category}
              </p>

              <h3 className="mt-2 text-xl font-bold text-white">
                {product.name}
              </h3>

              <p className="mt-4 text-2xl font-bold text-yellow-500">
                ₦{Number(product.price).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}