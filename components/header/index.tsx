import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LanguageSelector from "./LanguageSelector";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur drop-shadow">
      <div className="container flex h-14 items-center justify-between">
        <Link href={"/"} className="font-bold lg:inline-block">
          IT&TEA
        </Link>
        <div className="flex gap-x-4">
          <LanguageSelector />
          <Avatar className="cursor-pointer">
            <AvatarImage src={"/svgs/user.svg"} />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
