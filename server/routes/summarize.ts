import { RequestHandler } from "express";

function summarize(text: string, maxSentences = 3) {
  const sentences = text
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
  if (sentences.length <= maxSentences) return text;
  const freq = new Map<string, number>();
  const words = text.toLowerCase().match(/[\p{L}']+/gu) || [];
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
  const scored = sentences.map((s) => ({
    s,
    score: (s.toLowerCase().match(/[\p{L}']+/gu) || []).reduce(
      (acc, w) => acc + (freq.get(w) || 0),
      0,
    ),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored
    .slice(0, maxSentences)
    .map((x) => x.s)
    .join(" ");
}

export const handleSummarize: RequestHandler = (req, res) => {
  const { text, maxSentences } = req.body as {
    text?: string;
    maxSentences?: number;
  };
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Missing 'text' in request body" });
  }
  const summary = summarize(text, Math.min(Math.max(maxSentences ?? 3, 1), 10));
  res.json({ summary });
};
