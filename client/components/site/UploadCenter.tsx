import { useCallback, useState } from "react";
import { VueButton } from "@/components/ui/vue-button";
import { toast } from "sonner";

function summarizeLocally(text: string, maxSentences = 3) {
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

export function UploadCenter() {
  const [dragOver, setDragOver] = useState(false);
  const [text, setText] = useState("");
  const onDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const ext = file.name.toLowerCase().split(".").pop();
    if (!ext || !["txt", "md"].includes(ext)) {
      toast("Please drop a .txt or .md file for now.");
      return;
    }
    const content = await file.text();
    setText(content.slice(0, 200000));
    toast.success("File loaded");
  }, []);

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast("Load a text file first");
      return;
    }
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, maxSentences: 3 }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed");
      const summary: string = data.summary;
      const blob = new Blob([summary], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "summary.txt";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Summary downloaded");
    } catch (e: any) {
      const local = summarizeLocally(text);
      toast("Local summary generated (server unavailable)");
      const blob = new Blob([local], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "summary.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleTranslate = async () => {
    toast(
      "To enable high‑quality translation, please connect Zapier and set up DeepL/Google Translate, or provide API credentials.",
    );
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h4 className="text-xl font-semibold">Upload Center</h4>
      <p className="mt-1 text-sm text-gray-600">
        Drag and drop a .txt or .md file, then summarize or translate.
      </p>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`mt-4 flex h-40 items-center justify-center rounded-xl border-2 border-dashed ${dragOver ? "border-indigo-400 bg-indigo-50" : "border-gray-200"}`}
      >
        <div className="text-center">
          <div className="text-sm font-medium">Drop file here</div>
          <div className="text-xs text-gray-500">
            Only .txt and .md supported for now
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <VueButton onClick={handleSummarize}>Summarize</VueButton>
        <VueButton variant="outline" onClick={handleTranslate}>
          Translate to English
        </VueButton>
      </div>
    </div>
  );
}
