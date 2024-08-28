import { useTranslations } from "next-intl";
import EmailForm from "./components/RegisterPanel";

export default function Register({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("Register");

  return (
    <main>
      <div
        className="min-h-screen flex justify-center items-center"
        style={{
          background: `linear-gradient(217deg, rgba(23,21,59,.8) , #2E236C 61%),
          linear-gradient(127deg, rgba(67,61,139,.8), #C8ACD6 61%)`,
        }}
      >
        <EmailForm />
      </div>
    </main>
  );
}
