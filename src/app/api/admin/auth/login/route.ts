import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import {
  verifyPassword,
  createSessionToken,
  isAllowedAdminEmail,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/admin-auth";

export const dynamic = "force-dynamic";

interface FailedAttemptRecord {
  count: number;
  firstAttemptTime: number;
  lastAttemptTime: number;
}

const MAX_FAILED_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes in ms

// In-memory sliding window rate limiter per client IP
const loginAttemptsByIp = new Map<string, FailedAttemptRecord>();

function cleanExpiredAttempts() {
  const now = Date.now();
  loginAttemptsByIp.forEach((record, ip) => {
    if (now - record.firstAttemptTime > WINDOW_MS) {
      loginAttemptsByIp.delete(ip);
    }
  });
}

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return req.ip || "127.0.0.1";
}

export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req);
  cleanExpiredAttempts();

  // Check rate limit status
  const existingRecord = loginAttemptsByIp.get(clientIp);
  if (existingRecord && existingRecord.count >= MAX_FAILED_ATTEMPTS) {
    const elapsed = Date.now() - existingRecord.firstAttemptTime;
    if (elapsed < WINDOW_MS) {
      const retryAfterSeconds = Math.max(1, Math.ceil((WINDOW_MS - elapsed) / 1000));
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfterSeconds),
          },
        }
      );
    } else {
      // Window has elapsed, reset counter
      loginAttemptsByIp.delete(clientIp);
    }
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Helper to record failed attempt without revealing existence of email
    const recordFailedAttempt = async (reason: string) => {
      const now = Date.now();
      const current = loginAttemptsByIp.get(clientIp);
      if (!current || now - current.firstAttemptTime > WINDOW_MS) {
        loginAttemptsByIp.set(clientIp, {
          count: 1,
          firstAttemptTime: now,
          lastAttemptTime: now,
        });
      } else {
        current.count += 1;
        current.lastAttemptTime = now;
      }

      const currentCount = loginAttemptsByIp.get(clientIp)?.count || 1;

      // Log to AuditLog
      try {
        await prisma.auditLog.create({
          data: {
            action: currentCount >= MAX_FAILED_ATTEMPTS ? "ADMIN_LOGIN_RATE_LIMIT" : "ADMIN_LOGIN_FAILED",
            target: "/admin/login",
            userEmail: normalizedEmail,
            details: `Failed attempt ${currentCount}/${MAX_FAILED_ATTEMPTS} from IP ${clientIp}. Reason: ${reason}`,
          },
        });
      } catch (auditErr) {
        console.error("Failed to write login audit log:", auditErr);
      }
    };

    // Check allow-list - generic error to prevent account enumeration
    if (!isAllowedAdminEmail(normalizedEmail)) {
      await recordFailedAttempt("Email not on allow-list");
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email: normalizedEmail },
    });

    const isValidPassword = admin ? await verifyPassword(password, admin.passwordHash) : false;
    if (!admin || !isValidPassword) {
      await recordFailedAttempt("Invalid credentials");
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Reset failed attempts on success
    loginAttemptsByIp.delete(clientIp);

    // Create session token
    const token = await createSessionToken({
      email: admin.email,
      name: admin.name || "Administrator",
      role: admin.role,
    });

    // Create Audit Log
    try {
      await prisma.auditLog.create({
        data: {
          action: "ADMIN_LOGIN",
          target: "/admin",
          userEmail: admin.email,
          details: `Successful admin login from IP ${clientIp}`,
        },
      });
    } catch (auditErr) {
      console.error("Failed to write success audit log:", auditErr);
    }

    const response = NextResponse.json({
      success: true,
      user: { email: admin.email, name: admin.name, role: admin.role },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (err: any) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
