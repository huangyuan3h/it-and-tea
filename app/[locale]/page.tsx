"use client";
import { Header } from "@/components/header";
import { playVoice } from "@/components/tts-player";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("HomePage");

  const handleMouseMove = () => {
    playVoice(t("speech"), locale);
  };

  return (
    <main>
      <Header />
      <div className="container" onClick={handleMouseMove}>
        <h1>{t("welcome")}</h1>
        <p>{t("description")}</p>
      </div>
    </main>
  );
}
