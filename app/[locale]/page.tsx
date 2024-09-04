"use client";
import { Header } from "@/components/header";

import { useTranslations } from "next-intl";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("HomePage");

  return (
    <main>
      <Header />
      <div className="container">
        <h1>{t("welcome")}</h1>
        <p>{t("description")}</p>
      </div>
    </main>
  );
}
