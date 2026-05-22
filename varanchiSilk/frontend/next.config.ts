import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export", // 👈 tells Next.js to export static HTML
  images: {
    unoptimized: true, // 👈 required if you use next/image
  },
};

export default nextConfig;
