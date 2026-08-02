import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const description = String(body.description ?? "").trim();
    const category = String(body.category ?? "").trim();
    const image = String(body.image ?? "").trim();

    const price = Number(body.price);
    const stock = Math.max(0, Math.floor(Number(body.stock)));

    const featured = Boolean(body.featured);

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

    if (!Number.isFinite(stock)) {
      return NextResponse.json(
        { error: "Enter a valid stock quantity." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("products")
      .insert({
        name,
        description,
        category,
        price,
        stock,
        image,
        featured,
        in_stock: stock > 0,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase product error:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Product added successfully.",
        product: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product API error:", error);

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