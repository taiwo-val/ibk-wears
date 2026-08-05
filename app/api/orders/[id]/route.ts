import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const allowedStatuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export async function PATCH(
  request: NextRequest,
  { params }: Props
) {
  try {
    const { id } = await params;

    /*
     * Check that the requester is logged in.
     */
    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          error:
            "You must be logged in to update orders.",
        },
        { status: 401 }
      );
    }

    /*
     * Check that the logged-in user is an admin.
     *
     * We read the role from the profiles table
     * instead of trusting data sent by the browser.
     */
    const {
      data: profile,
      error: profileError,
    } = await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return NextResponse.json(
        {
          error:
            "Could not verify your account permissions.",
        },
        { status: 403 }
      );
    }

    if (profile.role !== "admin") {
      return NextResponse.json(
        {
          error:
            "Only administrators can update order status.",
        },
        { status: 403 }
      );
    }

    /*
     * Read the requested status.
     */
    const body = await request.json();

    const status = String(
      body.status ?? ""
    ).trim();

    /*
     * Only allow valid statuses.
     */
    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          error:
            "Invalid order status.",
        },
        { status: 400 }
      );
    }

    /*
     * Update the order.
     */
    const {
      data,
      error,
    } = await supabaseAdmin
      .from("orders")
      .update({
        status,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(
        "Order status update error:",
        error
      );

      return NextResponse.json(
        {
          error:
            error.message ||
            "Failed to update order status.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: data,
    });
  } catch (error) {
    console.error(
      "Order status API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}