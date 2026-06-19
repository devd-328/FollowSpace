import type { ExtractedFollowUp } from "@/lib/types/domain";
import { getGeminiModel } from "@/lib/geminiClient";
import {
  EXTRACTION_SYSTEM_PROMPT,
  buildExtractionUserPrompt,
} from "@/lib/extraction/prompt";
import { parseExtractionOutput } from "@/lib/extraction/parser";
import { toISODate } from "@/lib/extraction/dates";

export async function geminiExtract(
  text: string,
  anchor: Date = new Date(),
): Promise<ExtractedFollowUp> {
  const model = getGeminiModel();
  const todayIso = toISODate(anchor);

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: buildExtractionUserPrompt(text, todayIso) }],
      },
    ],
    systemInstruction: EXTRACTION_SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.1,
      responseMimeType: "application/json",
    },
  });

  const rawText = result.response.text();
  if (!rawText) {
    throw new Error("Gemini returned an empty response");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    throw new Error("Gemini returned invalid JSON");
  }

  return parseExtractionOutput(parsed);
}
