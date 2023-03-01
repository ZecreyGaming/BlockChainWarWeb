/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: "/legend/:path*",
        destination: "https://test-legend-app.zecrey.com/:path*",
      },
      {
        source: "/nft_url/:path*",
        destination: "http://34.111.87.92/:path*", // "http://test-legend-nft.zecrey.com/:path*",
      },
      {
        source: "/rpc/:path*",
        destination: "https://data-seed-prebsc-1-s3.binance.org:8545/:path*",
      },
      {
        source: "/rpc",
        destination: "https://data-seed-prebsc-1-s3.binance.org:8545",
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    NEXT_PUBLIC_GQL_KEY: process.env.NEXT_PUBLIC_GQL_KEY,
    NEXT_PUBLIC_SEED: process.env.NEXT_PUBLIC_SEED,
  },
  swcMinify: true,
};

module.exports = nextConfig;
