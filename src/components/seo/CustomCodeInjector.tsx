"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CustomCodeConfig } from "@/lib/navigation/navigation-config";
import { ScriptSnippet } from "@/lib/settings/site-settings";

interface CustomCodeInjectorProps {
  initialConfig?: CustomCodeConfig;
  initialSnippets?: ScriptSnippet[];
}

/**
 * Checks if a snippet targets the current pathname
 */
export function isSnippetMatchingPath(
  snippet: { target: string; pathPattern?: string; enabled?: boolean },
  pathname: string
): boolean {
  if (snippet.enabled === false) return false;
  if (snippet.target === "all") return true;
  if (snippet.target === "home") return pathname === "/" || pathname === "";

  if (snippet.target === "specific" && snippet.pathPattern) {
    const pattern = snippet.pathPattern.trim().toLowerCase();
    const current = pathname.toLowerCase();

    // Wildcard matching: e.g. /blog/* or /chart/*
    if (pattern.endsWith("/*")) {
      const prefix = pattern.slice(0, -2);
      return current === prefix || current.startsWith(prefix + "/");
    }

    // Exact or slash-normalized match
    return current === pattern || current === `${pattern}/` || `${current}/` === pattern;
  }

  return false;
}

/**
 * Client-side script and snippet injector
 * Ensures tracking scripts (GA4, GTM, Meta Pixel, chat widgets) execute properly
 * by cloning script nodes into document.head and document.body without hydration mismatches.
 */
export function CustomCodeInjector({ initialConfig, initialSnippets }: CustomCodeInjectorProps) {
  const pathname = usePathname();
  const [config, setConfig] = useState<CustomCodeConfig | undefined>(initialConfig);
  const [snippets] = useState<ScriptSnippet[] | undefined>(initialSnippets);

  useEffect(() => {
    if (!initialConfig && !initialSnippets) {
      fetch("/api/navigation")
        .then((res) => res.json())
        .then((data) => {
          if (data?.config?.customCode) {
            setConfig(data.config.customCode);
          }
        })
        .catch(() => {});
    }
  }, [initialConfig, initialSnippets]);

  useEffect(() => {
    // Don't inject on admin routes
    if (pathname.startsWith("/admin")) return;

    let headHtml = (config?.enabled ? config.headerCode : "") || "";
    let bodyStartHtml = "";
    let bodyEndHtml = (config?.enabled ? config.footerCode : "") || "";

    // Process legacy snippets from navigation config
    if (config?.enabled && Array.isArray(config.snippets)) {
      config.snippets.forEach((snippet) => {
        if (isSnippetMatchingPath(snippet, pathname)) {
          if (snippet.position === "head") {
            headHtml += "\n" + snippet.code;
          } else {
            bodyEndHtml += "\n" + snippet.code;
          }
        }
      });
    }

    // Process modern WPCode-style snippets
    if (Array.isArray(snippets)) {
      // Sort by priority (lower number = higher priority)
      const sorted = [...snippets].sort((a, b) => (a.priority || 10) - (b.priority || 10));
      sorted.forEach((snippet) => {
        if (isSnippetMatchingPath(snippet, pathname)) {
          if (snippet.location === "HEAD") {
            headHtml += "\n" + snippet.code;
          } else if (snippet.location === "BODY_START") {
            bodyStartHtml += "\n" + snippet.code;
          } else {
            bodyEndHtml += "\n" + snippet.code;
          }
        }
      });
    }

    // Remove existing injected elements before re-injecting
    document.querySelectorAll("[data-destiny-custom-code]").forEach((el) => el.remove());

    const parser = new DOMParser();

    // Helper to inject HTML into target parent
    const injectInto = (html: string, parent: HTMLElement, label: string, prepend = false) => {
      if (!html.trim()) return;
      try {
        const doc = parser.parseFromString(`<div>${html}</div>`, "text/html");
        const nodes = Array.from(doc.body.childNodes);
        nodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            if (el.tagName.toLowerCase() === "script") {
              const script = document.createElement("script");
              Array.from(el.attributes).forEach((attr) => {
                script.setAttribute(attr.name, attr.value);
              });
              script.innerHTML = el.innerHTML;
              script.setAttribute("data-destiny-custom-code", `${label}-script`);
              if (prepend && parent.firstChild) {
                parent.insertBefore(script, parent.firstChild);
              } else {
                parent.appendChild(script);
              }
            } else {
              const clone = el.cloneNode(true) as HTMLElement;
              clone.setAttribute("data-destiny-custom-code", `${label}-element`);
              if (prepend && parent.firstChild) {
                parent.insertBefore(clone, parent.firstChild);
              } else {
                parent.appendChild(clone);
              }
            }
          }
        });
      } catch (err) {
        console.error(`Custom code injection error (${label}):`, err);
      }
    };

    // 1. Inject HEAD code
    injectInto(headHtml, document.head, "head");

    // 2. Inject BODY_START code (prepended to body)
    injectInto(bodyStartHtml, document.body, "body-start", true);

    // 3. Inject BODY_END code (appended to body)
    injectInto(bodyEndHtml, document.body, "body-end");

    return () => {
      // Clean up on route change
      document.querySelectorAll("[data-destiny-custom-code]").forEach((el) => el.remove());
    };
  }, [config, snippets, pathname]);

  return null;
}
