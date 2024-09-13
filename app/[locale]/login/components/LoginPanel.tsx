"use client";
import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { z, ZodSchema } from "zod";

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

type LoginFormType = {
  email: string;
  password: string;
};

type FormSchema = {
  email: ZodSchema;
  password: ZodSchema;
};

const LoginForm: React.FC = () => {
  const t = useTranslations("Login");
  const loginSchema = {
    email: z.string().email(t("emailInvalid")),
    password: z
      .string()
      .min(6, t("passwordMinLength"))
      .regex(/[a-z]/, t("passwordLowerCase"))
      .regex(/[A-Z]/, t("passwordUpperCase"))
      .regex(/[0-9]/, t("passwordNumber")),
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const locale = useLocale();
  const router = useRouter();

  const [form, setForm] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
  };

  const handleClickRegister = () => {
    router.push("register");
  };

  const handleChange = (key: string, val: string) => {
    setForm({ ...form, [key]: val });
  };

  const handleBlur = (key: string) => {
    const formSchema = loginSchema;
    const targetSchema = formSchema[key as keyof FormSchema];
    if (!targetSchema) return;

    const { success, data, error } = targetSchema.safeParse(
      form[key as keyof FormSchema]
    );
    if (success) {
      setErrorMessages({ ...errorMessages, [key]: "" });
    } else {
      setErrorMessages({
        ...errorMessages,
        [key]: JSON.parse(error.message)[0].message,
      });
    }
  };
  const isAllValid = () => {
    return (
      Object.keys(errorMessages).every(
        (k) => errorMessages[k as keyof LoginFormType] === ""
      ) &&
      Object.keys(form).every((k) => form[k as keyof LoginFormType].length > 0)
    );
  };

  return (
    <Card className="w-[480px]">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-1.5">
          <InputArea
            value={form.email}
            componentKey="email"
            type="email"
            isValid={errorMessages["email"] === ""}
            maxLength={100}
            onChange={handleChange}
            onBlur={handleBlur}
            label={t("emailLabel")}
            placeholder={t("emailPlaceholder")}
            errorMessage={errorMessages["email"]}
          />

          <InputArea
            value={form.password}
            componentKey="password"
            type="password"
            isValid={errorMessages["password"] === ""}
            errorMessage={errorMessages["password"]}
            maxLength={20}
            onChange={handleChange}
            onBlur={handleBlur}
            label={t("passwordLabel")}
            placeholder={t("passwordPlaceholder")}
          />

          <Button
            className="w-full mt-2"
            type="button"
            disabled={loading || !isAllValid()}
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
