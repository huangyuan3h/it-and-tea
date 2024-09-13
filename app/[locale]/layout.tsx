import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import "../globals.css";
import { locales } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import { DOMAIN_URL } from "@/config/domain";
import { UserProvider } from "@/components/user-context";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "HomePage" });

  const metadata: Metadata = {
    title: t("meta.title"),
    description: t("meta.description"),
    applicationName: "IT and TEA",
    authors: { name: "Yuan Huang", url: "https://github.com/huangyuan3h" },
    creator: "Yuan Huang",
    keywords: [
      t("meta.keywords.ai_solutions"),
      t("meta.keywords.business_innovation"),
      t("meta.keywords.artificial_intelligence"),
      t("meta.keywords.data_analysis"),
      t("meta.keywords.automation"),
      t("meta.keywords.ai_powered_products"),
      t("meta.keywords.digital_transformation"),
      t("meta.keywords.ai_company"),
      t("meta.keywords.cutting_edge_technology"),
      t("meta.keywords.it_services"),
    ],
  };
  return metadata;
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <UserProvider>{children}</UserProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
