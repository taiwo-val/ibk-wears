import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } =
    await supabaseAdmin
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

  if (!profile || profile.role !== "admin") {
    redirect("/account");
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <AdminSidebar />

      <main className="ml-64 min-h-screen">
        {children}
      </main>

    </div>
  );
}