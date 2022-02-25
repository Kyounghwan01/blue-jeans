/* eslint-disable @typescript-eslint/no-var-requires */
const Dotenv = require("dotenv-webpack");
const withTM = require("next-transpile-modules")([
  "@mui/material",
  "@mui/system"
]);

module.exports = withTM({
  reactStrictMode: true,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@mui/styled-engine": "@mui/styled-engine-sc"
    };
    config.plugins.push(new Dotenv({ silent: true }));
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });
    return config;
  }
});
