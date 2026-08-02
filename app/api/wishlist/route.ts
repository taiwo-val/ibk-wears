import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "You must be logged in.",
        },
        {
          status: 401,
        }
      );
    }

    const { data, error } =
      await supabaseAdmin
        .from("wishlists")
        .select("product_id")
        .eq("user_id", user.id);

    if (error) {
      console.error(
        "Wishlist fetch error:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      productIds:
        data?.map(
          (item) => item.product_id
        ) ?? [],
    });
  } catch (error) {
    console.error(
      "Wishlist GET error:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to load wishlist.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Please log in to use your wishlist.",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const productId = String(
      body.productId ?? ""
    ).trim();

    if (!productId) {
      return NextResponse.json(
        {
          error: "Product ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const { data: product } =
      await supabaseAdmin
        .from("products")
        .select("id")
        .eq("id", productId)
        .single();

    if (!product) {
      return NextResponse.json(
        {
          error: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    const { error } =
      await supabaseAdmin
        .from("wishlists")
        .upsert(
          {
            user_id: user.id,
            product_id: productId,
          },
          {
            onConflict:
              "user_id,product_id",
          }
        );

    if (error) {
      console.error(
        "Wishlist add error:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      wishlisted: true,
    });
  } catch (error) {
    console.error(
      "Wishlist POST error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to add product to wishlist.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "Please log in to use your wishlist.",
        },
        {
          status: 401,
        }
      );
    }

    const { searchParams } =
      new URL(request.url);

    const productId =
      searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        {
          error: "Product ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const { error } =
      await supabaseAdmin
        .from("wishlists")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);

    if (error) {
      console.error(
        "Wishlist remove error:",
        error
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      success: true,
      wishlisted: false,
    });
  } catch (error) {
    console.error(
      "Wishlist DELETE error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to remove product from wishlist.",
      },
      {
        status: 500,
      }
    );
  }
}