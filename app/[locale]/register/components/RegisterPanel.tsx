"use client";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTranslations, useLocale } from "next-intl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { mutate } from "swr";
import APIClient from "@/utils/apiClient";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const submitEmail = async (email: string, locale: string) => {
  const client = new APIClient();
  const response = await client.post("register", {
    email,
    locale,
  });

  return response;
};

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState(false);
  const t = useTranslations("Register");
  const locale = useLocale();
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
  };

  const handleInputBlur = () => {
    if (email.length === 0 || !emailRegex.test(email)) {
      setIsValid(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await mutate("/register", submitEmail(email, locale), {
        revalidate: false,
      });
      setLoading(false);
      setEmailSent(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (emailSent) {
      setTimeout(() => {
        router.push("login");
      }, 30000);
    }
  }, [emailSent]);

  const handleClickLogin = () => {
    router.push("login");
  };

  return (
    <Card className="w-[480px]">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("onboard")}</CardDescription>
      </CardHeader>
      <CardContent>
        {emailSent && (
          <Alert className="mb-4">
            <AlertTitle>{t("emailAlertTitle")}</AlertTitle>
            <AlertDescription>{t("emailAlertDescription")}</AlertDescription>
          </Alert>
        )}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            type="email"
            placeholder={t("registerPlaceholder")}
            value={email}
            onChange={handleEmailChange}
            onBlur={handleInputBlur}
            disabled={emailSent}
            className={`w-full ${
              !isValid && !emailRegex.test(email)
                ? "!ring-1 !ring-red-500 !ring-offset-0"
                : ""
            }`}
          />
          {!isValid && !emailRegex.test(email) && (
            <div className="text-red-500 text-xs">{t("invalidEmail")}</div>
          )}
          <Button
            className="w-full mt-2"
            type="button"
            disabled={!emailRegex.test(email) || loading || emailSent}
            onClick={handleSubmit}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

            {t("submit")}
          </Button>
        </div>

        <Separator className="mt-4" />
        <div className="mt-2">
          <Label> {t("loginLabel")}</Label>
          <Button
            variant="secondary"
            className="w-full mt-2"
            type="button"
            onClick={handleClickLogin}
          >
            {t("login")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailForm;
