import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://smart-crud-umber.vercel.app/:path*", // 👈 Express backend
      },
    ];
  },
};

export default nextConfig;
