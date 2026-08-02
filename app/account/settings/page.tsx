import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
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

      <main className="min-h-screen bg-black px-6 pt-32 pb-20 text-white">
        <div className="mx-auto max-w-3xl">

          <div className="mb-10">
            <Link
              href="/account"
              className="text-yellow-500 transition hover:underline"
            >
              ← Back to Account
            </Link>

            <h1 className="mt-8 text-5xl font-black">
              Account Settings
            </h1>

            <p className="mt-4 text-zinc-400">
              Manage your account settings and preferences.
            </p>
          </div>

          <div className="space-y-6">

            {/* Account Information */}

            <div className="rounded-2xl bg-zinc-900 p-8">
              <h2 className="text-2xl font-bold">
                Account Information
              </h2>

              <div className="mt-6 space-y-4">

                <div>
                  <p className="text-sm text-zinc-500">
                    Email Address
                  </p>

                  <p className="mt-1 font-semibold">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Account ID
                  </p>

                  <p className="mt-1 break-all font-mono text-sm text-zinc-400">
                    {user.id}
                  </p>
                </div>

              </div>
            </div>

            {/* Profile */}

            <div className="rounded-2xl bg-zinc-900 p-8">
              <h2 className="text-2xl font-bold">
                Profile
              </h2>

              <p className="mt-3 text-zinc-400">
                Update your name, phone number, and delivery information.
              </p>

              <Link
                href="/account/profile"
                className="mt-6 inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400"
              >
                Manage Profile
              </Link>
            </div>

            {/* Orders */}

            <div className="rounded-2xl bg-zinc-900 p-8">
              <h2 className="text-2xl font-bold">
                Orders
              </h2>

              <p className="mt-3 text-zinc-400">
                View your previous orders and track your purchases.
              </p>

              <Link
                href="/account/orders"
                className="mt-6 inline-block rounded-xl border border-zinc-700 px-6 py-3 font-bold text-white transition hover:border-yellow-500 hover:text-yellow-500"
              >
                View My Orders
              </Link>
            </div>

            {/* Wishlist */}

            <div className="rounded-2xl bg-zinc-900 p-8">
              <h2 className="text-2xl font-bold">
                Wishlist
              </h2>

              <p className="mt-3 text-zinc-400">
                View products you've saved for later.
              </p>

              <Link
                href="/account/wishlist"
                className="mt-6 inline-block rounded-xl border border-zinc-700 px-6 py-3 font-bold text-white transition hover:border-red-500 hover:text-red-500"
              >
                View Wishlist
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}