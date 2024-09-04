"use client";
import React, { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSWR, { mutate } from "swr";
import APIClient from "@/utils/apiClient";
import InputArea from "./InputArea";
import { z, ZodSchema } from "zod";

const getToken = async (token: string) => {
  const client = new APIClient();
  try {
    const response = await client.post("verify-email-token", {
      token,
    });
    if (response.message !== "") {
      return null;
    }
    return response;
  } catch (err) {
    return null;
  }
};

type CreateAccountRequest = {
  name: string;
  password: string;
  token: string;
};

const submitCreateAccount = async (data: CreateAccountRequest) => {
  const client = new APIClient();
  try {
    const response = await client.post("create-account", data);
    return response;
  } catch (err) {
    return null;
  }
};

export interface CreateAccountPanelProps {
  token?: string;
}

type FormSchema = {
  email: ZodSchema;
  name: ZodSchema;
  password: ZodSchema;
  confirmPassword: ZodSchema;
};

type CreateFormType = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

const CreateAccountPanel: React.FC<CreateAccountPanelProps> = ({
  token,
}: CreateAccountPanelProps) => {
  const t = useTranslations("CreateAccount");
  const createAccountSchema = useRef<FormSchema>();
  const locale = useLocale();
  const router = useRouter();
  const [isExpire, setExpire] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { data, isLoading } = useSWR(`${token}`, (token: string) =>
    getToken(token)
  );
  const [form, setForm] = useState<CreateFormType>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessages, setErrorMessages] = useState<CreateFormType>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!data && !isLoading) {
      setExpire(true);
      setTimeout(() => {
        router.push(`/${locale}/register`);
      }, 1000 * 30);
    }

    if (data && !isLoading) {
      setForm({ ...form, email: data.email });
    }
  }, [data, isLoading, locale, router, form]);

  useEffect(() => {
    createAccountSchema.current = {
      email: z.string().email(t("emailInvalid")),
      name: z.string().min(6, t("nameMinLength")),
      password: z
        .string()
        .min(6, t("passwordMinLength"))
        .regex(/[a-z]/, t("passwordLowerCase"))
        .regex(/[A-Z]/, t("passwordUpperCase"))
        .regex(/[0-9]/, t("passwordNumber")),
      confirmPassword: z.literal(form.password, {
        errorMap: () => ({ message: t("passwordMismatch") }),
      }),
    };
  }, [form.password]);

  const handleChange = (key: string, val: string) => {
    setForm({ ...form, [key]: val });
  };

  const handleBlur = (key: string) => {
    if (!createAccountSchema.current) return;

    const formSchema = createAccountSchema.current;
    const targetSchema = formSchema[key as keyof FormSchema];

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

  const handleSubmit = async () => {
    setLoading(true);
    const result = await mutate(
      "/create-account",
      submitCreateAccount({
        name: form.name,
        password: form.password,
        token: token ?? "",
      }),
      {
        revalidate: false,
      }
    );
    if (result.Authorization !== "") {
      // set cookies
      setCookie(null, "Authorization", result.Authorization);

      toast(t("accountCreationSuccessTitle"), {
        description: t("accountCreationSuccessDescription"),
        action: {
          label: t("returnToHomepage"),
          onClick: () => router.push(`/${locale}/`),
        },
      });

      setTimeout(() => {
        router.push(`/${locale}/`);
      }, 5000);
    }
  };

  const isAllValid = () => {
    return (
      Object.keys(errorMessages).every(
        (k) => errorMessages[k as keyof CreateFormType] === ""
      ) &&
      Object.keys(form).every(
        (k) => form[k as keyof CreateFormType].length > 0
      ) &&
      form.password === form.confirmPassword
    );
  };

  return (
    <Card className="w-[480px]">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        {isExpire && (
          <div>
            <Alert className="mb-4">
              <AlertTitle>{t("tokenExpiredTitle")}</AlertTitle>
              <AlertDescription>
                {t("tokenExpiredDescription")}
              </AlertDescription>
            </Alert>
            <div className="mt-4">
              <Button
                className="w-full mt-2"
                type="button"
                onClick={() => router.push(`/${locale}/register`)}
              >
                {t("backToRegister")}
              </Button>
            </div>
          </div>
        )}

        <InputArea
          disabled
          value={form.email}
          componentKey="email"
          type="email"
          isValid
        />

        <InputArea
          value={form.name}
          componentKey="name"
          isValid={errorMessages["name"] === ""}
          errorMessage={errorMessages["name"]}
          maxLength={50}
          onChange={handleChange}
          onBlur={handleBlur}
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
        />
        <InputArea
          value={form.confirmPassword}
          componentKey="confirmPassword"
          type="password"
          isValid={errorMessages["confirmPassword"] === ""}
          errorMessage={errorMessages["confirmPassword"]}
          maxLength={20}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Button
          className="w-full mt-6"
          type="button"
          onClick={handleSubmit}
          disabled={loading || !isAllValid()}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("createAccount")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreateAccountPanel;
