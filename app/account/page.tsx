import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black pt-32 pb-20 text-white">

        <div className="mx-auto max-w-7xl px-6">

          <h1 className="text-5xl font-black">
            My Account
          </h1>

          <p className="mt-4 text-zinc-400">
            Welcome back,
          </p>

          <p className="text-2xl font-bold text-yellow-500">
            {user.email}
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            <Link
              href="/account/orders"
              className="rounded-2xl bg-zinc-900 p-8 transition hover:bg-zinc-800"
            >
              <h2 className="text-2xl font-bold">
                📦 My Orders
              </h2>

              <p className="mt-3 text-zinc-400">
                View your order history
              </p>
            </Link>

            <Link
              href="/account/wishlist"
              className="rounded-2xl bg-zinc-900 p-8 transition hover:bg-zinc-800"
            >
              <h2 className="text-2xl font-bold">
                ❤️ Wishlist
              </h2>

              <p className="mt-3 text-zinc-400">
                Products you've saved
              </p>
            </Link>

            <Link
              href="/account/profile"
              className="rounded-2xl bg-zinc-900 p-8 transition hover:bg-zinc-800"
            >
              <h2 className="text-2xl font-bold">
                👤 Profile
              </h2>

              <p className="mt-3 text-zinc-400">
                Update your personal information
              </p>
            </Link>

            <Link
              href="/account/settings"
              className="rounded-2xl bg-zinc-900 p-8 transition hover:bg-zinc-800"
            >
              <h2 className="text-2xl font-bold">
                ⚙️ Settings
              </h2>

              <p className="mt-3 text-zinc-400">
                Manage your account
              </p>
            </Link>

            <Link
              href="/shop"
              className="rounded-2xl bg-yellow-500 p-8 text-black transition hover:bg-yellow-400"
            >
              <h2 className="text-2xl font-bold">
                🛍 Continue Shopping
              </h2>

              <p className="mt-3">
                Browse our latest products
              </p>
            </Link>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}