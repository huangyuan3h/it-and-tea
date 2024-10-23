import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "zh", "fr"],

  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/(about|policy)?", "/(en|zh|fr)/:path*"],
};
