import { useTranslations } from "next-intl";

export const BeforeSlider: React.FC = () => {
  const t = useTranslations("HomePage");
  return (
    <section className="bg-gradient-to-b bg-white py-16 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          {t("beforeSlider.title")}
        </h2>
      </div>
    </section>
  );
};
