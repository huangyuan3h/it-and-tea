import { breakpoints } from "@/utils/breakpoint";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useEffect, useState } from "react";
import Image from "next/image";

interface SliderItemProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
}

export const SliderItem: React.FC<SliderItemProps> = ({
  src,
  alt,
  children,
}: SliderItemProps) => {
  const windowWidth = useWindowWidth();
  const [aspectRatio, setAspectRatio] = useState(9 / 9);

  useEffect(() => {
    const calculateAspectRatio = () => {
      if (windowWidth >= breakpoints.lg) {
        return 16 / 9;
      } else if (windowWidth >= breakpoints.md) {
        return 14 / 9;
      } else if (windowWidth >= breakpoints.sm) {
        return 12 / 9;
      } else {
        return 9 / 9;
      }
    };

    setAspectRatio(calculateAspectRatio());
  }, [windowWidth]);

  return (
    <div className="relative">
      <AspectRatio ratio={aspectRatio} className="bg-muted">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </AspectRatio>
      {children}
    </div>
  );
};
