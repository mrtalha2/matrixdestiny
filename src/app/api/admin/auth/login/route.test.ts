import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { POST } from "./route";
import { NextRequest } from "next/server";

// Mock prisma
vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    adminUser: {
      findUnique: vi.fn().mockResolvedValue(null),
    },
    auditLog: {
      create: vi.fn().mockResolvedValue({ id: "audit-123" }),
    },
  },
}));

describe("Admin Login Rate Limiting & Throttling", () => {
  beforeEach(() => {
    process.env.ADMIN_SESSION_SECRET = "test-secret-key-32-bytes-long-super-secure-1234=";
    process.env.ADMIN_EMAILS = "admin@matrixofdestiny.online";
  });

  it("throttles after 5 failed login attempts from the same IP with a 429 response and Retry-After header", async () => {
    const testIp = "203.0.113.42";

    // 5 failed attempts
    for (let i = 1; i <= 5; i++) {
      const req = new NextRequest("http://localhost:3000/api/admin/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": testIp,
        },
        body: JSON.stringify({
          email: "admin@matrixofdestiny.online",
          password: `wrong-password-${i}`,
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(401);
      const data = await res.json();
      expect(data.error).toBe("Invalid email or password.");
    }

    // 6th attempt should be blocked with 429
    const blockedReq = new NextRequest("http://localhost:3000/api/admin/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": testIp,
      },
      body: JSON.stringify({
        email: "admin@matrixofdestiny.online",
        password: "any-password",
      }),
    });

    const blockedRes = await POST(blockedReq);
    expect(blockedRes.status).toBe(429);
    expect(blockedRes.headers.get("Retry-After")).toBeTruthy();
    const blockedData = await blockedRes.json();
    expect(blockedData.error).toContain("Too many login attempts");
  });

  it("does not reveal whether non-allowlisted emails exist", async () => {
    const req = new NextRequest("http://localhost:3000/api/admin/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": "198.51.100.22",
      },
      body: JSON.stringify({
        email: "nonexistent@unknown.com",
        password: "wrong-password",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
    const data = await res.json();
    expect(data.error).toBe("Invalid email or password.");
  });
});
