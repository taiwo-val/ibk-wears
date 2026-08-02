import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black pt-32 pb-20 text-white">
        <div className="mx-auto max-w-5xl px-6">

          <h1 className="mb-8 text-5xl font-black text-yellow-500">
            About IBK WEARS
          </h1>

          <p className="mb-6 text-lg leading-8 text-zinc-300">
            IBK WEARS is a fashion brand dedicated to providing quality clothing,
            footwear, and accessories. We believe that everyone deserves stylish,
            comfortable, and affordable fashion.
          </p>

          <p className="mb-6 text-lg leading-8 text-zinc-300">
            Our goal is to deliver premium products with excellent customer
            service while making shopping simple and enjoyable.
          </p>

          <div className="mt-12 rounded-2xl bg-zinc-900 p-8">
            <h2 className="mb-4 text-3xl font-bold text-yellow-500">
              Our Mission
            </h2>

            <p className="leading-8 text-zinc-300">
              To become one of Nigeria's trusted fashion brands by delivering
              high-quality products and an outstanding shopping experience.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}