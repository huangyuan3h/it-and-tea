"use client";
import React, { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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

export interface CreateAccountPanelProps {
  token?: string;
}

const CreateAccountPanel: React.FC<CreateAccountPanelProps> = ({
  token,
}: CreateAccountPanelProps) => {
  const t = useTranslations("CreateAccount");
  const createAccountSchema = useRef<ZodSchema>();
  const locale = useLocale();
  const router = useRouter();
  const [isExpire, setExpire] = useState(false);
  const { data, isLoading } = useSWR(`${token}`, (token: string) =>
    getToken(token)
  );
  const [form, setForm] = useState({
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
  }, [data]);

  useEffect(() => {
    if (createAccountSchema.current === undefined) {
      createAccountSchema.current = z
        .object({
          email: z.string().email("请输入有效的邮箱地址"), // 验证邮箱格式
          name: z
            .string()
            .min(4, "用户名必须至少有4个字符")
            .max(50, "用户名不能超过50个字符"), // 验证长度在4到50字符之间
          password: z
            .string()
            .min(6, "密码必须至少有6个字符")
            .max(20, "密码不能超过20个字符")
            .regex(/[a-z]/, "密码必须包含小写字母")
            .regex(/[A-Z]/, "密码必须包含大写字母")
            .regex(/[0-9]/, "密码必须包含数字"), // 验证密码长度和复杂性
          confirmPassword: z.string(), // 确认密码
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "密码和确认密码必须相同",
          path: ["confirmPassword"], // 指定错误路径
        });
    }
  }, []);

  const handleChange = (key: string, val: string) => {
    setForm({ ...form, [key]: val });
  };

  const handleBlur = () => {
    console.log(form);
    const schema = z
      .object({
        email: z.string().email("请输入有效的邮箱地址"), // 验证邮箱格式
        name: z
          .string()
          .min(4, "用户名必须至少有4个字符")
          .max(50, "用户名不能超过50个字符"), // 验证长度在4到50字符之间
        password: z
          .string()
          .min(6, "密码必须至少有6个字符")
          .max(20, "密码不能超过20个字符")
          .regex(/[a-z]/, "密码必须包含小写字母")
          .regex(/[A-Z]/, "密码必须包含大写字母")
          .regex(/[0-9]/, "密码必须包含数字"), // 验证密码长度和复杂性
        confirmPassword: z.string(), // 确认密码
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "密码和确认密码必须相同",
        path: ["confirmPassword"], // 指定错误路径
      });

    const { data, success, error } = schema.safeParse(form);
    console.log(data, success, error);
    // if (createAccountSchema.current) {
    //   console.log(createAccountSchema.current.parse(form));
    // }
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
          isValid
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <InputArea
          value={form.password}
          componentKey="password"
          type="password"
          isValid
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <InputArea
          value={form.confirmPassword}
          componentKey="confirmPassword"
          type="password"
          isValid
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </CardContent>
    </Card>
  );
};

export default CreateAccountPanel;
