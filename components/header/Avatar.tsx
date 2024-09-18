import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useUser } from "../user-context";

const AvatarComponent = () => {
  const locale = useLocale();
  const router = useRouter();
  const { user } = useUser();
  console.log(user);

  const url = user?.avatar ?? "/svgs/user.svg";

  const handleClick = () => {
    if (!user) {
      router.push(`${locale}/login`);
    } else {
      router.push(`${locale}/profile`);
    }
  };
  return (
    <Avatar className="cursor-pointer" onClick={handleClick}>
      <AvatarImage src={url} />
      <AvatarFallback>User</AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
