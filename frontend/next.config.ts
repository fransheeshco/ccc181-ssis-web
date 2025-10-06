import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // All requests starting with /api
        destination: "http://127.0.0.1:8000/api/:path*", // Forward to Flask backend
      },
    ];
  },
};

export default nextConfig;
