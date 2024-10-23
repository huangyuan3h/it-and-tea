import { useTranslations } from "next-intl";
import React from "react";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl not:first:mt-4">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
      <p className="text-sm font-medium text-gray-600 mb-4">{role}</p>
      <p className="text-sm text-gray-700 text-center">{bio}</p>
    </div>
  );
};

const Team: React.FC = () => {
  const t = useTranslations("about");
  return (
    <section className="py-12 container">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        {t("teamTitle")}
      </h2>
      <div className="flex justify-center flex-col">
        <TeamMember
          name="Yuan Huang"
          role={t("fullstackDeveloper")}
          bio={t("yuanBio")}
        />
      </div>
    </section>
  );
};

export default Team;
