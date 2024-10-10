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
import { Button, LinkButton } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sliderData = {
  items: [
    {
      src: "/images/north-path.jpg",
      alt: "north path",
      title: "slider.northPathTitle",
      subtitle: "slider.northPathSubtitle",
      description: "slider.northPathDescription",
      buttonText: "slider.northPathButton",
      buttonAction: "navigate",
      buttonUrl: "https://north-path.it-t.xyz/",
    },
    {
      src: "/images/kairos.jpg",
      alt: "kairos",
      title: "slider.kairosTitle",
      subtitle: "slider.kairosSubtitle",
      description: "slider.kairosDescription",
      buttonText: "slider.kairosButton",
      buttonAction: "navigate",
      buttonUrl: "https://kairos.it-t.xyz/predict-report",
    },
    // {
    //   src: "/images/store.jpg",
    //   alt: "store",
    //   title: "slider.storeTitle",
    //   subtitle: "slider.storeSubtitle",
    //   description: "slider.storeDescription",
    //   buttonText: "slider.storeButton",
    //   buttonAction: "navigate",
    //   buttonUrl: "https://store.it-t.xyz/",
    // },
    // {
    //   src: "/images/components.jpg",
    //   alt: "components",
    //   title: "slider.componentsTitle",
    //   subtitle: "slider.componentsSubtitle",
    //   description: "slider.componentsDescription",
    //   buttonText: "slider.componentsButton",
    //   buttonAction: "navigate",
    //   buttonUrl: "https://components.it-t.xyz/",
    // },
  ],
};

export const TopSlider: React.FC<{}> = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const router = useRouter();
  const t = useTranslations("HomePage");

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleButtonClick = (action: string, url?: string) => {
    if (action === "navigate" && url) {
      router.push(url);
    }
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
        {sliderData.items.map((item, index) => (
          <CarouselItem key={index}>
            <SliderItem src={item.src} alt={item.alt}>
              {item.title && (
                <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-start items-center h-full">
                  <div className="text-white px-24">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl">
                      {t(item.title)}
                    </h2>
                    <h3 className="text-xl md:text-2xl lg:text-3xl mt-2">
                      {t(item.subtitle)}
                    </h3>
                    <p className="text-lg md:text-xl lg:text-2xl mt-2">
                      {t(item.description)}
                    </p>
                    {item.buttonText && item.buttonAction && (
                      <LinkButton
                        className="mt-4"
                        variant={"secondary"}
                        href={item.buttonUrl}
                      >
                        {t(item.buttonText)}
                      </LinkButton>
                    )}
                  </div>
                </div>
              )}
            </SliderItem>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious variant={"secondary"} />
      <CarouselNext variant={"secondary"} />
    </Carousel>
  );
};
