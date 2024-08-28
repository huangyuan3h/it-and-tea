/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./i18n/index.ts");

let nextConfig = {};

nextConfig = withNextIntl(nextConfig);

export default nextConfig;
