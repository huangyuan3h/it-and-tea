import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Assuming your Shadcn button component is here
import { useTranslations } from "next-intl";

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("HomePage");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute object-cover w-full h-full"
      >
        <source src="/images/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full md:items-end md:pr-20">
        <h1
          className={`text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-center md:text-right ${
            isMounted ? "animate-fadeInUp" : ""
          }`}
        >
          {t("hero.title")}
        </h1>

        <p
          className={`text-white text-sm sm:text-base md:text-lg lg:text-xl mt-4 md:mt-8 text-center md:text-right px-4 md:px-0 ${
            isMounted ? "animate-fadeInUp" : ""
          }`}
        >
          {t("hero.description")}
        </p>

        <Button
          className={`mt-4 md:mt-8 ${isMounted ? "animate-fadeInUp" : ""}`}
        >
          {t("hero.button")}
        </Button>
      </div>
    </div>
  );
};

export default Hero;
