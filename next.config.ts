import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // IMPORTANT: Change this to your GitHub repository name
  // Example: If your repo URL is github.com/johndoe/portfolio
  // Then set basePath: "/portfolio"
  // If using a custom domain, remove this line or set to ""
  basePath: "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
