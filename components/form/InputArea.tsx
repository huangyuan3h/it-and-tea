"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute, useState } from "react";

export interface InputAreaProps {
  label: string;
  value: string;
  placeholder: string;
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
  label,
  value,
  placeholder,
  componentKey,
  type = "text",
  disabled,
  isValid,
  errorMessage,
  maxLength,
  onChange,
  onBlur,
}: InputAreaProps) => {
  const [hasBlur, setHasBlur] = useState(false);
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const currentValue = e.target.value;
    if (onChange) {
      onChange(componentKey, currentValue);
    }
  };

  const handleBlur = () => {
    setHasBlur(true);
    if (onBlur) {
      onBlur(componentKey);
    }
  };

  const componentShowError = !isValid && value.length > 0 && hasBlur;

  return (
    <div className="grid w-full items-center gap-1.5 mt-4">
      <Label htmlFor={componentKey}>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleValueChange}
        onBlur={handleBlur}
        disabled={disabled}
        maxLength={maxLength}
        className={`w-full ${
          componentShowError ? "!ring-1 !ring-red-500 !ring-offset-0" : ""
        }`}
      />
      {componentShowError && (
        <div className="text-red-500 text-xs">{errorMessage}</div>
      )}
    </div>
  );
};

export default InputArea;
