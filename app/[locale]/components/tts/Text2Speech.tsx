"use client";
import styles from "./tts.module.scss";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const Text2Speech: React.FC = () => {
  const t = useTranslations("HomePage");

  const initialValue = t("tts.textareaValue");
  const [text, setText] = useState(initialValue);
  const [isSameAsInitial, setIsSameAsInitial] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    if (newValue.length <= 100) {
      setText(newValue);
      setIsSameAsInitial(newValue === initialValue);
    }
  };

  return (
    <div className="relative flex padding justify-center item-center">
      <Card className="max-w-[600px] w-full my-24">
        <CardHeader>
          <CardTitle>{t("tts.cardTitle")}</CardTitle>
          <CardDescription>{t("tts.cardDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">{t("tts.labelText")}</Label>
            <Textarea
              placeholder={t("tts.textareaPlaceholder")}
              value={text}
              onChange={handleInputChange}
            />
          </div>
          <Button className="mt-4" disabled={text.length === 0}>
            {t("tts.buttonText")}
          </Button>
        </CardContent>
      </Card>
      <div className={styles.ttsBackground}></div>
    </div>
  );
};
