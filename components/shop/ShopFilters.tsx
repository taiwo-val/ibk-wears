"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import QuickViewModal from "@/components/shop/QuickViewModal";

type Product = {
  id: string;
  name: string;
  description?: string | null;
  category: string;
  price: number;
  image?: string | null;
  stock?: number | null;
  in_stock?: boolean | null;
  featured?: boolean | null;
};

type Props = {
  products: Product[];
};

export default function ShopFilters({
  products,
}: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] =
  useState<Product | null>(null);
  const [sortBy, setSortBy] = useState("newest");

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        products
          .map((product) =>
            product.category?.trim()
          )
          .filter(Boolean)
      )
    );

    return uniqueCategories.sort();
  }, [products]);

  const maximumProductPrice = useMemo(() => {
    if (products.length === 0) {
      return 0;
    }

    return Math.max(
      ...products.map((product) =>
        Number(product.price)
      )
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    const searchTerm =
      search.trim().toLowerCase();

    const filtered = products.filter((product) => {
      const matchesSearch =
        !searchTerm ||
        product.name
          .toLowerCase()
          .includes(searchTerm) ||
        product.category
          .toLowerCase()
          .includes(searchTerm);

      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesPrice =
        !maxPrice ||
        Number(product.price) <=
          Number(maxPrice);

      const stock =
        Number(product.stock ?? 0);

      const isInStock =
        stock > 0 &&
        product.in_stock === true;

      const matchesStock =
        !inStockOnly || isInStock;

      const matchesFeatured =
        !featuredOnly ||
        product.featured === true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesStock &&
        matchesFeatured
      );
    });

    switch (sortBy) {
  case "price-low":
    filtered.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
    break;

  case "price-high":
    filtered.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
    break;

  case "name":
    filtered.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    break;

  case "featured":
    filtered.sort(
      (a, b) => Number(b.featured) - Number(a.featured)
    );
    break;

  default:
    break;
}

return filtered;
}, [
  products,
  search,
  category,
  maxPrice,
  inStockOnly,
  featuredOnly,
  sortBy,
]);

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setMaxPrice("");
    setInStockOnly(false);
    setFeaturedOnly(false);
  }

  return (
    <div>

      {/* Filters */}

      <div className="mb-12 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

        <div className="grid gap-5 lg:grid-cols-5">

          {/* Search */}

          <div className="lg:col-span-2">

            <label
              htmlFor="search"
              className="mb-2 block text-sm font-semibold text-zinc-300"
            >
              Search Products
            </label>

            <input
              id="search"
              type="text"
              placeholder="Search by product name..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-yellow-500"
            />

          </div>

          {/* Category */}

          <div>

            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-zinc-300"
            >
              Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="All">
                All Categories
              </option>

              {categories.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>

          </div>

          {/* Maximum Price */}

          <div>

            <label
              htmlFor="maxPrice"
              className="mb-2 block text-sm font-semibold text-zinc-300"
            >
              Maximum Price
            </label>

            <input
              id="maxPrice"
              type="number"
              min="0"
              placeholder={
                maximumProductPrice
                  ? `Up to ₦${maximumProductPrice.toLocaleString()}`
                  : "Maximum price"
              }
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value)
              }
              className="w-full rounded-xl bg-zinc-800 p-4 text-white outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-yellow-500"
            />

          </div>

          {/* Clear */}

          <div className="flex items-end">

            <button
              type="button"
              onClick={clearFilters}
              className="w-full rounded-xl border border-zinc-700 px-4 py-4 font-bold text-white transition hover:border-yellow-500 hover:text-yellow-500"
            >
              Clear Filters
            </button>

          </div>

        </div>

        {/* Checkboxes */}

        <div className="mt-6 flex flex-wrap gap-6 border-t border-zinc-800 pt-6">

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) =>
                setInStockOnly(
                  e.target.checked
                )
              }
              className="h-5 w-5 accent-yellow-500"
            />

            <span className="font-semibold text-zinc-300">
              In Stock Only
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(e) =>
                setFeaturedOnly(
                  e.target.checked
                )
              }
              className="h-5 w-5 accent-yellow-500"
            />

            <span className="font-semibold text-zinc-300">
              Featured Products
            </span>
          </label>

        </div>

      </div>

      <div className="mb-8 flex justify-end">

  <select
    value={sortBy}
    onChange={(e) =>
      setSortBy(e.target.value)
    }
    className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-white"
  >
    <option value="newest">
      Newest
    </option>

    <option value="price-low">
      Price: Low → High
    </option>

    <option value="price-high">
      Price: High → Low
    </option>

    <option value="name">
      Name: A → Z
    </option>

    <option value="featured">
      Featured First
    </option>

  </select>

</div>

      {/* Result Count */}

      <div className="mb-6 flex items-center justify-between">

        <p className="text-zinc-400">
          Showing{" "}
          <span className="font-bold text-white">
            {filteredProducts.length}
          </span>{" "}
          of{" "}
          <span className="font-bold text-white">
            {products.length}
          </span>{" "}
          products
        </p>

      </div>

      {/* Products */}

      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-16 text-center">

          <h2 className="text-2xl font-bold">
            No Products Found
          </h2>

          <p className="mt-3 text-zinc-400">
            Try changing your search or filters.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black hover:bg-yellow-400"
          >
            Clear Filters
          </button>

        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {filteredProducts.map(
            (product) => {

              const stock =
                Number(
                  product.stock ?? 0
                );

              const isInStock =
                stock > 0 &&
                product.in_stock === true;

              return (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-2xl bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >

                  {/* Image */}

                  <div className="relative h-80 w-full bg-zinc-800">

                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-zinc-500">
                        No Image
                      </div>
                    )}

                    {/* Featured Badge */}

                    {product.featured && (
                      <span className="absolute left-4 top-4 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                        Featured
                      </span>
                    )}

                    {/* Stock Badge */}

                    <span
                      className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${
                        !isInStock
                          ? "bg-red-600 text-white"
                          : stock <= 5
                          ? "bg-orange-500 text-black"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {!isInStock
                        ? "Out of Stock"
                        : stock <= 5
                        ? `${stock} left`
                        : "In Stock"}
                    </span>

                  </div>

                  {/* Content */}

                  <div className="p-5">

                    <p className="text-sm uppercase tracking-wider text-yellow-500">
                      {product.category}
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      {product.name}
                    </h2>

                    <p className="mt-4 text-2xl font-black text-yellow-500">
                      ₦
                      {Number(
                        product.price
                      ).toLocaleString()}
                    </p>

                   <div className="mt-6 space-y-3">

  <button
    onClick={() => setSelectedProduct(product)}
    className="w-full rounded-xl border border-yellow-500 py-3 font-bold text-yellow-500 transition hover:bg-yellow-500 hover:text-black"
  >
    👁 Quick View
  </button>

  <Link
    href={`/shop/${product.id}`}
    className="block rounded-xl bg-yellow-500 py-3 text-center font-bold text-black transition hover:bg-yellow-400"
  >
    View Product
  </Link>

</div>

                  </div>

                </div>
              );
            }
          )}

        </div>
           )}

      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
}