"use client";

import React, { useState, useEffect } from "react";
import {
  Code2,
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  HelpCircle,
  ToggleLeft,
  ToggleRight,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ScriptSnippet, ScriptLocation, ScriptType, ScriptTarget } from "@/lib/settings/site-settings";

export default function AdminScriptsPage() {
  const [snippets, setSnippets] = useState<ScriptSnippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modal editor state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState<Partial<ScriptSnippet>>({
    name: "",
    type: "html",
    location: "HEAD",
    target: "all",
    pathPattern: "",
    enabled: true,
    priority: 10,
    code: "",
  });

  useEffect(() => {
    async function loadSnippets() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/admin/scripts");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.scripts)) {
            setSnippets(data.scripts);
          }
        }
      } catch (err: any) {
        setErrorMessage("Failed to load script snippets.");
      } finally {
        setIsLoading(false);
      }
    }
    loadSnippets();
  }, []);

  const handleSaveAll = async (updatedList: ScriptSnippet[]) => {
    try {
      setIsSaving(true);
      setSaveSuccess(false);
      setErrorMessage(null);

      const res = await fetch("/api/admin/scripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scripts: updatedList }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save script snippets.");
      }

      setSnippets(updatedList);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggle = (id: string) => {
    const next = snippets.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s));
    handleSaveAll(next);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this script snippet?")) return;
    const next = snippets.filter((s) => s.id !== id);
    handleSaveAll(next);
  };

  const handleOpenAddModal = () => {
    setCurrentSnippet({
      id: `snippet-${Date.now()}`,
      name: "",
      type: "html",
      location: "HEAD",
      target: "all",
      pathPattern: "",
      enabled: true,
      priority: 10,
      code: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (snippet: ScriptSnippet) => {
    setCurrentSnippet({ ...snippet });
    setIsModalOpen(true);
  };

  const handleSaveModalSnippet = () => {
    if (!currentSnippet.name?.trim()) {
      alert("Please provide a snippet title/name.");
      return;
    }
    if (!currentSnippet.code?.trim()) {
      alert("Please paste the script or HTML code.");
      return;
    }

    const snippetToSave = currentSnippet as ScriptSnippet;
    const exists = snippets.some((s) => s.id === snippetToSave.id);
    let next: ScriptSnippet[];

    if (exists) {
      next = snippets.map((s) => (s.id === snippetToSave.id ? snippetToSave : s));
    } else {
      next = [snippetToSave, ...snippets];
    }

    setIsModalOpen(false);
    handleSaveAll(next);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-md bg-brand-primary/10 text-brand-primary">
              <Code2 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-display font-medium text-ink-primary">
              Custom Code & Script Manager
            </h1>
            <Badge variant="brand" size="sm" className="border-brand-primary/30">
              WPCode Architecture
            </Badge>
          </div>
          <p className="text-xs text-ink-secondary">
            Manage tracking pixels, Google Tag Manager, analytics, and custom code across HEAD, BODY START, and BODY END.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenAddModal}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add New Snippet
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-lg bg-status-success/10 border border-status-success/20 text-xs text-status-success flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Script snippets successfully synchronized with edge DOM injection layer.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-lg bg-status-danger/10 border border-status-danger/20 text-xs text-status-danger flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Snippet List */}
      <div className="bg-surface rounded-xl border border-border-subtle shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-border-subtle flex items-center justify-between bg-surface-raised">
          <span className="text-xs font-semibold text-ink-primary">
            Active Snippets ({snippets.length})
          </span>
          <span className="text-[11px] text-ink-muted">
            Hydration-safe DOM execution
          </span>
        </div>

        {snippets.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary mx-auto flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-ink-primary">No script snippets configured yet</h3>
            <p className="text-xs text-ink-muted max-w-sm mx-auto">
              Add Google Analytics, GTM, Meta Pixel, or custom CSS styles to inject across your website without modifying source code.
            </p>
            <Button variant="outline" size="sm" onClick={handleOpenAddModal} leftIcon={<Plus className="w-4 h-4" />}>
              Create First Snippet
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-border-subtle">
            {snippets.map((snippet) => (
              <div
                key={snippet.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-raised transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-ink-primary">{snippet.name}</span>
                    <Badge
                      variant={snippet.enabled ? "success" : "default"}
                      size="sm"
                    >
                      {snippet.enabled ? "Active" : "Disabled"}
                    </Badge>
                    <Badge variant="secondary" size="sm" className="font-mono text-[10px]">
                      {snippet.location}
                    </Badge>
                    <Badge variant="brand" size="sm" className="font-mono text-[10px]">
                      {snippet.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-[11px] text-ink-muted flex items-center gap-3">
                    <span>
                      Target:{" "}
                      <strong className="text-ink-secondary">
                        {snippet.target === "all"
                          ? "All Pages"
                          : snippet.target === "home"
                          ? "Homepage Only"
                          : `Path: ${snippet.pathPattern}`}
                      </strong>
                    </span>
                    <span>Priority: {snippet.priority || 10}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggle(snippet.id)}
                    className="p-1.5 rounded-lg text-ink-muted hover:text-ink-primary hover:bg-canvas transition-colors"
                    title={snippet.enabled ? "Disable snippet" : "Enable snippet"}
                  >
                    {snippet.enabled ? (
                      <ToggleRight className="w-5 h-5 text-status-success" />
                    ) : (
                      <ToggleLeft className="w-5 h-5 text-ink-muted" />
                    )}
                  </button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenEditModal(snippet)}
                    leftIcon={<Edit3 className="w-3.5 h-3.5" />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(snippet.id)}
                    leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Snippet Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl border border-border-strong p-6 w-full max-w-2xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <h3 className="text-sm font-semibold text-ink-primary flex items-center gap-2">
                <Code2 className="w-4 h-4 text-brand-primary" />
                {currentSnippet.id && snippets.some((s) => s.id === currentSnippet.id)
                  ? "Edit Script Snippet"
                  : "Add New Script Snippet"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-ink-muted hover:text-ink-primary text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1">Snippet Name</label>
                <input
                  type="text"
                  value={currentSnippet.name || ""}
                  onChange={(e) => setCurrentSnippet({ ...currentSnippet, name: e.target.value })}
                  placeholder="e.g. Google Analytics 4, Meta Pixel, Chat Widget"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-ink-secondary mb-1">Location</label>
                  <select
                    value={currentSnippet.location || "HEAD"}
                    onChange={(e) =>
                      setCurrentSnippet({ ...currentSnippet, location: e.target.value as ScriptLocation })
                    }
                    className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary"
                  >
                    <option value="HEAD">HEAD (Metadata & Critical)</option>
                    <option value="BODY_START">BODY START (GTM NoScript)</option>
                    <option value="BODY_END">BODY END (Analytics & Trackers)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-secondary mb-1">Snippet Type</label>
                  <select
                    value={currentSnippet.type || "html"}
                    onChange={(e) =>
                      setCurrentSnippet({ ...currentSnippet, type: e.target.value as ScriptType })
                    }
                    className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary"
                  >
                    <option value="html">HTML (Tags & Scripts)</option>
                    <option value="js">JavaScript (Pure JS)</option>
                    <option value="css">CSS (Custom Styles)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink-secondary mb-1">Target Pages</label>
                  <select
                    value={currentSnippet.target || "all"}
                    onChange={(e) =>
                      setCurrentSnippet({ ...currentSnippet, target: e.target.value as ScriptTarget })
                    }
                    className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary focus:outline-none focus:border-brand-primary"
                  >
                    <option value="all">All Public Pages</option>
                    <option value="home">Homepage Only</option>
                    <option value="specific">Specific Path Pattern</option>
                  </select>
                </div>
              </div>

              {currentSnippet.target === "specific" && (
                <div>
                  <label className="block text-xs font-medium text-ink-secondary mb-1">
                    Path Pattern (e.g. <code className="text-brand-primary">/blog/*</code> or <code className="text-brand-primary">/chart/*</code>)
                  </label>
                  <input
                    type="text"
                    value={currentSnippet.pathPattern || ""}
                    onChange={(e) => setCurrentSnippet({ ...currentSnippet, pathPattern: e.target.value })}
                    placeholder="/blog/*"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary font-mono focus:outline-none focus:border-brand-primary"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-ink-secondary mb-1">Code / Script Content</label>
                <textarea
                  rows={8}
                  value={currentSnippet.code || ""}
                  onChange={(e) => setCurrentSnippet({ ...currentSnippet, code: e.target.value })}
                  placeholder="<!-- Paste your tracking script or CSS here -->"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-border-strong bg-canvas text-ink-primary font-mono focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-subtle">
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveModalSnippet}>
                Save Snippet
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
