import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/admin-auth";
import { getSiteSettings, clearSettingsCache, ScriptSnippet } from "@/lib/settings/site-settings";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await verifySessionToken(req.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const settings = await getSiteSettings();
    return NextResponse.json({ scripts: settings.scripts || [] });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to load script snippets" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await verifySessionToken(req.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const scripts: ScriptSnippet[] = Array.isArray(body.scripts) ? body.scripts : [];

    const current = await getSiteSettings();
    const updated = {
      ...current,
      scripts,
    };

    await prisma.siteSetting.upsert({
      where: { key: "site_settings_v4" },
      update: { value: JSON.stringify(updated) },
      create: { key: "site_settings_v4", value: JSON.stringify(updated) },
    });

    clearSettingsCache();

    await prisma.auditLog.create({
      data: {
        action: "UPDATE_SCRIPTS",
        target: "/admin/scripts",
        userEmail: session.email,
        details: `Updated script snippets (${scripts.length} total snippets)`,
      },
    });

    return NextResponse.json({ success: true, scripts });
  } catch (err: any) {
    console.error("Failed to save script snippets:", err);
    return NextResponse.json({ error: err?.message || "Failed to save script snippets" }, { status: 500 });
  }
}
