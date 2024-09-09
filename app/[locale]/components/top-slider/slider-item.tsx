import Link from "next/link";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface SliderItemProps {
  href: string;
  src: string;
}

export const SliderItem: React.FC<SliderItemProps> = ({
  href,
  src,
}: SliderItemProps) => {
  return (
    <Link href={href}>
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <Image
          src={src}
          alt="Photo by Drew Beamer"
          fill
          className="h-full w-full object-cover"
        />
      </AspectRatio>
    </Link>
  );
};
