"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type Profile = {
  full_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
};

export default function ProfileForm({
  profile,
}: {
  profile: Profile;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.get("full_name"),
          phone: formData.get("phone"),
          address: formData.get("address"),
          city: formData.get("city"),
          state: formData.get("state"),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("✔ Profile Updated Successfully");
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <input
        name="full_name"
        defaultValue={profile?.full_name || ""}
        placeholder="Full Name"
        className="w-full rounded-xl bg-zinc-900 p-4 text-white"
      />

      <input
        name="phone"
        defaultValue={profile?.phone || ""}
        placeholder="Phone Number"
        className="w-full rounded-xl bg-zinc-900 p-4 text-white"
      />

      <input
        name="address"
        defaultValue={profile?.address || ""}
        placeholder="Address"
        className="w-full rounded-xl bg-zinc-900 p-4 text-white"
      />

      <input
        name="city"
        defaultValue={profile?.city || ""}
        placeholder="City"
        className="w-full rounded-xl bg-zinc-900 p-4 text-white"
      />

      <input
        name="state"
        defaultValue={profile?.state || ""}
        placeholder="State"
        className="w-full rounded-xl bg-zinc-900 p-4 text-white"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}