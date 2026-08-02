"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  ShoppingCart,
  Heart,
} from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import { useCart } from "@/context/CartContext";

type UserRole =
  | "admin"
  | "customer"
  | null;

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const router = useRouter();

  const [open, setOpen] =
    useState(false);

  const [user, setUser] =
    useState<any>(null);

  const [role, setRole] =
    useState<UserRole>(null);

  const [loadingAuth, setLoadingAuth] =
    useState(true);

  const { cart } = useCart();

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const {
        data: { user },
      } =
        await supabaseBrowser.auth.getUser();

      if (!mounted) return;

      setUser(user);

      if (user) {
        try {
          const response =
            await fetch("/api/auth/me", {
              cache: "no-store",
            });

          if (response.ok) {
            const result =
              await response.json();

            setRole(
              result.role === "admin"
                ? "admin"
                : "customer"
            );
          } else {
            setRole("customer");
          }
        } catch (error) {
          console.error(
            "Failed to load user role:",
            error
          );

          setRole("customer");
        }
      } else {
        setRole(null);
      }

      setLoadingAuth(false);
    }

    loadUser();

    const {
      data: authListener,
    } =
      supabaseBrowser.auth.onAuthStateChange(
        async (_event, session) => {
          if (!mounted) return;

          const currentUser =
            session?.user ?? null;

          setUser(currentUser);

          if (currentUser) {
            try {
              const response =
                await fetch("/api/auth/me", {
                  cache: "no-store",
                });

              if (response.ok) {
                const result =
                  await response.json();

                setRole(
                  result.role === "admin"
                    ? "admin"
                    : "customer"
                );
              }
            } catch (error) {
              console.error(
                "Role check failed:",
                error
              );
            }
          } else {
            setRole(null);
          }

          setLoadingAuth(false);
        }
      );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    setOpen(false);

    await supabaseBrowser.auth.signOut();

    setUser(null);
    setRole(null);

    router.push("/");
    router.refresh();
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-zinc-800 bg-black/90 backdrop-blur">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="text-3xl font-black text-yellow-500"
        >
          IBK WEARS
        </Link>

        <nav className="hidden items-center gap-7 md:flex">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium text-white transition hover:text-yellow-500"
            >
              {link.name}
            </Link>
          ))}
{role !== "admin" && (
  <>
    <Link
      href="/account/wishlist"
      className="text-white transition hover:text-yellow-500"
    >
      <Heart size={22} />
    </Link>

    <Link
      href="/cart"
      className="relative text-white transition hover:text-yellow-500"
    >
      <ShoppingCart size={24} />

      {cartCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-black">
          {cartCount}
        </span>
      )}
    </Link>
  </>
)}

          {!loadingAuth && (
            <>
              {user ? (
                <>
                  <Link
                    href={
                      role === "admin"
                        ? "/admin"
                        : "/account"
                    }
                    className="rounded-xl border border-zinc-700 px-5 py-2 font-bold text-white transition hover:border-yellow-500 hover:text-yellow-500"
                  >
                    {role === "admin"
                      ? "Admin Dashboard"
                      : "My Account"}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-xl bg-red-600 px-5 py-2 font-bold text-white transition hover:bg-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-xl border border-zinc-700 px-5 py-2 font-bold text-white transition hover:border-yellow-500 hover:text-yellow-500"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    className="rounded-xl bg-yellow-500 px-5 py-2 font-bold text-black transition hover:bg-yellow-400"
                  >
                    Register
                  </Link>
                </>
              )}
            </>
          )}

        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          {open ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>

      </div>

      {open && (
        <div className="border-t border-zinc-800 bg-black md:hidden">

          <nav className="flex flex-col p-6">

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-4 text-white hover:text-yellow-500"
              >
                {link.name}
              </Link>
            ))}
{role !== "admin" && (
  <>
    <Link
      href="/account/wishlist"
      onClick={() => setOpen(false)}
      className="py-4 text-white"
    >
      ❤️ Wishlist
    </Link>

    <Link
      href="/cart"
      onClick={() => setOpen(false)}
      className="flex items-center justify-between py-4 text-white"
    >
      <span>🛒 Cart</span>

      {cartCount > 0 && (
        <span className="rounded-full bg-yellow-500 px-3 py-1 text-sm font-bold text-black">
          {cartCount}
        </span>
      )}
    </Link>
  </>
)}

            {!loadingAuth && (
              <>
                {user ? (
                  <>
                    <Link
                      href={
                        role === "admin"
                          ? "/admin"
                          : "/account"
                      }
                      onClick={() => setOpen(false)}
                      className="mt-4 rounded-xl border border-zinc-700 px-5 py-3 text-center font-bold text-white"
                    >
                      {role === "admin"
                        ? "Admin Dashboard"
                        : "My Account"}
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="mt-3 rounded-xl bg-red-600 px-5 py-3 font-bold text-white"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="mt-4 rounded-xl border border-zinc-700 px-5 py-3 text-center font-bold text-white"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className="mt-3 rounded-xl bg-yellow-500 px-5 py-3 text-center font-bold text-black"
                    >
                      Register
                    </Link>
                  </>
                )}
              </>
            )}

          </nav>

        </div>
      )}

    </header>
  );
}