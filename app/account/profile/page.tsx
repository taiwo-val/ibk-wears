import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { supabaseAdmin } from "@/lib/supabase";
import ProfileForm from "@/components/account/ProfileForm";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const supabase =
    await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } =
    await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black pt-32 pb-20 text-white">

        <div className="mx-auto max-w-3xl px-6">

          <h1 className="mb-10 text-5xl font-black">
            My Profile
          </h1>

          <ProfileForm
            profile={profile}
          />

        </div>

      </main>

      <Footer />
    </>
  );
}