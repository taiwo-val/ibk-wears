import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { supabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import RelatedProducts from "@/components/shop/RelatedProducts";

import AddToCartButton from "@/components/cart/AddToCartButton";
import WishlistButton from "@/components/wishlist/WishlistButton";
import ReviewForm from "@/components/reviews/ReviewForm";
import StarRating from "@/components/reviews/StarRating";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: Props) {
  const { id } = await params;

  const { data: product, error } =
    await supabaseAdmin
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

  if (error || !product) {
    notFound();
  }

  const stock = Number(product.stock ?? 0);

  const isInStock =
    stock > 0 &&
    product.in_stock === true;

  let initialWishlisted = false;

  const supabase =
    await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: wishlist } =
      await supabaseAdmin
        .from("wishlists")
        .select("product_id")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();

    initialWishlisted = Boolean(
      wishlist
    );
  }

  const { data: reviews } =
    await supabaseAdmin
      .from("reviews")
      .select("*")
      .eq("product_id", product.id)
      .order("created_at", {
        ascending: false,
      });

  const averageRating =
    reviews && reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) =>
              sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "0";

  const totalReviews =
    reviews?.length ?? 0;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black pt-32 pb-20">

        <div className="mx-auto max-w-7xl px-6">

          <Link
            href="/shop"
            className="mb-8 inline-block text-yellow-500 hover:underline"
          >
            ← Back to Shop
          </Link>

          <div className="grid gap-16 lg:grid-cols-2">

            <div className="relative h-[650px] overflow-hidden rounded-3xl bg-zinc-900">

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

            <div>

              <div className="flex items-center justify-between">

                <div>

                  {product.featured && (
                    <span className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-bold text-black">
                      ⭐ Featured Product
                    </span>
                  )}

                </div>

                <WishlistButton
                  productId={product.id}
                  initialWishlisted={
                    initialWishlisted
                  }
                />

              </div>

              <p className="mt-6 uppercase tracking-[0.3em] text-yellow-500">
                {product.category}
              </p>

              <h1 className="mt-4 text-5xl font-black text-white">
                {product.name}
              </h1>

              <h2 className="mt-8 text-4xl font-bold text-yellow-500">
                ₦
                {Number(
                  product.price
                ).toLocaleString()}
              </h2>

              <div className="mt-6 flex items-center gap-4">

                <StarRating
                  rating={Math.round(
                    Number(
                      averageRating
                    )
                  )}
                />

                <span className="text-zinc-400">
                  {averageRating} (
                  {totalReviews} Reviews)
                </span>

              </div>

              <p className="mt-8 leading-8 text-zinc-400">
                {product.description}
              </p>

              <div className="mt-8">

                {isInStock ? (
                  stock <= 5 ? (
                    <p className="font-bold text-orange-400">
                      ⚠️ Only {stock} left
                    </p>
                  ) : (
                    <p className="font-bold text-green-500">
                      ✅ In Stock
                    </p>
                  )
                ) : (
                  <p className="font-bold text-red-500">
                    ❌ Out of Stock
                  </p>
                )}

              </div>

              <div className="mt-10 flex flex-wrap gap-4">

                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    image:
                      product.image || "",
                    price: Number(
                      product.price
                    ),
                    stock,
                  }}
                  disabled={!isInStock}
                />

                <a
                  href={`https://wa.me/08067942779?text=${encodeURIComponent(
                    `Hello IBK WEARS, I want to order ${product.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-xl border border-green-500 px-8 py-4 font-bold text-green-500 hover:bg-green-500 hover:text-black ${
                    !isInStock
                      ? "pointer-events-none opacity-50"
                      : ""
                  }`}
                >
                  📱 Order on WhatsApp
                </a>

              </div>
                            <div className="mt-12 rounded-2xl bg-zinc-900 p-6">

                <h3 className="mb-4 text-xl font-bold">
                  Product Information
                </h3>

                <div className="space-y-3 text-zinc-400">

                  <p>
                    <strong className="text-white">
                      Category:
                    </strong>{" "}
                    {product.category}
                  </p>

                  <p>
                    <strong className="text-white">
                      Availability:
                    </strong>{" "}
                    {isInStock
                      ? "In Stock"
                      : "Out of Stock"}
                  </p>

                  <p>
                    <strong className="text-white">
                      Stock:
                    </strong>{" "}
                    {stock}
                  </p>

                  <p>
                    <strong className="text-white">
                      Featured:
                    </strong>{" "}
                    {product.featured
                      ? "Yes"
                      : "No"}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Reviews Section */}

          <div className="mt-24 border-t border-zinc-800 pt-16">

            <div className="mb-10">

              <h2 className="text-4xl font-black text-white">
                Customer Reviews
              </h2>

              <p className="mt-3 text-zinc-400">
                See what other customers think about this product.
              </p>

            </div>

            <ReviewForm
              productId={product.id}
            />

            <div className="mt-12 space-y-6">

              {reviews?.length === 0 && (

                <div className="rounded-2xl bg-zinc-900 p-10 text-center">

                  <h3 className="text-2xl font-bold">
                    No Reviews Yet
                  </h3>

                  <p className="mt-3 text-zinc-400">
                    Be the first customer to review this product.
                  </p>

                </div>

              )}

              {reviews?.map((review) => (

                <div
                  key={review.id}
                  className="rounded-2xl bg-zinc-900 p-8"
                >

                  <div className="flex items-center justify-between">

                    <StarRating
                      rating={review.rating}
                    />

                    <span className="text-sm text-zinc-500">
                      {new Date(
                        review.created_at
                      ).toLocaleDateString()}
                    </span>

                  </div>

                <div className="mt-4">

  {review.verified_purchase && (
    <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
      ✅ Verified Purchase
    </span>
  )}

</div>

<p className="mt-6 leading-8 text-zinc-300">
  {review.review}
</p>

                </div>

              ))}

            </div>

          </div>

        </div>
<RelatedProducts
  category={product.category}
  currentProductId={product.id}
/>

      </main>

      <Footer />

    </>
  );
}