import { unstable_setRequestLocale } from "next-intl/server";
import CreateAccountPanel from "./components/CreateAccountPanel";

export default function CreateToken({
  params: { locale, token },
}: {
  params: { locale: string; token: string };
}) {
  unstable_setRequestLocale(locale);

  return (
    <main>
      <div
        className="min-h-screen flex justify-center items-center"
        style={{
          background: `linear-gradient(217deg, rgba(23,21,59,.8) , #2E236C 61%),
          linear-gradient(127deg, rgba(67,61,139,.8), #C8ACD6 61%)`,
        }}
      >
        <CreateAccountPanel token={token} />
      </div>
    </main>
  );
}
