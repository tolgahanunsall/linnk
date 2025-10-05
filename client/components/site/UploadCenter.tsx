import { useCallback, useState, useRef } from "react";
import { VueButton } from "@/components/ui/vue-button";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload, FileText, Download, Loader2 } from "lucide-react";

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
  const [fileName, setFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const processFile = useCallback(async (file: File) => {
    const ext = file.name.toLowerCase().split(".").pop();
    if (!ext || !["txt", "md", "pdf", "doc", "docx"].includes(ext)) {
      toast.error("Please select a .txt, .md, .pdf, .doc, or .docx file.");
      return;
    }
    
    setIsProcessing(true);
    try {
      let content = "";
      
      if (ext === "txt" || ext === "md") {
        content = await file.text();
      } else {
        // For other file types, show a message for now
        toast.info("PDF and DOC support coming soon. Using filename as placeholder.");
        content = `Document: ${file.name}\nSize: ${(file.size / 1024).toFixed(2)} KB\nType: ${file.type}\n\nContent extraction for ${ext.toUpperCase()} files will be implemented soon.`;
      }
      
      setText(content.slice(0, 200000));
      setFileName(file.name);
      toast.success(`File "${file.name}" loaded successfully!`);
    } catch (error) {
      toast.error("Failed to process file");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const onDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    await processFile(file);
  }, [processFile]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  }, [processFile]);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleSummarize = async () => {
    if (!text.trim()) {
      toast.error("Please upload a file first");
      return;
    }
    
    setIsProcessing(true);
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
      a.download = `summary_${fileName || 'document'}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Summary downloaded successfully!");
    } catch (e: any) {
      const local = summarizeLocally(text);
      toast.warning("Using local summary (server unavailable)");
      const blob = new Blob([local], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `summary_${fileName || 'document'}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTranslate = async () => {
    toast(
      "To enable high‑quality translation, please connect Zapier and set up DeepL/Google Translate, or provide API credentials.",
    );
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          <Upload className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-xl font-semibold">Document Upload Center</h4>
          <p className="text-sm text-gray-600">
            Upload documents to summarize, translate, or analyze
          </p>
        </div>
      </div>

      {/* File Upload Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={openFileDialog}
        className={`relative mt-4 flex h-48 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition-all ${
          dragOver 
            ? "border-indigo-400 bg-indigo-50" 
            : "border-gray-300 hover:border-indigo-300 hover:bg-gray-50"
        } ${isProcessing ? "pointer-events-none opacity-50" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.md,.pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <div className="text-center">
          {isProcessing ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
              <div className="text-sm font-medium text-gray-700">Processing file...</div>
            </div>
          ) : fileName ? (
            <div className="flex flex-col items-center gap-3">
              <FileText className="h-8 w-8 text-green-500" />
              <div className="text-sm font-medium text-gray-900">{fileName}</div>
              <div className="text-xs text-gray-500">File loaded successfully</div>
              <Button variant="outline" size="sm" onClick={(e) => {
                e.stopPropagation();
                setText("");
                setFileName("");
              }}>
                Remove File
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Upload className="h-8 w-8 text-gray-400" />
              <div className="text-sm font-medium text-gray-700">
                Drop files here or click to browse
              </div>
              <div className="text-xs text-gray-500">
                Supports: TXT, MD, PDF, DOC, DOCX (up to 200KB)
              </div>
              <Button variant="outline" size="sm">
                Choose File
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button 
          onClick={handleSummarize}
          disabled={!text.trim() || isProcessing}
          className="flex-1 min-w-[140px]"
        >
          {isProcessing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FileText className="mr-2 h-4 w-4" />
          )}
          Summarize
        </Button>
        <Button 
          variant="outline"
          onClick={handleTranslate}
          disabled={!text.trim() || isProcessing}
          className="flex-1 min-w-[140px]"
        >
          <Download className="mr-2 h-4 w-4" />
          Translate
        </Button>
      </div>

      {/* File Info */}
      {text && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-xs text-gray-600">
            Content preview: {text.slice(0, 100)}...
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Characters: {text.length.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
}
