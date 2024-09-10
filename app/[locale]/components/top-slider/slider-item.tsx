import Link from "next/link";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useWindowWidth } from "@/utils/hooks/useWindowWidth";
import { breakpoints } from "@/utils/breakpoint";

export interface SliderItemProps {
  href: string;
  src: string;
  alt: string;
}

export const SliderItem: React.FC<SliderItemProps> = ({
  href,
  src,
  alt,
}: SliderItemProps) => {
  const windowWidth = useWindowWidth();

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
    <Link href={href}>
      <AspectRatio ratio={getAspectRatio()} className="bg-muted">
        <Image
          src={src}
          alt="alt"
          fill
          className="h-full w-full object-cover"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </AspectRatio>
    </Link>
  );
};
