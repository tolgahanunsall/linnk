import { RequestHandler } from "express";

export const handleTranslate: RequestHandler = (_req, res) => {
  res.status(501).json({
    error:
      "Translation requires connecting an external provider (e.g., DeepL/Google Translate via Zapier MCP). Please connect Zapier MCP and configure the action.",
  });
};
