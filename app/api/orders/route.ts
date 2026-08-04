import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
    /*
     * Check authentication first.
     * Only logged-in users are allowed to create orders.
     */
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error(
        "Authentication error:",
        authError
      );

      return NextResponse.json(
        {
          error:
            "We could not verify your account.",
        },
        { status: 401 }
      );
    }

    if (!user) {
      return NextResponse.json(
        {
          error:
            "You must be logged in to place an order.",
        },
        { status: 401 }
      );
    }

    /*
     * Read the request body
     */
    const body = await request.json();

    const customerName = String(
      body.customer_name ?? ""
    ).trim();

    const phone = String(
      body.phone ?? ""
    ).trim();

    const address = String(
      body.address ?? ""
    ).trim();

    const items = body.items;

    /*
     * Validate customer name
     */
    if (!customerName) {
      return NextResponse.json(
        {
          error:
            "Customer name is required.",
        },
        { status: 400 }
      );
    }

    /*
     * Validate phone
     */
    if (!phone) {
      return NextResponse.json(
        {
          error:
            "Phone number is required.",
        },
        { status: 400 }
      );
    }

    /*
     * Validate address
     */
    if (!address) {
      return NextResponse.json(
        {
          error:
            "Delivery address is required.",
        },
        { status: 400 }
      );
    }

    /*
     * Validate cart items
     */
    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Your cart is empty.",
        },
        { status: 400 }
      );
    }

    /*
     * Create the order using the authenticated
     * user's ID.
     *
     * We NEVER accept the user ID from the client.
     */
    const { data, error } =
      await supabaseAdmin.rpc(
        "create_order",
        {
          p_customer_name:
            customerName,

          p_phone: phone,

          p_address:
            address,

          p_items: items,

          p_user_id: user.id,
        }
      );

    if (error) {
      console.error(
        "Create order error:",
        error
      );

      return NextResponse.json(
        {
          error:
            error.message ||
            "The order could not be created.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Order created successfully.",

        order: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Order API error:",
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