import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "crcf.cookatmarket.com",
        pathname: "/product/images/**",
      },
    ],
  },
};

export default nextConfig;
