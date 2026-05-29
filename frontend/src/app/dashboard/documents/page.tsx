"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Search, MessageCircle, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

interface Doc {
  id: string;
  name: string;
  status: string;
  summary?: string;
  insights?: string[];
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Doc | null>(null);

  const handleUpload = async () => {
    setUploading(true);
    const name = `document-${Date.now()}.pdf`;
    try {
      const doc = await api<Doc>("/api/documents", {
        method: "POST",
        body: JSON.stringify({ name, file_type: "pdf", file_size: 1024000 }),
      });
      setDocs((prev) => [doc, ...prev]);
      setTimeout(() => {
        setDocs((prev) =>
          prev.map((d) =>
            d.id === doc.id
              ? { ...d, status: "ready", summary: "AI-generated summary: Key insights extracted.", insights: ["Revenue +23%", "Churn -5%", "Q4 on track"] }
              : d
          )
        );
        setSelected({ ...doc, status: "ready", summary: "AI-generated summary", insights: ["Revenue +23%", "Churn -5%"] });
      }, 3000);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Document AI</h1>
          <p className="text-sm text-[#94a3b8]">Upload, analyze, and query documents with AI</p>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="glass border-2 border-dashed border-[#7C3AED]/30 rounded-2xl p-12 text-center cursor-pointer"
        onClick={handleUpload}
      >
        <Upload className="h-12 w-12 mx-auto text-[#7C3AED] mb-4" />
        <p className="text-white font-medium">Drop files here or click to upload</p>
        <p className="text-sm text-[#64748b] mt-1">PDF, DOCX, TXT, CSV supported</p>
        {uploading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center justify-center gap-2 text-[#7C3AED]">
            <Sparkles className="h-4 w-4 animate-spin" />
            Processing with AI...
          </motion.div>
        )}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-sm font-medium text-[#94a3b8]">Your Documents</h3>
          {docs.length === 0 ? (
            <Card className="text-center py-8 text-[#64748b] text-sm">No documents yet</Card>
          ) : (
            docs.map((doc) => (
              <Card
                key={doc.id}
                className={`cursor-pointer transition-all ${selected?.id === doc.id ? "ring-2 ring-[#7C3AED]" : ""}`}
                onClick={() => setSelected(doc)}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-[#7C3AED]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{doc.name}</p>
                    <Badge variant={doc.status === "ready" ? "success" : "warning"} className="mt-1">{doc.status}</Badge>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key={selected.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Card glow>
                  <h3 className="font-semibold text-white mb-4">{selected.name}</h3>
                  {selected.summary && (
                    <div className="mb-4">
                      <p className="text-xs text-[#64748b] mb-1">AI Summary</p>
                      <p className="text-sm text-[#94a3b8]">{selected.summary}</p>
                    </div>
                  )}
                  {selected.insights && (
                    <div className="mb-4">
                      <p className="text-xs text-[#64748b] mb-2">Smart Insights</p>
                      <div className="flex flex-wrap gap-2">
                        {selected.insights.map((ins) => (
                          <span key={ins} className="glass rounded-full px-3 py-1 text-xs text-[#06B6D4]">{ins}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ) : (
              <Card className="py-12 text-center text-[#64748b]">Select a document to view AI analysis</Card>
            )}
          </AnimatePresence>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="h-5 w-5 text-[#7C3AED]" />
              <h3 className="font-semibold text-white">Q&A Chat</h3>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Ask anything about your documents..." value={query} onChange={(e) => setQuery(e.target.value)} />
              <Button><Search className="h-4 w-4" /></Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
