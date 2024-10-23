import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const Footer: React.FC = () => {
  const t = useTranslations("common");
  const currentYear = new Date().getFullYear();
  const locale = useLocale();

  return (
    <footer className="bg-gray-100 text-gray-800 py-6 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-36">
      <div className="w-full h-px bg-gray-200 mb-6"></div>
      <div className="container mx-auto flex flex-col items-center justify-center space-y-4">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
          <Link
            href="/about"
            className="font-medium text-gray-700 hover:text-gray-900 transition duration-300"
          >
            {t("footer.about")}
          </Link>
          <Link
            href="https://north-path.it-t.xyz/contact"
            className="font-medium text-gray-700 hover:text-gray-900 transition duration-300"
          >
            {t("footer.contact")}
          </Link>
          <Link
            href={`/${locale}/policy`}
            className="font-medium text-gray-700 hover:text-gray-900 transition duration-300"
          >
            {t("footer.privacyPolicy")}
          </Link>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          © {currentYear} IT&TEA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
