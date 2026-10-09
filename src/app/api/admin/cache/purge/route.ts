import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/admin-auth";
import { getCachePurgeAdapter } from "@/lib/cache/cache-adapter";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(sessionCookie);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { path, all } = body;

    // Get active cache adapter setting
    const adapterSetting = await prisma.siteSetting.findUnique({
      where: { key: "cache_purge_adapter" },
    });
    const apiUrlSetting = await prisma.siteSetting.findUnique({
      where: { key: "litespeed_api_url" },
    });
    const authTokenSetting = await prisma.siteSetting.findUnique({
      where: { key: "litespeed_auth_token" },
    });

    const adapterType = (adapterSetting?.value === "litespeed" ? "litespeed" : "nextjs") as "nextjs" | "litespeed";
    const adapter = getCachePurgeAdapter(adapterType, {
      apiUrl: apiUrlSetting?.value,
      authToken: authTokenSetting?.value,
    });

    let result;
    if (all) {
      result = await adapter.purgeAll();
    } else if (path) {
      result = await adapter.purgePath(path);
    } else {
      return NextResponse.json({ error: "Provide either 'path' or 'all: true'" }, { status: 400 });
    }

    // Record Audit Log
    await prisma.auditLog.create({
      data: {
        action: all ? "PURGE_ALL_CACHE" : "PURGE_PATH_CACHE",
        target: all ? "*" : path,
        userEmail: session.email,
        details: `Purge triggered via ${adapterType} adapter. Success: ${result.success}`,
      },
    });

    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error("Purge cache error:", err);
    return NextResponse.json({ error: err?.message || "Cache purge failed" }, { status: 500 });
  }
}
