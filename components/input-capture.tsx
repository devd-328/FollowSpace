"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { ExtractionReview } from "@/components/extraction-review";
import { Button } from "@/components/ui/button";
import { useSpeechRecognition } from "@/lib/hooks/use-speech-recognition";
import type { ExtractedFollowUp } from "@/lib/types/domain";
import { cn } from "@/lib/utils/cn";

type SpeechLang = "en-US" | "ur-PK";

export function InputCapture() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [lang, setLang] = useState<SpeechLang>("en-US");
  const [extracting, setExtracting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [extracted, setExtracted] = useState<ExtractedFollowUp | null>(null);
  const [extractionSource, setExtractionSource] = useState<
    "gemini" | "mock" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const handleTranscript = useCallback((transcript: string) => {
    setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
    setError(null);
  }, []);

  const { isListening, isSupported, toggle } = useSpeechRecognition({
    lang,
    onResult: handleTranscript,
    onError: setError,
  });

  async function handleExtract(event: React.FormEvent) {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;

    setExtracting(true);
    setError(null);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: value }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Could not extract follow-up");
      }

      setExtracted(data.extracted);
      setExtractionSource(data.source ?? "mock");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setExtracting(false);
    }
  }

  async function handleSave() {
    if (!extracted) return;

    setSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/followups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(extracted),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Could not save follow-up");
      }

      setText("");
      setExtracted(null);
      setExtractionSource(null);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit() {
    setExtracted(null);
    setExtractionSource(null);
  }

  function handleCancel() {
    setExtracted(null);
    setExtractionSource(null);
    setError(null);
  }

  if (extracted) {
    return (
      <ExtractionReview
        extracted={extracted}
        source={extractionSource ?? undefined}
        saving={saving}
        onSave={handleSave}
        onEdit={handleEdit}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <form onSubmit={handleExtract} className="space-y-3">
      <div className="relative">
        <textarea
          className="min-h-[120px] w-full resize-y rounded-md border border-gray-100 bg-surface py-3 pl-4 pr-12 text-sm text-ink outline-none transition-colors placeholder:text-gray-200 focus:border-brand focus:ring-2 focus:ring-brand/15"
          placeholder="Client said call next week about pricing…"
          value={text}
          onChange={(event) => setText(event.target.value)}
          aria-label="Follow-up note"
          disabled={extracting}
        />
        {isSupported && (
          <button
            type="button"
            onClick={toggle}
            className={cn(
              "absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-md transition-colors",
              isListening
                ? "bg-error/10 text-error"
                : "text-muted hover:bg-gray-50 hover:text-ink",
            )}
            aria-label={isListening ? "Stop voice input" : "Start voice input"}
            disabled={extracting}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        {isSupported ? (
          <div className="flex items-center gap-1 rounded-md border border-gray-100 p-0.5">
            {(["en-US", "ur-PK"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                className={cn(
                  "rounded px-2 py-1 text-xs font-medium transition-colors",
                  lang === code
                    ? "bg-brand text-white"
                    : "text-muted hover:text-ink",
                )}
              >
                {code === "en-US" ? "EN" : "UR"}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted">
            Voice input works best in Chrome. Type your note below.
          </p>
        )}

        <Button type="submit" disabled={extracting || !text.trim()}>
          {extracting ? "Processing…" : "Add follow-up"}
        </Button>
      </div>

      {error && <p className="text-sm text-error">{error}</p>}
    </form>
  );
}
