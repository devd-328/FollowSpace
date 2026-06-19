"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

type SpeechLang = "en-US" | "ur-PK";

function getSpeechRecognitionCtor() {
  if (typeof window === "undefined") return undefined;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition;
}

function subscribeNoop() {
  return () => {};
}

function getIsSupported() {
  return Boolean(getSpeechRecognitionCtor());
}

interface UseSpeechRecognitionOptions {
  lang?: SpeechLang;
  onResult: (transcript: string) => void;
  onError?: (message: string) => void;
}

export function useSpeechRecognition({
  lang = "en-US",
  onResult,
  onError,
}: UseSpeechRecognitionOptions) {
  const [isListening, setIsListening] = useState(false);
  const isSupported = useSyncExternalStore(
    subscribeNoop,
    getIsSupported,
    () => false,
  );
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionCtor = getSpeechRecognitionCtor();
    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = lang;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      if (transcript) onResult(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      onError?.("Voice input failed. Try typing instead.");
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, [lang, onError, onResult]);

  const toggle = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      onError?.("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    recognition.lang = lang;
    recognition.start();
    setIsListening(true);
  }, [isListening, lang, onError]);

  return { isListening, isSupported, toggle };
}
