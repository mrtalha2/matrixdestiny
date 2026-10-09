import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await verifySessionToken(req.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await prisma.siteSetting.findMany();
  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return NextResponse.json({ settings: settingsMap });
}

export async function POST(req: NextRequest) {
  const session = await verifySessionToken(req.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    for (const [key, value] of Object.entries(body)) {
      if (typeof value === "string") {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value },
        });
      }
    }

    await prisma.auditLog.create({
      data: {
        action: "UPDATE_SETTINGS",
        target: "/admin/settings",
        userEmail: session.email,
        details: `Updated site settings: ${Object.keys(body).join(", ")}`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to update settings" }, { status: 500 });
  }
}
