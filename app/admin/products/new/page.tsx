"use client";

import { useState } from "react";

export default function NewProductPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const image = formData.get("image") as File;

    let imageUrl = "";

    if (image && image.size > 0) {
      const uploadData = new FormData();
      uploadData.append("file", image);

      const upload = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const uploaded = await upload.json();

      imageUrl = uploaded.url;
    }

    const product = {
      name: formData.get("name"),
      description: formData.get("description"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      image: imageUrl,
      featured: formData.get("featured") === "on",
      inStock: formData.get("inStock") === "on",
    };

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      alert("✅ Product Added Successfully!");
      form.reset();
    } else {
      alert("❌ Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <div className="mx-auto max-w-3xl">

        <h1 className="mb-8 text-4xl font-black">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            required
            name="name"
            placeholder="Product Name"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <textarea
            required
            name="description"
            placeholder="Description"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            required
            name="category"
            placeholder="Category"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            required
            type="number"
            name="price"
            placeholder="Price"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            required
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <input
            required
            type="file"
            name="image"
            accept="image/*"
            className="w-full rounded-xl bg-zinc-900 p-4"
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
            />
            Featured Product
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="inStock"
              defaultChecked
            />
            In Stock
          </label>

          <button
            disabled={loading}
            className="rounded-xl bg-yellow-500 px-10 py-4 font-bold text-black hover:bg-yellow-400"
          >
            {loading ? "Uploading..." : "Save Product"}
          </button>

        </form>

      </div>
    </main>
  );
}