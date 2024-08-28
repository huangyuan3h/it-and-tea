"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const EmailForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  // 处理Email的变化并验证Email格式
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // 使用简单的正则表达式验证Email格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(e.target.value));
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
    <Card className="w-[480px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className={`w-64 ${!isValid ? "border-red-500" : ""}`}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">Submit</Button>
      </CardFooter>
    </Card>
  );
};

export default EmailForm;
