import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tell Next.js to generate static files
  // Save the exported files in the 'dist' folder
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true  // ← This MUST be set for static exports
  },

  /* async rewrites() {
   return [
    {
      source: "/api/:path*",
      destination: "http://127.0.0.1:8000/api/:path*",
    },
  ];
  } */
};

export default nextConfig;
