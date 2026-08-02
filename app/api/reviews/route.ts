import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const productId = searchParams.get("productId");

  const { data } = await supabaseAdmin
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", {
      ascending: false,
    });

  const average =
    data && data.length > 0
      ? (
          data.reduce(
            (sum, review) =>
              sum + review.rating,
            0
          ) / data.length
        ).toFixed(1)
      : "0";

  return NextResponse.json({
    reviews: data ?? [],
    average,
    total: data?.length ?? 0,
  });
}

export async function POST(
  request: NextRequest
) {
  const supabase =
    await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await request.json();

  const { data: order } =
    await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("user_id", user.id);

  let verified = false;

  if (order) {
    verified = order.some((o) =>
      JSON.stringify(o.items).includes(
        body.productId
      )
    );
  }

  const { error } =
    await supabaseAdmin
      .from("reviews")
      .insert([
        {
          product_id:
            body.productId,
          user_id: user.id,
          rating: body.rating,
          review: body.review,
          verified_purchase:
            verified,
        },
      ]);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}