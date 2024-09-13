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

type LoginFormType = {
  email: string;

  password: string;
};

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState(false);
  const t = useTranslations("Login");
  const locale = useLocale();
  const router = useRouter();

  const [form, setForm] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
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
  }, [emailSent, router]);

  const handleClickRegister = () => {
    router.push("register");
  };

  return (
    <Card className="w-[480px]">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-1.5">
          <div className="mt-2">
            <Label htmlFor="email">{t("password")}</Label>
            <Input
              type="password"
              placeholder={t("passwordPlaceholder")}
              value={password}
              onChange={handlePasswordChange}
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
          </div>
          <Button
            className="w-full mt-2"
            type="button"
            disabled={!emailRegex.test(email) || loading || emailSent}
            onClick={handleSubmit}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}

            {t("submit")}
          </Button>
          <Button
            className="w-full mt-2"
            type="button"
            variant={"link"}
            onClick={handleClickRegister}
          >
            {t("register")}
          </Button>
        </div>

        <Separator className="mt-4" />
        <div className="mt-2">
          <Label> {t("socialLabel")}</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
