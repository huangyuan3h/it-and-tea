"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const t = useTranslations("Register");

  // 处理Email的变化并验证Email格式
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);

    // 使用简单的正则表达式验证Email格式

    setIsValid(currentEmail.length === 0 || emailRegex.test(currentEmail));
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isValid) {
      alert("Email submitted: " + email);
      // 此处可以添加提交逻辑
    } else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <Card className="w-[480px] h-[340px]">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("onboard")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            type="email"
            placeholder={t("registerPlaceholder")}
            value={email}
            onChange={handleEmailChange}
            className={`w-full ${
              !isValid ? "!ring-1 !ring-red-500 !ring-offset-0" : ""
            }`}
          />
          <Button
            className="w-full mt-2"
            type="button"
            disabled={!emailRegex.test(email)}
          >
            {t("submit")}
          </Button>
        </div>

        <Separator className="mt-4" />
        <div className="mt-2">
          <Label> {t("loginLabel")}</Label>
          <Button variant="secondary" className="w-full mt-2" type="button">
            {t("login")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailForm;
