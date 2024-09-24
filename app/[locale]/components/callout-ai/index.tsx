import { useTranslations } from "next-intl";
import React from "react";

const CalloutAI: React.FC = () => {
  const t = useTranslations("HomePage");
  return (
    <section className="bg-gradient-to-b from-green-200 to-green-300 py-16 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {t("calloutAI.title")}
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          {t("calloutAI.description")}
        </p>
      </div>
    </section>
  );
};

export default CalloutAI;
