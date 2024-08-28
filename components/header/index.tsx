import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur drop-shadow">
      <div className="container flex h-14 items-center">
        <Link href={"/"} className="font-bold lg:inline-block text-green-800">
          IT & Tea
        </Link>
      </div>
    </header>
  );
};
