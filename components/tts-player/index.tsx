"use client";

const voiceConfig: { [key in string]: string } = {
  en: "Google UK English Female",
  fr: "Google français",
  zh: "Google 普通话（中国大陆）",
};

export const playVoice = (text: string, locale = "en") => {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();

  if (!text || !voices) return;

  let voice = null;

  for (let v of voices) {
    console.log(v.name);
    if (v.name === voiceConfig[locale]) {
      console.log(v.name);
      voice = v;
      break;
    }
  }

  if (!voice) {
    console.error("Voice not found");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.pitch = 1;
  utterance.rate = 1;
  utterance.volume = 1;
  utterance.voice = voice ?? voices[0];

  window.speechSynthesis.speak(utterance);
};
