"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { HTMLInputTypeAttribute, useEffect } from "react";

export interface InputAreaProps {
  value: string;
  componentKey: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  isValid?: boolean;
  errorMessage?: string;
  maxLength?: number;
  onChange?: (componentKey: string, value: string) => void;
  onBlur?: (componentKey: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({
  value,
  componentKey,
  type = "text",
  disabled,
  isValid,
  errorMessage,
  maxLength,
  onChange,
  onBlur,
}: InputAreaProps) => {
  const t = useTranslations("CreateAccount");

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const currentValue = e.target.value;
    if (onChange) {
      onChange(componentKey, currentValue);
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(componentKey);
    }
  };

  return (
    <div className="grid w-full items-center gap-1.5 mt-4">
      <Label htmlFor={componentKey}>{t(componentKey + "Label")}</Label>
      <Input
        type={type}
        placeholder={t(componentKey + "Placeholder")}
        value={value}
        onChange={handleValueChange}
        onBlur={handleBlur}
        disabled={disabled}
        maxLength={maxLength}
        className={`w-full ${
          !isValid ? "!ring-1 !ring-red-500 !ring-offset-0" : ""
        }`}
      />
      {!isValid && <div className="text-red-500 text-xs">{errorMessage}</div>}
    </div>
  );
};

export default InputArea;
