import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function POST(request: NextRequest) {
  try {
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

    if (!customerName) {
      return NextResponse.json(
        {
          error: "Customer name is required.",
        },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        {
          error: "Phone number is required.",
        },
        { status: 400 }
      );
    }

    if (!address) {
      return NextResponse.json(
        {
          error: "Delivery address is required.",
        },
        { status: 400 }
      );
    }

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          error: "Your cart is empty.",
        },
        { status: 400 }
      );
    }

    let userId: string | null = null;

    try {
      const supabase =
        await createSupabaseServerClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      userId = user?.id ?? null;
    } catch (authError) {
      console.error(
        "Could not read logged-in user:",
        authError
      );
    }

    const { data, error } =
      await supabaseAdmin.rpc(
        "create_order",
        {
          p_customer_name: customerName,
          p_phone: phone,
          p_address: address,
          p_items: items,
          p_user_id: userId,
        }
      );

    if (error) {
      console.error(
        "Create order error:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
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