import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Разрешает любые внешние домены (удобно для разработки)
      },
    ],
  },
};

export default nextConfig;
