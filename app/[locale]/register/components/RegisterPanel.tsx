"use client";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import InputArea from "@/components/form/InputArea";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState(false);
  const t = useTranslations("Register");
  const locale = useLocale();
  const router = useRouter();

  const handleEmailChange = (val: string) => {
    setEmail(val);
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
  }, [emailSent, router]);

  const handleClickLogin = () => {
    router.push("login");
  };

  return (
    <Card className="w-[480px] max-md:rounded-none max-md:w-[768px] max-md:h-screen">
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
          <InputArea
            label={t("email")}
            value={email}
            placeholder={t("registerPlaceholder")}
            componentKey={"email"}
            type={"email"}
            disabled={emailSent}
            isValid={emailRegex.test(email)}
            errorMessage={t("invalidEmail")}
            maxLength={100}
            onChange={(_: string, val: string) => handleEmailChange(val)}
          />
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
