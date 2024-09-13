import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const AvatarComponent = () => {
  const locale = useLocale();
  const router = useRouter();
  const handleClick = () => {
    router.push(`${locale}/login`);
  };
  return (
    <Avatar className="cursor-pointer" onClick={handleClick}>
      <AvatarImage src={"/svgs/user.svg"} />
      <AvatarFallback>User</AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
