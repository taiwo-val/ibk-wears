import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase";

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log("User:", user);
    console.log("User Error:", userError);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized - No user found" },
        { status: 401 }
      );
    }

    const body = await request.json();

    console.log("Body:", body);

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .update({
        full_name: body.full_name,
        phone: body.phone,
        address: body.address,
        city: body.city,
        state: body.state,
      })
      .eq("id", user.id)
      .select();

    console.log("Updated Data:", data);
    console.log("Supabase Error:", error);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("PATCH ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}