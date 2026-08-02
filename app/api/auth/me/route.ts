import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          authenticated: false,
        },
        {
          status: 401,
        }
      );
    }

    const { data: profile, error: profileError } =
      await supabaseAdmin
        .from("profiles")
        .select("id, full_name, phone, role")
        .eq("id", user.id)
        .single();

    if (profileError) {
      console.error("Profile lookup error:", profileError);

      return NextResponse.json(
        {
          authenticated: true,
          user: {
            id: user.id,
            email: user.email,
          },
          role: "customer",
        },
        {
          status: 200,
        }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
      },
      profile,
      role: profile.role,
    });
  } catch (error) {
    console.error("Auth API error:", error);

    return NextResponse.json(
      {
        error: "Unable to check authentication.",
      },
      {
        status: 500,
      }
    );
  }
}