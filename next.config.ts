import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  async headers() {
    return [
      {
        source: "/unity/Build/:path*",
        headers: [
          { key: "Content-Encoding", value: "gz" }, // Or "br" for Brotli
          { key: "Content-Type", value: "application/javascript" },
        ],
      },
    ];
  },
};


export default nextConfig;
