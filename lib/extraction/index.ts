import type { ExtractedFollowUp } from "@/lib/types/domain";
import { isGeminiConfigured } from "@/lib/geminiClient";
import { geminiExtract } from "@/lib/extraction/gemini";
import { mockExtract } from "@/lib/extraction/mock";

export type ExtractionSource = "gemini" | "mock";

export interface ExtractionResult {
  extracted: ExtractedFollowUp;
  source: ExtractionSource;
}

/**
 * Extraction entry point — Gemini when configured, mock fallback otherwise.
 */
export async function extractFollowUp(
  text: string,
  anchor: Date = new Date(),
): Promise<ExtractionResult> {
  if (isGeminiConfigured()) {
    try {
      const extracted = await geminiExtract(text, anchor);
      return { extracted, source: "gemini" };
    } catch (error) {
      console.error("Gemini extraction failed, falling back to mock:", error);
    }
  }

  return { extracted: mockExtract(text, anchor), source: "mock" };
}
