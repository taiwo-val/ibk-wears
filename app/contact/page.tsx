import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black pt-32 pb-20 text-white">
        <div className="mx-auto max-w-4xl px-6">

          <h1 className="mb-8 text-5xl font-black text-yellow-500">
            Contact Us
          </h1>

          <div className="space-y-6 rounded-2xl bg-zinc-900 p-8">

            <p>
              <strong>Phone:</strong> +234 810 623 213
            </p>

            <p>
              <strong>Email:</strong> info@ibkwears.com
            </p>

            <p>
              <strong>WhatsApp:</strong> +234 810 623 213
            </p>

            <p>
              <strong>Address:</strong> Lagos, Nigeria
            </p>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}