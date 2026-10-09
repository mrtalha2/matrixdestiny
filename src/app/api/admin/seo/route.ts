import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/admin-auth";
import { getSiteSettings, clearSettingsCache } from "@/lib/settings/site-settings";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await verifySessionToken(req.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const settings = await getSiteSettings();
    return NextResponse.json({
      seo: settings.seo,
      verification: settings.verification,
      schema: settings.schema,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to load SEO settings" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await verifySessionToken(req.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const current = await getSiteSettings();

    const updated = {
      ...current,
      seo: { ...current.seo, ...body.seo },
      verification: { ...current.verification, ...body.verification },
      schema: { ...current.schema, ...body.schema },
    };

    await prisma.siteSetting.upsert({
      where: { key: "site_settings_v4" },
      update: { value: JSON.stringify(updated) },
      create: { key: "site_settings_v4", value: JSON.stringify(updated) },
    });

    clearSettingsCache();

    await prisma.auditLog.create({
      data: {
        action: "UPDATE_SEO_SETTINGS",
        target: "/admin/seo",
        userEmail: session.email,
        details: "Updated global SEO, verification codes, and schema metadata",
      },
    });

    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    console.error("Failed to save SEO settings:", err);
    return NextResponse.json({ error: err?.message || "Failed to save SEO settings" }, { status: 500 });
  }
}
