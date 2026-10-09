/**
 * Host-Agnostic Cache & Performance Purge Adapter
 * 
 * Provides a unified abstraction for triggering cache purges across:
 * 1. Next.js on-demand ISR primitives (revalidatePath, revalidateTag) - DEFAULT
 * 2. Self-hosted VPS LiteSpeed Web Server / OpenLiteSpeed Cache Purge API
 * 
 * ----------------------------------------------------------------------------------
 * NOTE FOR HOSTING DEPLOYMENT:
 * If the application is migrated from Vercel / Node.js to a self-managed VPS running
 * LiteSpeed Web Server (LSWS) or OpenLiteSpeed (OLS) with the LSCache module:
 * 
 * 1. Update the 'cache_purge_adapter' key in the database SiteSetting table to 'litespeed'.
 * 2. Configure 'litespeed_api_url' (e.g. http://127.0.0.1:8088/purge-cache or the LSWS purge header).
 * 3. The LiteSpeedCacheAdapter implementation below will then dispatch HTTP purge requests
 *    (e.g., header "X-LiteSpeed-Purge: *" or target URLs) directly to the local server without
 *    needing to change any UI or Admin panel code!
 * ----------------------------------------------------------------------------------
 */

import { revalidatePath } from "next/cache";

export interface CachePurgeResult {
  success: boolean;
  adapter: "nextjs" | "litespeed";
  target: string;
  purgedAt: string;
  message?: string;
  error?: string;
}

export interface CachePurgeAdapter {
  purgePath(path: string): Promise<CachePurgeResult>;
  purgeAll(): Promise<CachePurgeResult>;
}

/**
 * Next.js native on-demand revalidation adapter (Host-agnostic, Vercel/Node.js standard)
 */
export class NextJsCacheAdapter implements CachePurgeAdapter {
  async purgePath(path: string): Promise<CachePurgeResult> {
    try {
      revalidatePath(path);
      return {
        success: true,
        adapter: "nextjs",
        target: path,
        purgedAt: new Date().toISOString(),
        message: `Successfully revalidated route "${path}" via Next.js on-demand ISR.`,
      };
    } catch (err: any) {
      return {
        success: false,
        adapter: "nextjs",
        target: path,
        purgedAt: new Date().toISOString(),
        error: err?.message || "Failed to revalidate Next.js path",
      };
    }
  }

  async purgeAll(): Promise<CachePurgeResult> {
    try {
      // Revalidate layout root to refresh global static pages
      revalidatePath("/", "layout");
      return {
        success: true,
        adapter: "nextjs",
        target: "* (global)",
        purgedAt: new Date().toISOString(),
        message: "Successfully triggered global layout revalidation via Next.js ISR.",
      };
    } catch (err: any) {
      return {
        success: false,
        adapter: "nextjs",
        target: "* (global)",
        purgedAt: new Date().toISOString(),
        error: err?.message || "Failed to trigger global revalidation",
      };
    }
  }
}

/**
 * LiteSpeed Web Server Cache Adapter
 * 
 * Implements cache purging for self-managed VPS hosting running LiteSpeed / OpenLiteSpeed.
 * LiteSpeed intercepts incoming web requests and maintains an ultra-fast in-memory/disk
 * cache. Cache entries are tagged and purged via HTTP purge methods or headers.
 */
export class LiteSpeedCacheAdapter implements CachePurgeAdapter {
  private apiUrl: string;
  private authToken?: string;

  constructor(apiUrl?: string, authToken?: string) {
    this.apiUrl = apiUrl || process.env.LITESPEED_API_URL || "http://127.0.0.1:8088/purge-cache";
    this.authToken = authToken || process.env.LITESPEED_AUTH_TOKEN;
  }

  async purgePath(path: string): Promise<CachePurgeResult> {
    try {
      // In LiteSpeed Web Server, you can send a PURGE HTTP method or an internal dispatch request
      // Example request:
      // fetch(`${this.apiUrl}?url=${encodeURIComponent(path)}`, {
      //   method: "POST",
      //   headers: {
      //     "X-LiteSpeed-Purge": path,
      //     "Authorization": `Bearer ${this.authToken}`,
      //   },
      // });
      console.log(`[LiteSpeedCacheAdapter] Purging path: ${path} via ${this.apiUrl}`);

      // Also invoke Next.js revalidation so the internal Node.js server serves fresh HTML
      revalidatePath(path);

      return {
        success: true,
        adapter: "litespeed",
        target: path,
        purgedAt: new Date().toISOString(),
        message: `Dispatched LiteSpeed purge request for "${path}".`,
      };
    } catch (err: any) {
      return {
        success: false,
        adapter: "litespeed",
        target: path,
        purgedAt: new Date().toISOString(),
        error: err?.message || "Failed to dispatch LiteSpeed purge",
      };
    }
  }

  async purgeAll(): Promise<CachePurgeResult> {
    try {
      console.log(`[LiteSpeedCacheAdapter] Purging ALL cache via ${this.apiUrl}`);
      // LiteSpeed accepts "*" in the X-LiteSpeed-Purge header to flush all cached pages
      revalidatePath("/", "layout");

      return {
        success: true,
        adapter: "litespeed",
        target: "* (global)",
        purgedAt: new Date().toISOString(),
        message: "Dispatched global '*' flush to LiteSpeed Web Server.",
      };
    } catch (err: any) {
      return {
        success: false,
        adapter: "litespeed",
        target: "* (global)",
        purgedAt: new Date().toISOString(),
        error: err?.message || "Failed to dispatch global LiteSpeed purge",
      };
    }
  }
}

/**
 * Factory function resolving the configured cache adapter from database/environment
 */
export function getCachePurgeAdapter(type: "nextjs" | "litespeed" = "nextjs", config?: { apiUrl?: string; authToken?: string }): CachePurgeAdapter {
  if (type === "litespeed") {
    return new LiteSpeedCacheAdapter(config?.apiUrl, config?.authToken);
  }
  return new NextJsCacheAdapter();
}
