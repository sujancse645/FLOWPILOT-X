"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Search, MessageCircle, Sparkles, Network } from "lucide-react";
import { PageHeader } from "@/components/elite/PageHeader";
import { GlowPanel } from "@/components/elite/GlowPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { fetchDocuments, localStore, uploadDocument } from "@/lib/data/data-service";
import type { DocumentRecord } from "@/lib/data/types";

const STAGES = ["uploading", "embedding", "indexing", "ready"] as const;

export default function DocumentsPage() {
  const [docs, setDocs] = useState<DocumentRecord[]>([]);
  const [uploading, setUploading] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<DocumentRecord | null>(null);

  const refresh = useCallback(async () => {
    const list = await fetchDocuments();
    setDocs(list);
  }, []);

  useEffect(() => {
    refresh();
    return localStore.subscribe("documents", () => {
      const list = localStore.getDocuments();
      setDocs(list);
      if (selected) {
        const updated = list.find((d) => d.id === selected.id);
        if (updated) setSelected(updated);
      }
    });
  }, [refresh, selected?.id]);

  const handleUpload = async () => {
    setUploading(true);
    const name = `enterprise-report-${Date.now()}.pdf`;
    try {
      const doc = await uploadDocument(name, "pdf", 2048000);
      setSelected(doc);
    } finally {
      setUploading(false);
      refresh();
    }
  };

  const stageIndex = selected ? STAGES.indexOf(selected.status as (typeof STAGES)[number]) : -1;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Knowledge Engine"
        title="Document AI"
        description="Semantic indexing, vector embeddings, and holographic document intelligence."
      />

      <motion.div
        whileHover={{ scale: 1.005 }}
        className="glow-border rounded-2xl p-[1px] cursor-pointer"
        onClick={!uploading ? handleUpload : undefined}
      >
        <div className="holo-panel rounded-2xl p-12 text-center border-2 border-dashed border-violet-500/30">
          <Upload className="h-12 w-12 mx-auto text-violet-400 mb-4" />
          <p className="text-white font-medium">Drop files here or click to upload</p>
          <p className="text-sm text-muted mt-1">PDF, DOCX, TXT, CSV — persisted to your workspace</p>
          {uploading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center justify-center gap-2 text-violet-300">
              <Sparkles className="h-4 w-4 animate-spin" />
              Neural pipeline running...
            </motion.div>
          )}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted">Your documents</h3>
          {docs.length === 0 ? (
            <GlowPanel className="text-center py-8 text-muted text-sm">No documents yet — upload to begin indexing</GlowPanel>
          ) : (
            docs.map((doc) => (
              <GlowPanel
                key={doc.id}
                className={`p-4 cursor-pointer transition-all ${selected?.id === doc.id ? "ring-2 ring-violet-500/50" : ""}`}
                onClick={() => setSelected(doc)}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-violet-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{doc.name}</p>
                    <Badge variant={doc.status === "ready" ? "success" : "warning"} className="mt-1">
                      {doc.status}
                    </Badge>
                    {doc.embedding_progress !== undefined && doc.status !== "ready" && (
                      <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
                          animate={{ width: `${doc.embedding_progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </GlowPanel>
            ))
          )}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div key={selected.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GlowPanel glow className="p-6">
                  <h3 className="font-semibold text-white mb-4">{selected.name}</h3>

                  {selected.status !== "ready" && (
                    <div className="mb-6">
                      <p className="text-xs text-muted mb-3 uppercase tracking-wider">Processing pipeline</p>
                      <div className="flex gap-2">
                        {STAGES.map((s, i) => (
                          <div
                            key={s}
                            className={`flex-1 rounded-lg py-2 text-center text-[10px] uppercase ${
                              i <= stageIndex ? "bg-violet-500/20 text-violet-300 border border-violet-500/30" : "bg-white/5 text-muted"
                            }`}
                          >
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selected.summary && (
                    <div className="mb-4">
                      <p className="text-xs text-muted mb-1">AI summary</p>
                      <p className="text-sm text-secondary">{selected.summary}</p>
                    </div>
                  )}
                  {selected.insights && (
                    <div className="mb-4">
                      <p className="text-xs text-muted mb-2">Smart insights</p>
                      <div className="flex flex-wrap gap-2">
                        {selected.insights.map((ins) => (
                          <span key={ins} className="rounded-full px-3 py-1 text-xs text-cyan-300 border border-cyan-500/20 bg-cyan-500/10">
                            {ins}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4 text-xs text-muted">
                    <Network className="h-4 w-4 text-violet-400" />
                    Knowledge graph: {selected.status === "ready" ? "12 nodes linked" : "Building..."}
                  </div>
                </GlowPanel>
              </motion.div>
            ) : (
              <GlowPanel className="py-12 text-center text-muted">Select a document to view AI analysis</GlowPanel>
            )}
          </AnimatePresence>

          <GlowPanel className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="h-5 w-5 text-violet-400" />
              <h3 className="font-semibold text-white">Semantic Q&A</h3>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Ask anything about your documents..." value={query} onChange={(e) => setQuery(e.target.value)} />
              <Button>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </GlowPanel>
        </div>
      </div>
    </div>
  );
}
