import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/projects", destination: "/projets", permanent: true },
      { source: "/projects/:slug", destination: "/projets/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
