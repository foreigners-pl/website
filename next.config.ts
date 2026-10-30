import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      // Agreement signing API — proxied to the Nexus app so calls stay same-origin
      {
        source: '/api/sign/:path*',
        destination: 'https://nexus.foreigners.pl/api/sign/:path*',
      },
    ];
  },
};

export default nextConfig;

