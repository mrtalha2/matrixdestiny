import { CustomCodeConfig } from "@/lib/navigation/navigation-config";

export interface ServerMetaTag {
  type: "meta";
  name?: string;
  property?: string;
  content?: string;
  httpEquiv?: string;
}

export interface ServerLinkTag {
  type: "link";
  rel?: string;
  href?: string;
}

export interface ServerStyleTag {
  type: "style";
  css: string;
}

export type ServerHeadTag = ServerMetaTag | ServerLinkTag | ServerStyleTag;

/**
 * Extracts server-safe head tags (<meta>, <link>, <style>) from custom code HTML
 * and parses them into structured objects so they can be rendered as valid native
 * elements inside <head> without forbidden <span> wrapper tags.
 */
export function extractServerHeadTags(config?: CustomCodeConfig): ServerHeadTag[] {
  if (!config) return [];
  const isEnabled = config.enabled ?? (config as any).active ?? false;
  if (!isEnabled) return [];

  // In root SSR layout, only inject global header code and snippets targeting the whole site ("all")
  const snippetsCode = (config.snippets || [])
    .filter((s) => s.enabled && (s.position === "head" || !s.position) && s.target === "all")
    .map((s) => s.code)
    .join("\n");

  const raw = `${config.headerCode || ""}\n${snippetsCode}`;
  const tags: ServerHeadTag[] = [];

  // 1. Match <meta ...>
  const metaRegex = /<meta\s+([^>]*)\/?>/gi;
  let match;
  while ((match = metaRegex.exec(raw)) !== null) {
    const attrStr = match[1];
    const nameMatch = /name=["']([^"']+)["']/i.exec(attrStr);
    const propMatch = /property=["']([^"']+)["']/i.exec(attrStr);
    const contentMatch = /content=["']([^"']+)["']/i.exec(attrStr);
    const httpEquivMatch = /http-equiv=["']([^"']+)["']/i.exec(attrStr);

    tags.push({
      type: "meta",
      name: nameMatch ? nameMatch[1] : undefined,
      property: propMatch ? propMatch[1] : undefined,
      content: contentMatch ? contentMatch[1] : undefined,
      httpEquiv: httpEquivMatch ? httpEquivMatch[1] : undefined,
    });
  }

  // 2. Match <link ...>
  const linkRegex = /<link\s+([^>]*)\/?>/gi;
  while ((match = linkRegex.exec(raw)) !== null) {
    const attrStr = match[1];
    const relMatch = /rel=["']([^"']+)["']/i.exec(attrStr);
    const hrefMatch = /href=["']([^"']+)["']/i.exec(attrStr);

    tags.push({
      type: "link",
      rel: relMatch ? relMatch[1] : undefined,
      href: hrefMatch ? hrefMatch[1] : undefined,
    });
  }

  // 3. Match <style...>...</style>
  const styleRegex = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
  while ((match = styleRegex.exec(raw)) !== null) {
    tags.push({
      type: "style",
      css: match[1],
    });
  }

  return tags;
}
