// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const tm = require("next-transpile-modules");

/**
 *
 * @type {import('next').NextConfig}
 */
const config = {
  images: {
    remotePatterns: [
      { hostname: "localhost" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "sherlock-staging.s3.us-west-1.amazonaws.com" },
      { hostname: "sherlock-staging-v1.s3.amazonaws.com" },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/images/:path*",
        destination: "http://localhost:4000/:path*",
      },
    ];
  },
  reactStrictMode: false,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

const withTM = tm(["@ant-design/icons-svg", "rc-util", "@svgr/webpack"]);

// eslint-disable-next-line no-undef
module.exports = withTM(config);
