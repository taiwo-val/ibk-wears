import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}

        <div>
          <h2 className="text-3xl font-black tracking-widest">
            IBK
          </h2>

          <p className="mt-1 text-sm tracking-[0.4em] text-yellow-500">
            WEARS
          </p>

          <p className="mt-6 leading-7 text-gray-400">
            Premium fashion, football jerseys, football boots,
            sneakers, watches and accessories for men.
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="mb-5 text-xl font-bold">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3">

            <Link
              href="/"
              className="text-gray-400 transition hover:text-yellow-500"
            >
              Home
            </Link>

            <Link
              href="/shop"
              className="text-gray-400 transition hover:text-yellow-500"
            >
              Shop
            </Link>

            <Link
              href="/football"
              className="text-gray-400 transition hover:text-yellow-500"
            >
              Football
            </Link>

            <Link
              href="/about"
              className="text-gray-400 transition hover:text-yellow-500"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-gray-400 transition hover:text-yellow-500"
            >
              Contact
            </Link>

          </div>
        </div>

        {/* Contact */}

        <div>
          <h3 className="mb-5 text-xl font-bold">
            Contact
          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <Phone
                size={18}
                className="text-yellow-500"
              />

              <span className="text-gray-400">
                +234 8067942779
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Mail
                size={18}
                className="text-yellow-500"
              />

              <span className="text-gray-400">
                Ibiks20@gmail.com
              </span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin
                size={18}
                className="text-yellow-500"
              />

              <span className="text-gray-400">
                Osun State Osogbo, Nigeria
              </span>
            </div>

          </div>
        </div>

        {/* Social Media */}

        <div>
          <h3 className="mb-5 text-xl font-bold">
            Follow Us
          </h3>

          <div className="flex gap-4">

            {/* Instagram */}

            <a
              href="https://www.instagram.com/I_b_k wears /"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow IBK WEARS on Instagram"
              className="rounded-full bg-zinc-900 p-3 transition hover:bg-yellow-500 hover:text-black"
            >
              <FaInstagram size={20} />
            </a>

            {/* Facebook */}

            <a
              href="https://www.facebook.com/ibk wears/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow IBK WEARS on Facebook"
              className="rounded-full bg-zinc-900 p-3 transition hover:bg-yellow-500 hover:text-black"
            >
              <FaFacebookF size={20} />
            </a>

            {/* WhatsApp */}

            <a
              href="https://wa.me/2348102623213"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with IBK WEARS on WhatsApp"
              className="rounded-full bg-zinc-900 p-3 transition hover:bg-yellow-500 hover:text-black"
            >
              <FaWhatsapp size={20} />
            </a>

          </div>
        </div>

      </div>

      <div className="border-t border-zinc-800 py-6 text-center text-gray-500">
        © {new Date().getFullYear()} IBK WEARS. All Rights Reserved.
      </div>
    </footer>
  );
}