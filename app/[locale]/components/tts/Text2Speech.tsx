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
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { locales } from "@/i18n";
import { Loader2, Play } from "lucide-react";

interface AudioResponse {
  url: string;
}

type Locale = (typeof locales)[number];

const voiceConfig: { [key in Locale]: string } = {
  en: "en-CA-LiamNeural",
  fr: "fr-CA-SylvieNeural",
  zh: "zh-CN-YunxiNeural",
};

const voiceDefaultURL: { [key in Locale]: string } = {
  en: "https://production-it-t-tts.s3.amazonaws.com/c22c2570-9992-47bc-ad4d-6b411c077dbd.mp3",
  fr: "https://production-it-t-tts.s3.amazonaws.com/c2d5494a-626d-47b3-a14f-9cdc29a12dd5.mp3",
  zh: "https://production-it-t-tts.s3.amazonaws.com/4d2a8c2c-5527-45e1-95a2-a7165482d4e4.mp3",
};

export const Text2Speech: React.FC = () => {
  const t = useTranslations("HomePage");

  const initialValue = t("tts.textareaValue");
  const [text, setText] = useState(initialValue);
  const [isSameAsInitial, setIsSameAsInitial] = useState(true);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const locale = useLocale();

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [audioUrl]);

  useEffect(() => {
    const handleEnded = () => setIsPlaying(false);

    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleEnded);
      return () => audioRef.current?.removeEventListener("ended", handleEnded);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    setText(newValue);
    setIsSameAsInitial(newValue === initialValue);
  };

  const handleButtonClick = async () => {
    if (isSameAsInitial) {
      setAudioUrl(voiceDefaultURL[locale] + "?t=" + new Date().getTime());
      return;
    }

    setLoading(true);
    try {
      if (!process.env.NEXT_PUBLIC_BACKEND_TTS) return;

      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_TTS, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voice: voiceConfig[locale],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: AudioResponse = await response.json();
      setAudioUrl(data.url + "?t=" + new Date().getTime());
      setLoading(false);
    } catch (error) {
      console.error("Error fetching audio:", error);
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
              maxLength={100}
            />
          </div>
          <Button
            className="mt-4"
            onClick={handleButtonClick}
            disabled={text.length === 0 || loading || isPlaying}
          >
            {loading || isPlaying ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Play className="mr-2 h-4 w-4 " />
            )}
            {t("tts.buttonText")}
          </Button>
        </CardContent>
      </Card>
      <audio ref={audioRef} src={audioUrl ?? ""} style={{ display: "none" }} />
      <div className={styles.ttsBackground}></div>
    </div>
  );
};
