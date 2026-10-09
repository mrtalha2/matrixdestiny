"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Search, Sparkles, ShieldAlert, ArrowRight, X, BookOpen } from "lucide-react";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { karmicTailsCatalog } from "@/content/karmic-tails-catalog";

interface SearchResultItem {
  type: "arcana" | "karmic-tail";
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  url: string;
}

export function QuickArcanaSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  // Search indexing
  const results = useMemo<SearchResultItem[]>(() => {
    const q = query.trim().toLowerCase();
    const items: SearchResultItem[] = [];

    // 1. Index Arcana 1 - 22
    for (const [numStr, arc] of Object.entries(arcanaMeanings)) {
      const num = Number(numStr);
      const isMatch =
        !q ||
        numStr === q ||
        arc.name.toLowerCase().includes(q) ||
        arc.archetype.toLowerCase().includes(q) ||
        arc.keywords.some((k) => k.toLowerCase().includes(q));

      if (isMatch) {
        items.push({
          type: "arcana",
          id: `arcana-${num}`,
          title: `Arcana ${num}: ${arc.name}`,
          subtitle: arc.archetype,
          badge: "Major Arcana",
          description: arc.essence.slice(0, 120) + "...",
          url: `/arcana/${num}`,
        });
      }
    }

    // 2. Index 26 Karmic Tails
    for (const tail of Object.values(karmicTailsCatalog)) {
      const signature = tail.signature;
      const isMatch =
        !q ||
        signature.includes(q) ||
        tail.name.toLowerCase().includes(q) ||
        tail.archetype.toLowerCase().includes(q) ||
        tail.karmicLesson.toLowerCase().includes(q);

      if (isMatch) {
        items.push({
          type: "karmic-tail",
          id: `tail-${tail.id}`,
          title: `${tail.name} (${signature})`,
          subtitle: tail.archetype,
          badge: "Karmic Tail",
          description: tail.currentLifeTrap.slice(0, 120) + "...",
          url: `/karmic-tails/${tail.id}`,
        });
      }
    }

    return items.slice(0, 12);
  }, [query]);

  return (
    <>
      {/* Trigger floating button on desktop/mobile */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-surface border border-border-strong text-ink-primary shadow-elevation-high hover:border-brand-primary hover:text-brand-primary transition-all duration-200 group text-xs font-medium backdrop-blur-md"
        aria-label="Quick Arcana and Karmic Tail Search (Cmd+K)"
      >
        <Search className="w-4 h-4 text-brand-primary group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">Quick Arcana Lookup</span>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-surface-raised border border-border-subtle rounded text-ink-muted">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-ink-primary/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-2xl bg-surface border border-border-strong rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center px-4 py-3.5 border-b border-border-subtle bg-surface-raised/50">
              <Search className="w-5 h-5 text-brand-primary shrink-0 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Arcana (1-22, name) or Karmic Tail (18-6-6, Love Magic)..."
                className="w-full bg-transparent text-sm sm:text-base text-ink-primary placeholder:text-ink-muted focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 rounded-md text-ink-muted hover:text-ink-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="ml-2 px-2 py-1 text-xs font-mono text-ink-muted hover:text-ink-primary border border-border-subtle rounded-md"
              >
                ESC
              </button>
            </div>

            {/* Results Container */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {results.length === 0 ? (
                <div className="py-12 text-center text-ink-muted space-y-1">
                  <BookOpen className="w-8 h-8 mx-auto opacity-40 mb-2" />
                  <p className="text-sm">No Arcana or Karmic Tail found for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-ink-secondary">Try searching for a number (e.g. &ldquo;7&rdquo; or &ldquo;18-6-6&rdquo;) or name.</p>
                </div>
              ) : (
                results.map((item) => {
                  const isArcana = item.type === "arcana";
                  return (
                    <Link
                      key={item.id}
                      href={item.url}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-start justify-between gap-3 p-3 rounded-xl border border-border-subtle bg-surface hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all duration-150"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                              isArcana
                                ? "bg-chart-spirit/15 text-chart-spirit"
                                : "bg-chart-karmic/15 text-chart-karmic"
                            }`}
                          >
                            {isArcana ? (
                              <span className="flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" />
                                {item.badge}
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <ShieldAlert className="w-2.5 h-2.5" />
                                {item.badge}
                              </span>
                            )}
                          </span>
                          <span className="text-xs font-medium text-ink-muted">{item.subtitle}</span>
                        </div>
                        <h4 className="font-display text-sm font-semibold text-ink-primary group-hover:text-brand-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-ink-secondary leading-snug line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
                    </Link>
                  );
                })
              )}
            </div>

            {/* Modal Footer Shortcuts */}
            <div className="px-4 py-2.5 bg-surface-raised border-t border-border-subtle flex items-center justify-between text-[11px] font-mono text-ink-muted">
              <span>Navigate 22 Arcana & 26 Karmic Programs</span>
              <span className="hidden sm:inline">Press ESC to dismiss</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
