"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { error: loginError } =
        await supabaseBrowser.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      const response = await fetch(
        "/api/auth/me",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(
          "We could not verify your account."
        );

        await supabaseBrowser.auth.signOut();

        return;
      }

      if (result.role === "admin") {
        router.push("/admin");
        router.refresh();
        return;
      }

      if (result.role === "customer") {
        router.push("/account");
        router.refresh();
        return;
      }

      setError(
        "Your account does not have a valid role. Please contact the store administrator."
      );

      await supabaseBrowser.auth.signOut();
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      setError(
        "Something went wrong while logging in."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 pt-32 pb-20 text-white">

      <div className="mx-auto max-w-md">

        <div className="rounded-3xl bg-zinc-900 p-8 shadow-2xl">

          <h1 className="text-center text-4xl font-black text-yellow-500">
            Welcome Back
          </h1>

          <p className="mt-3 text-center text-zinc-400">
            Login to your IBK WEARS account
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500 bg-red-950/40 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="mt-8 space-y-5"
          >

            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-semibold"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-semibold"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-yellow-500 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Signing In..."
                : "Login"}
            </button>

          </form>

          <div className="mt-8 text-center text-zinc-400">

            <p>
              Don't have an account?
            </p>

            <Link
              href="/register"
              className="mt-2 inline-block font-bold text-yellow-500 hover:text-yellow-400"
            >
              Create an account
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}