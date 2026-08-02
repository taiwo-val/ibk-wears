import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabaseAdmin } from "@/lib/supabase";
import ShopFilters from "@/components/shop/ShopFilters";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const {
    data: products,
    error,
  } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("id", {
      ascending: false,
    });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 pt-32 pb-20 text-white">

        <div className="mx-auto max-w-7xl">

          {/* Header */}

          <div className="mb-12 text-center">

            <p className="uppercase tracking-[0.4em] text-yellow-500">
              IBK WEARS
            </p>

            <h1 className="mt-4 text-5xl font-black md:text-6xl">
              Shop
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
              Discover our latest collection of quality fashion,
              footwear, and accessories.
            </p>

          </div>

          {/* Error */}

          {error && (
            <div className="rounded-2xl border border-red-500 bg-red-950/40 p-6 text-red-300">
              <h2 className="font-bold">
                Failed to load products
              </h2>

              <p className="mt-2">
                {error.message}
              </p>
            </div>
          )}

          {/* Empty */}

          {!error &&
            (!products ||
              products.length === 0) && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-16 text-center">

                <h2 className="text-2xl font-bold">
                  No Products Yet
                </h2>

                <p className="mt-3 text-zinc-400">
                  Check back soon for our latest products.
                </p>

              </div>
            )}

          {/* Products + Filters */}

          {!error &&
            products &&
            products.length > 0 && (
              <ShopFilters
                products={products}
              />
            )}

        </div>

      </main>

      <Footer />
    </>
  );
}