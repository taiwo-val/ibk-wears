"use client";

import { ShieldCheck, Truck, BadgeCheck, Headset } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description:
      "We carefully source premium fashion items, football jerseys and boots for lasting quality.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description:
      "Fast and reliable delivery across Nigeria with secure packaging.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Products",
    description:
      "Authentic products with attention to quality and customer satisfaction.",
  },
  {
    icon: Headset,
    title: "24/7 WhatsApp Support",
    description:
      "Order easily and get quick responses through WhatsApp anytime.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">
          <p className="mb-3 uppercase tracking-[0.4em] text-yellow-500">
            Why Choose Us
          </p>

          <h2 className="text-4xl font-black text-white md:text-5xl">
            More Than Just Fashion
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-zinc-800 bg-black p-8 transition hover:border-yellow-500"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-yellow-500 p-4 text-black">
                  <Icon size={30} />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="leading-7 text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}