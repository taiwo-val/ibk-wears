import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "epnhtuuwqfntnrrmgkka.supabase.co",
      },
    ],
  },
};

export default nextConfig;