"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (password.length < 6) {
        setError(
          "Password must be at least 6 characters."
        );
        return;
      }

      /*
       * Remember where the customer came from.
       *
       * Example:
       * /register?redirect=/checkout
       *
       * After successful registration, the customer
       * will be sent back to /checkout.
       */
      const params = new URLSearchParams(
        window.location.search
      );

      const requestedRedirect =
        params.get("redirect");

      /*
       * Only allow internal paths.
       * This prevents redirecting users to
       * external websites.
       */
      const redirectTo =
        requestedRedirect &&
        requestedRedirect.startsWith("/")
          ? requestedRedirect
          : "/account";

      const {
        data,
        error: signUpError,
      } =
        await supabaseBrowser.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone,
            },
          },
        });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      /*
       * If Supabase immediately creates an active
       * session, send the customer to their
       * intended destination.
       */
      if (data.session) {
        router.push(redirectTo);
        router.refresh();
        return;
      }

      /*
       * If email confirmation is enabled,
       * the customer must confirm their email first.
       *
       * We preserve the redirect destination
       * by adding it to the login link.
       */
      setMessage(
        "Account created successfully. Please check your email to confirm your account before logging in."
      );
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      setError(
        "Something went wrong while creating your account."
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
            Create Account
          </h1>

          <p className="mt-3 text-center text-zinc-400">
            Join IBK WEARS
          </p>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500 bg-red-950/40 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-6 rounded-xl border border-green-500 bg-green-950/40 p-4 text-sm text-green-300">
              {message}
            </div>
          )}

          <form
            onSubmit={handleRegister}
            className="mt-8 space-y-5"
          >

            {/* Full Name */}

            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block font-semibold"
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                required
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Phone */}

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block font-semibold"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                required
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Email */}

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

            {/* Password */}

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
                placeholder="Create a password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full rounded-xl bg-zinc-800 p-4 outline-none focus:ring-2 focus:ring-yellow-500"
              />

              <p className="mt-2 text-sm text-zinc-500">
                Minimum 6 characters
              </p>
            </div>

            {/* Create Account */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-yellow-500 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* Login */}

          <div className="mt-8 text-center text-zinc-400">

            <p>
              Already have an account?
            </p>

           <Link
  href="/login?redirect=/checkout"
  className="mt-2 inline-block font-bold text-yellow-500 hover:text-yellow-400"
>
  Login
</Link>

          </div>

        </div>

      </div>

    </main>
  );
}