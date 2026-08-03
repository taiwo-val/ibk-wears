"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabaseBrowser.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/reset-password`,
      }
    );

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset email sent!");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-zinc-900 p-8"
      >
        <h1 className="mb-6 text-3xl font-bold text-white">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-xl bg-zinc-800 p-4 text-white"
        />

        <button
          className="w-full rounded-xl bg-yellow-500 py-3 font-bold text-black"
        >
          Send Reset Link
        </button>
      </form>
    </main>
  );
}