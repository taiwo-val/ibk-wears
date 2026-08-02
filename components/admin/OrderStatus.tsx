"use client";

import { useState } from "react";

export default function OrderStatus({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [value, setValue] = useState(status);
  const [loading, setLoading] = useState(false);

  async function updateStatus(newStatus: string) {
    setLoading(true);

    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      alert("Failed to update status.");
      return;
    }

    setValue(newStatus);
    alert("✅ Status Updated");
  }

  return (
    <select
      value={value}
      disabled={loading}
      onChange={(e) => updateStatus(e.target.value)}
      className="rounded-lg bg-zinc-800 px-3 py-2 text-white outline-none"
    >
      <option value="Pending">Pending</option>
      <option value="Processing">Processing</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  );
}