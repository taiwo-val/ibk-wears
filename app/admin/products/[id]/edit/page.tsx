import { notFound } from "next/navigation";
import EditProductForm from "@/components/admin/EditProductForm";
import { supabaseAdmin } from "@/lib/supabase";

type Params = Promise<{
  id: string;
}>;

export default async function EditPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  const { data: product } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-black">
          Edit Product
        </h1>

        <EditProductForm product={product} />
      </div>
    </main>
  );
}