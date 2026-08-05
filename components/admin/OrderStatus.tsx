"use client";

import { useState } from "react";
import toast from "react-hot-toast";

type OrderStatusProps = {
  id: string;
  status: string | null;
};

export default function OrderStatus({
  id,
  status,
}: OrderStatusProps) {
  const [value, setValue] = useState(
    status || "Pending"
  );

  const [loading, setLoading] = useState(false);

  async function updateStatus(
    newStatus: string
  ) {
    if (newStatus === value) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/orders/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const result =
        await response.json().catch(() => null);

      if (!response.ok) {
        toast.error(
          result?.error ||
            "Failed to update order status."
        );

        return;
      }

      setValue(newStatus);

      toast.success(
        `Order status updated to ${newStatus}`
      );
    } catch (error) {
      console.error(
        "Status update error:",
        error
      );

      toast.error(
        "Something went wrong while updating the order."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      value={value}
      disabled={loading}
      onChange={(e) =>
        updateStatus(e.target.value)
      }
      className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none transition focus:border-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <option value="Pending">
        Pending
      </option>

      <option value="Processing">
        Processing
      </option>

      <option value="Shipped">
        Shipped
      </option>

      <option value="Delivered">
        Delivered
      </option>

      <option value="Cancelled">
        Cancelled
      </option>
    </select>
  );
}