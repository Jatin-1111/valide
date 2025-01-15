import type { NextConfig } from "next";

const NextConfig = {
  transpilePackages: ["gsap"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default NextConfig;
