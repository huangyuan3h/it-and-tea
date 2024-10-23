"use client";

import Footer from "@/components/footer";
import { Header } from "@/components/header";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Team from "./components/team";

export default function Contact() {
  const t = useTranslations("about");
  return (
    <main>
      <Header />
      <div className="container flex flex-col mt-4">
        <div className="flex bg-slate-50 flex-col md:flex-row">
          <div className="grow flex self-center justify-center w-full h-full">
            <div className="p-8 md:p-16 text-center">
              <h2 className="text-4xl font-bold">{t("aboutTitle")}</h2>
              <p className="mt-4">{t("aboutDescription")}</p>
            </div>
          </div>
          <div className="grow w-full">
            <Image
              src="/images/deepMind.jpg"
              alt="AI"
              width={800}
              height={400}
            />
          </div>
        </div>
        <div className="flex bg-slate-50 flex-col md:flex-row">
          <div className="grow w-full">
            <Image
              src="/images/competition.jpg"
              alt="AI"
              width={800}
              height={400}
            />
          </div>
          <div className="grow flex self-center justify-center w-full h-full">
            <div className="p-8 md:p-16 text-center">
              <h2 className="text-4xl font-bold">{t("storyTitle")}</h2>
              <p className="mt-4">{t("storyDescription")}</p>
            </div>
          </div>
        </div>
        <div className="flex bg-slate-50  flex-col md:flex-row">
          <div className="grow flex self-center justify-center w-full h-full">
            <div className="p-8 md:p-16 text-center">
              <h2 className="text-4xl font-bold">{t("missionTitle")}</h2>
              <p className="mt-4">{t("missionDescription")}</p>
            </div>
          </div>
          <div className="grow w-full">
            <Image
              src="/images/cooperation.jpg"
              alt="AI"
              width={800}
              height={400}
            />
          </div>
        </div>
      </div>
      <Team />
      <Footer />
    </main>
  );
}
