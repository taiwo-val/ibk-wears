import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const description = String(
      body.description ?? ""
    ).trim();
    const category = String(body.category ?? "").trim();

    const price = Number(body.price);
    const stockNumber = Number(body.stock);
    const stock = Math.max(
      0,
      Math.floor(stockNumber)
    );

    const featured = Boolean(body.featured);

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required." },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: "Product name is required." },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { error: "Product category is required." },
        { status: 400 }
      );
    }

    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json(
        { error: "Enter a valid product price." },
        { status: 400 }
      );
    }

    if (
      !Number.isFinite(stockNumber) ||
      stockNumber < 0
    ) {
      return NextResponse.json(
        { error: "Enter a valid stock quantity." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("products")
      .update({
        name,
        description,
        category,
        price,
        stock,
        featured,
        in_stock: stock > 0,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Product update error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Product updated successfully.",
      product: data,
    });
  } catch (error) {
    console.error("Product PATCH error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Update failed.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Product delete error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully.",
    });
  } catch (error) {
    console.error("Product DELETE error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Delete failed.",
      },
      { status: 500 }
    );
  }
}