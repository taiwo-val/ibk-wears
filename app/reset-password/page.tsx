"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabaseBrowser.auth.updateUser({
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Password updated successfully!");
    router.push("/login");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={updatePassword}
        className="w-full max-w-md rounded-2xl bg-zinc-900 p-8"
      >
        <h1 className="mb-6 text-3xl font-bold text-white">
          Reset Password
        </h1>

        <input
          type="password"
          placeholder="New Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-xl bg-zinc-800 p-4 text-white"
        />

        <button
          className="w-full rounded-xl bg-yellow-500 py-3 font-bold text-black"
        >
          Update Password
        </button>
      </form>
    </main>
  );
}