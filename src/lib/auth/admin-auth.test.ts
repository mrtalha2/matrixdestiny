import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  getAdminSessionSecret,
  getAdminAllowedEmails,
  isAllowedAdminEmail,
  createSessionToken,
  verifySessionToken,
  hashPassword,
  verifyPassword,
} from "./admin-auth";

describe("Admin Authentication Security Hardening", () => {
  const originalSecret = process.env.ADMIN_SESSION_SECRET;
  const originalEmails = process.env.ADMIN_EMAILS;

  beforeEach(() => {
    process.env.ADMIN_SESSION_SECRET = "test-secret-key-32-bytes-long-super-secure-1234=";
    process.env.ADMIN_EMAILS = "admin@matrixofdestiny.online, security@matrixofdestiny.online";
  });

  afterEach(() => {
    process.env.ADMIN_SESSION_SECRET = originalSecret;
    process.env.ADMIN_EMAILS = originalEmails;
  });

  describe("Fail-closed behavior when env vars are missing", () => {
    it("throws a critical error when ADMIN_SESSION_SECRET is undefined", () => {
      delete process.env.ADMIN_SESSION_SECRET;
      expect(() => getAdminSessionSecret()).toThrowError(
        /ADMIN_SESSION_SECRET is not set/
      );
    });

    it("throws a critical error when ADMIN_EMAILS is undefined", () => {
      delete process.env.ADMIN_EMAILS;
      expect(() => getAdminAllowedEmails()).toThrowError(
        /ADMIN_EMAILS is not set/
      );
    });

    it("fails closed in isAllowedAdminEmail if ADMIN_EMAILS is missing", () => {
      delete process.env.ADMIN_EMAILS;
      expect(() => isAllowedAdminEmail("admin@matrixofdestiny.online")).toThrow();
    });
  });

  describe("Allow-list verification", () => {
    it("accepts emails on the allow-list (case-insensitive)", () => {
      expect(isAllowedAdminEmail("admin@matrixofdestiny.online")).toBe(true);
      expect(isAllowedAdminEmail("ADMIN@MATRIXOFDESTINY.ONLINE")).toBe(true);
      expect(isAllowedAdminEmail("security@matrixofdestiny.online")).toBe(true);
    });

    it("rejects unauthorized emails", () => {
      expect(isAllowedAdminEmail("hacker@malicious.com")).toBe(false);
      expect(isAllowedAdminEmail("random@matrixofdestiny.online")).toBe(false);
    });
  });

  describe("Password hashing & verification", () => {
    it("correctly hashes and verifies passwords", async () => {
      const password = "SuperSecretPassword2026!";
      const hash = await hashPassword(password);
      expect(hash).toContain(":");
      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);
      const isInvalid = await verifyPassword("WrongPassword", hash);
      expect(isInvalid).toBe(false);
    });
  });

  describe("Session token generation & verification", () => {
    it("creates a signed token and verifies payload successfully", async () => {
      const token = await createSessionToken({
        email: "admin@matrixofdestiny.online",
        name: "Admin User",
        role: "SUPERADMIN",
      });

      expect(token).toContain(".");
      const payload = await verifySessionToken(token);
      expect(payload).not.toBeNull();
      expect(payload?.email).toBe("admin@matrixofdestiny.online");
      expect(payload?.role).toBe("SUPERADMIN");
    });

    it("rejects forged or tampered tokens", async () => {
      const token = await createSessionToken({
        email: "admin@matrixofdestiny.online",
        name: "Admin User",
        role: "SUPERADMIN",
      });

      const [payloadPart] = token.split(".");
      const forgedToken = `${payloadPart}.invalid_signature_hash_12345`;
      const result = await verifySessionToken(forgedToken);
      expect(result).toBeNull();
    });

    it("invalidates tokens issued with an old secret when secret changes", async () => {
      const token = await createSessionToken({
        email: "admin@matrixofdestiny.online",
        name: "Admin User",
        role: "SUPERADMIN",
      });

      // Rotate secret
      process.env.ADMIN_SESSION_SECRET = "different-new-secret-32-bytes-long-super-secure-5678=";
      const result = await verifySessionToken(token);
      expect(result).toBeNull();
    });
  });
});
