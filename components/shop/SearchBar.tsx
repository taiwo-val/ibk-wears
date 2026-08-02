"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    router.push(`/shop?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="mb-10 flex items-center gap-3"
    >
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 py-4 pl-12 pr-4 text-white outline-none focus:border-yellow-500"
        />
      </div>

      <button
        className="rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black hover:bg-yellow-400"
      >
        Search
      </button>
    </form>
  );
}