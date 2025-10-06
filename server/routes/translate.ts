import { RequestHandler } from "express";

interface TranslateBody {
  text?: string;
  source?: string; // e.g. 'en' or 'auto'
  target?: string; // e.g. 'tr'
}

const LIBRE_ENDPOINT = process.env.LIBRE_TRANSLATE_URL || "https://libretranslate.de";
const LIBRE_API_KEY = process.env.LIBRE_TRANSLATE_API_KEY || undefined;

async function translateViaLibre(text: string, source: string, target: string) {
  const url = `${LIBRE_ENDPOINT.replace(/\/$/, "")}/translate`;
  const body: Record<string, string> = {
    q: text,
    source: source || "auto",
    target,
    format: "text",
  };
  if (LIBRE_API_KEY) body.api_key = LIBRE_API_KEY;

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const errText = await resp.text().catch(() => "");
    throw new Error(`LibreTranslate error ${resp.status}: ${errText || resp.statusText}`);
  }
  const data = (await resp.json()) as { translatedText?: string };
  if (!data?.translatedText) {
    throw new Error("Unexpected response from translation provider");
  }
  return data.translatedText;
}

export const handleTranslate: RequestHandler = async (req, res) => {
  const { text, source = "auto", target } = (req.body || {}) as TranslateBody;
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Missing 'text' in request body" });
  }
  if (!target || typeof target !== "string") {
    return res.status(400).json({ error: "Missing 'target' language in request body" });
  }

  // Simple retry with backoff
  const maxAttempts = 3;
  let attempt = 0;
  let lastError: unknown = null;
  while (attempt < maxAttempts) {
    try {
      const translated = await translateViaLibre(text, source, target);
      return res.json({ translated });
    } catch (e) {
      lastError = e;
      attempt += 1;
      if (attempt >= maxAttempts) break;
      const delayMs = 300 * Math.pow(2, attempt - 1);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }

  const message = lastError instanceof Error ? lastError.message : "Translation failed";
  return res.status(502).json({
    error: "Translation provider is unavailable. Please try again shortly.",
    details: message,
  });
};
