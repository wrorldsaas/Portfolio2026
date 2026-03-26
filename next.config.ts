import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Repository: wrorldsaas/Portfolio2026
  // Website URL: https://wrorldsaas.github.io/Portfolio2026/
  basePath: "/Portfolio2026",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
