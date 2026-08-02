"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

type Props = {
  productId: string;
  initialWishlisted?: boolean;
};

export default function WishlistButton({
  productId,
  initialWishlisted = false,
}: Props) {
  const router = useRouter();

  const [wishlisted, setWishlisted] =
    useState(initialWishlisted);

  const [loading, setLoading] =
    useState(false);

  async function toggleWishlist() {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch(
        `/api/wishlist${
          wishlisted
            ? `?productId=${encodeURIComponent(
                productId
              )}`
            : ""
        }`,
        {
          method: wishlisted
            ? "DELETE"
            : "POST",
          headers: wishlisted
            ? undefined
            : {
                "Content-Type":
                  "application/json",
              },
          body: wishlisted
            ? undefined
            : JSON.stringify({
                productId,
              }),
        }
      );

      const result =
        await response.json();

      if (response.status === 401) {
        router.push(
          `/login?redirect=${encodeURIComponent(
            window.location.pathname
          )}`
        );

        return;
      }

      if (!response.ok) {
        alert(
          result.error ||
            "Could not update wishlist."
        );

        return;
      }

      setWishlisted(
        result.wishlisted
      );
    } catch (error) {
      console.error(
        "Wishlist error:",
        error
      );

      alert(
        "Something went wrong while updating your wishlist."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggleWishlist}
      disabled={loading}
      aria-label={
        wishlisted
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
      title={
        wishlisted
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
      className={`flex h-12 w-12 items-center justify-center rounded-full border transition ${
        wishlisted
          ? "border-red-500 bg-red-500/10 text-red-500"
          : "border-zinc-700 bg-zinc-900 text-white hover:border-red-500 hover:text-red-500"
      } ${
        loading
          ? "cursor-not-allowed opacity-50"
          : ""
      }`}
    >
      <Heart
        size={22}
        fill={
          wishlisted
            ? "currentColor"
            : "none"
        }
      />
    </button>
  );
}