"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [ready, setReady] =
    useState(false);

  useEffect(() => {
    const {
      data: authListener,
    } =
      supabaseBrowser.auth.onAuthStateChange(
        (event) => {
          if (
            event === "PASSWORD_RECOVERY"
          ) {
            setReady(true);
          }
        }
      );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      const { error } =
        await supabaseBrowser.auth.updateUser({
          password,
        });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success(
        "Password updated successfully!"
      );

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 pt-32 pb-20 text-white">
      <div className="mx-auto max-w-md">

        <div className="rounded-3xl bg-zinc-900 p-8 shadow-2xl">

          <h1 className="text-4xl font-black">
            Reset Password
          </h1>

          <p className="mt-4 text-zinc-400">
            Create a new password for your IBK WEARS account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-semibold"
              >
                New Password
              </label>

              <input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block font-semibold"
              >
                Confirm New Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-yellow-500 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Updating..."
                : "Update Password"}
            </button>

          </form>

          {!ready && (
            <p className="mt-6 text-sm text-zinc-500">
              Open this page from the password reset link sent to your email.
            </p>
          )}

          <Link
            href="/login"
            className="mt-6 block text-center text-sm font-semibold text-yellow-500 hover:underline"
          >
            Back to Login
          </Link>

        </div>

      </div>
    </main>
  );
}