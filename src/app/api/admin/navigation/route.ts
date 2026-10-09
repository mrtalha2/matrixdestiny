import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/admin-auth";
import { getNavigationConfig, DEFAULT_NAVIGATION_CONFIG, NavigationConfig } from "@/lib/navigation/navigation-config";
import { getCachePurgeAdapter } from "@/lib/cache/cache-adapter";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await verifySessionToken(req.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const config = await getNavigationConfig();
    return NextResponse.json({ config });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to read navigation" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await verifySessionToken(req.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const config: NavigationConfig = body.config || body;
    if (body.customCode && !config.customCode) {
      config.customCode = body.customCode;
    }

    if (!config || !config.header || !config.footer) {
      return NextResponse.json({ error: "Invalid navigation payload" }, { status: 400 });
    }

    // Persist in SiteSetting
    await prisma.siteSetting.upsert({
      where: { key: "navigation_config" },
      update: { value: JSON.stringify(config) },
      create: { key: "navigation_config", value: JSON.stringify(config) },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        action: "UPDATE_NAVIGATION",
        target: "/admin/navigation",
        userEmail: session.email,
        details: `Updated Header (${config.header.links.length} links), Footer (${config.footer.columns.length} cols), Custom Code (Enabled: ${config.customCode?.enabled ? "YES" : "NO"}, Snippets: ${config.customCode?.snippets?.length || 0})`,
      },
    });

    // Invalidate site cache for layout
    try {
      const adapter = getCachePurgeAdapter();
      await adapter.purgePath("/");
    } catch (cacheErr) {
      console.warn("Cache purge warning:", cacheErr);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Save navigation error:", err);
    return NextResponse.json({ error: err?.message || "Failed to save navigation" }, { status: 500 });
  }
}
