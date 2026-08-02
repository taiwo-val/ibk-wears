"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price: number;
  stock: number | null;
  featured: boolean | null;
};

export default function EditProductForm({
  product,
}: {
  product: Product;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setLoading(true);

    try {
      const response = await fetch(
        `/api/products/${product.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.get("name"),
            description: formData.get("description"),
            category: formData.get("category"),
            price: Number(formData.get("price")),
            stock: Number(formData.get("stock")),
            featured: formData.get("featured") === "on",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Update failed.");
        return;
      }

      alert("✅ Product updated successfully!");

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong while updating the product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block font-semibold"
        >
          Product Name
        </label>

        <input
          id="name"
          name="name"
          required
          defaultValue={product.name}
          className="w-full rounded-xl bg-zinc-900 p-4 outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-2 block font-semibold"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          required
          rows={5}
          defaultValue={product.description ?? ""}
          className="w-full rounded-xl bg-zinc-900 p-4 outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-2 block font-semibold"
        >
          Category
        </label>

        <input
          id="category"
          name="category"
          required
          defaultValue={product.category}
          className="w-full rounded-xl bg-zinc-900 p-4 outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="mb-2 block font-semibold"
        >
          Price
        </label>

        <input
          id="price"
          name="price"
          type="number"
          required
          min="1"
          step="1"
          defaultValue={product.price}
          className="w-full rounded-xl bg-zinc-900 p-4 outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div>
        <label
          htmlFor="stock"
          className="mb-2 block font-semibold"
        >
          Stock Quantity
        </label>

        <input
          id="stock"
          name="stock"
          type="number"
          required
          min="0"
          step="1"
          defaultValue={product.stock ?? 0}
          className="w-full rounded-xl bg-zinc-900 p-4 outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <p className="mt-2 text-sm text-zinc-400">
          Enter 0 when the product is out of stock.
        </p>
      </div>

      <label className="flex items-center gap-3 rounded-xl bg-zinc-900 p-4">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={Boolean(product.featured)}
          className="h-5 w-5"
        />

        <span className="font-semibold">
          Featured Product
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </form>
  );
}