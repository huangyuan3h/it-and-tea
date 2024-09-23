"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";

import { SliderItem } from "./slider-item";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export const TopSlider: React.FC<{}> = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const router = useRouter();
  const t = useTranslations("HomePage");

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleClickVisitNorthPath = () => {
    router.push("https://north-path.it-t.xyz/");
  };

  const handleClickVisitKairos = () => {
    router.push("https://kairos.it-t.xyz/predict-report");
  };

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      setApi={setApi}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <SliderItem src="/images/north-path.jpg" alt="north path">
            <div className="absolute top-20 text-white left-24 w-80">
              <h2 className="text-6xl">{t("northPathTitle")}</h2>
              <h3 className="text-2xl mt-2">{t("northPathSubtitle")}</h3>
              <p className="text-xl mt-2">{t("northPathDescription")}</p>
              <Button
                variant={"secondary"}
                className="mt-4"
                onClick={handleClickVisitNorthPath}
              >
                Visit North Path
              </Button>
            </div>
          </SliderItem>
        </CarouselItem>
        <CarouselItem>
          <SliderItem src="/images/kairos.jpg" alt="kairos">
            <div className="absolute top-40 text-white left-24 w-80">
              <h2 className="text-6xl">KAIROS</h2>
              <h3 className="text-2xl mt-2">加拿大华人新移民指南</h3>
              <p className="text-xl mt-2">
                North Path
                专为中国新移民打造，提供全面的加拿大移民、留学资讯及生活指南。我们涵盖签证申请、住房、就业等实用信息，同时还提供最新的加拿大新闻、娱乐动态，帮助您顺利融入加拿大生活。
              </p>
              <Button
                variant={"secondary"}
                className="mt-4"
                onClick={handleClickVisitKairos}
              >
                Visit Kairos
              </Button>
            </div>
          </SliderItem>
        </CarouselItem>
        <CarouselItem>
          <SliderItem src="/images/store.jpg" alt="store" />
        </CarouselItem>
        <CarouselItem>
          <SliderItem src="/images/components.jpg" alt="components" />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious variant={"secondary"} />
      <CarouselNext variant={"secondary"} />
    </Carousel>
  );
};
