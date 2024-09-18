import Link from "next/link";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import { breakpoints } from "@/utils/breakpoint";
import { useEffect, useState } from "react";

export interface SliderItemProps {
  src: string;
  alt: string;
  children?: React.ReactElement;
}

export const SliderItem: React.FC<SliderItemProps> = ({
  src,
  alt,
  children,
}: SliderItemProps) => {
  const windowWidth = useWindowWidth();
  const [ratio, setRatio] = useState(9 / 9);

  useEffect(() => {
    setRatio(getAspectRatio());
  }, [windowWidth]);

  const getAspectRatio = () => {
    if (windowWidth >= breakpoints.lg) {
      return 18 / 9;
    } else if (windowWidth >= breakpoints.md) {
      // lg breakpoint
      return 16 / 9;
    } else if (windowWidth >= breakpoints.sm) {
      // md breakpoint
      return 12 / 9;
    } else {
      // Mobile (below md)
      return 9 / 9;
    }
  };

  return (
    <div className="relative">
      <AspectRatio
        ratio={ratio}
        className="bg-muted"
        style={{ maxHeight: "780px" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="h-full w-full object-cover"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </AspectRatio>
      {children}
    </div>
  );
};
