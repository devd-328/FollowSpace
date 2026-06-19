/**
 * Google Gemini client — server-side only.
 * Never import from client components.
 */
import { GoogleGenerativeAI } from "@google/generative-ai";

// 1.5-flash has broader free-tier availability than 2.0-flash in some regions.
const DEFAULT_MODEL = "gemini-1.5-flash";

export function isGeminiConfigured(): boolean {
  if (process.env.EXTRACT_USE_MOCK === "true") return false;
  return Boolean(process.env.GEMINI_API_KEY?.trim());
}

export function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const client = new GoogleGenerativeAI(apiKey);
  return client.getGenerativeModel({
    model: process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL,
  });
}
