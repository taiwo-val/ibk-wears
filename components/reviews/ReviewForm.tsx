"use client";

import { useState } from "react";

export default function ReviewForm({
  productId,
}: {
  productId: string;
}) {
  const [rating, setRating] =
    useState(5);

  const [review, setReview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function submitReview() {
    setLoading(true);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        productId,
        rating,
        review,
      }),
    });

    if (res.ok) {
      alert("Review submitted.");

      location.reload();
    } else {
      const error =
        await res.json();

      alert(error.error);
    }

    setLoading(false);
  }

  return (
    <div className="mt-12 rounded-2xl bg-zinc-900 p-8">

      <h2 className="mb-6 text-2xl font-bold">
        Leave a Review
      </h2>

      <select
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
        className="mb-4 w-full rounded-xl bg-zinc-800 p-4"
      >
        <option value={5}>
          ⭐⭐⭐⭐⭐
        </option>

        <option value={4}>
          ⭐⭐⭐⭐
        </option>

        <option value={3}>
          ⭐⭐⭐
        </option>

        <option value={2}>
          ⭐⭐
        </option>

        <option value={1}>
          ⭐
        </option>
      </select>

      <textarea
        value={review}
        onChange={(e) =>
          setReview(e.target.value)
        }
        rows={5}
        placeholder="Write your review..."
        className="w-full rounded-xl bg-zinc-800 p-4"
      />

      <button
        onClick={submitReview}
        disabled={loading}
        className="mt-6 rounded-xl bg-yellow-500 px-8 py-4 font-bold text-black"
      >
        {loading
          ? "Submitting..."
          : "Submit Review"}
      </button>

    </div>
  );
}