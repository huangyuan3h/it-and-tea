"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

type LanguageKey = "en" | "fr" | "zh";

const languageMapping: { [key in LanguageKey]: string } = {
  en: "English",
  fr: "Français",
  zh: "中文",
};

const LanguageSelector: React.FC = () => {
  const locale = useLocale();
  const router = useRouter();

  const handleChange = (l: string) => {
    const newUrl = window.location.href.replace(locale, l);
    console.log(newUrl);
    router.push(newUrl);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="text-sm font-medium leading-none self-center cursor-pointer">
          {languageMapping[locale as LanguageKey]}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-12">
        {Object.keys(languageMapping).map((k: string) => (
          <DropdownMenuCheckboxItem
            checked={locale === k}
            onCheckedChange={() => handleChange(k)}
            key={`language-selector-${k}`}
          >
            {languageMapping[k as LanguageKey]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
