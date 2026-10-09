import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
  createSessionToken,
} from "@/lib/auth/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await verifySessionToken(req.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const admin = await prisma.adminUser.findUnique({
      where: { email: session.email },
      select: { email: true, name: true, role: true },
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin user not found" }, { status: 404 });
    }

    return NextResponse.json({
      admin: {
        email: admin.email,
        name: admin.name || "Administrator",
        role: admin.role,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await verifySessionToken(req.cookies.get(SESSION_COOKIE_NAME)?.value);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const newName = body.name?.trim();

    if (!newName || newName.length < 2) {
      return NextResponse.json(
        { error: "Username must be at least 2 characters long." },
        { status: 400 }
      );
    }

    if (newName.length > 50) {
      return NextResponse.json(
        { error: "Username cannot exceed 50 characters." },
        { status: 400 }
      );
    }

    // Update in database
    const updatedUser = await prisma.adminUser.update({
      where: { email: session.email },
      data: { name: newName },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        action: "UPDATE_ADMIN_USERNAME",
        target: "/admin/settings",
        userEmail: session.email,
        details: `Changed admin username to "${newName}"`,
      },
    });

    // Create new refreshed session token with the updated name
    const newToken = await createSessionToken({
      email: updatedUser.email,
      name: updatedUser.name || newName,
      role: updatedUser.role,
    });

    const response = NextResponse.json({
      success: true,
      name: updatedUser.name,
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (err: any) {
    console.error("Profile update error:", err);
    return NextResponse.json({ error: "Failed to update username" }, { status: 500 });
  }
}
