import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "*.ommnews.in",
    //     pathname: "/**",
    //   },
    // ],
    unoptimized: true
  },
};

export default nextConfig;
