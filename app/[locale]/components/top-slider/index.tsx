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

export const TopSlider: React.FC<{}> = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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
          <SliderItem href={"/"} src="/images/home-north-path.jpg" />
        </CarouselItem>
        <CarouselItem>
          <SliderItem href={"/"} src="/images/kairos.jpg" />
        </CarouselItem>
        <CarouselItem>
          <SliderItem href={"/"} src="/images/store.jpg" />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious variant={"secondary"} />
      <CarouselNext variant={"secondary"} />
    </Carousel>
  );
};
