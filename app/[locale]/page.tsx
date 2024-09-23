"use client";
import { Header } from "@/components/header";

import { useTranslations } from "next-intl";
import { TopSlider } from "./components/top-slider";
import { Text2Speech } from "./components/tts/Text2Speech";
import Hero from "./components/hero-video";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("HomePage");

  return (
    <main>
      <Header />
      <Hero />
      <Text2Speech />
      <TopSlider />
      <div className="container">
        <h1>{t("welcome")}</h1>
        <p>{t("description")}</p>
      </div>
    </main>
  );
}
