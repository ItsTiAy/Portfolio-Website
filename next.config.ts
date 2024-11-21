import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
};

module.exports = {
  async headers() {
    return [
      {
        source: "/unity/:project/Build/:path*.br",
        headers: [
          { key: "Content-Encoding", value: "br" },
          { key: "Content-Type", value: "application/wasm" },
        ],
      },
      {
        source: "/unity/:project/Build/:path*.js",
        headers: [
          { key: "Content-Encoding", value: "js" },
          { key: "Content-Type", value: "application/javascript" },
        ],
      },
    ];
  },
};

export default nextConfig;