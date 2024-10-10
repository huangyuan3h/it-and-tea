import Link from "next/link";

import LanguageSelector from "./LanguageSelector";
import Avatar from "./Avatar";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur drop-shadow">
      <div className="container flex h-14 items-center justify-between">
        <Link href={"/"} className="font-bold lg:inline-block">
          IT&TEA
        </Link>
        <div className="flex gap-x-4">
          <LanguageSelector />
          <Avatar />
        </div>
      </div>
    </header>
  );
};
