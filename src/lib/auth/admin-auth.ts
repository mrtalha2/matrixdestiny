export const SESSION_COOKIE_NAME = "admin_session";

/**
 * Retrieves the admin session secret from environment variables.
 * Fails closed with an explicit error if missing.
 */
export function getAdminSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.trim() === "") {
    throw new Error(
      "CRITICAL SECURITY CONFIGURATION ERROR: ADMIN_SESSION_SECRET is not set in environment variables. Admin authentication failed closed."
    );
  }
  return secret.trim();
}

/**
 * Retrieves the admin allowed emails list from environment variables.
 * Fails closed with an explicit error if missing.
 */
export function getAdminAllowedEmails(): string[] {
  const emails = process.env.ADMIN_EMAILS;
  if (!emails || emails.trim() === "") {
    throw new Error(
      "CRITICAL SECURITY CONFIGURATION ERROR: ADMIN_EMAILS is not set in environment variables. Admin authentication failed closed."
    );
  }
  return emails
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

/**
 * Hashes a plain password with a salt using SHA-256 (Web Crypto standard).
 * Format: salt:hash
 */
export async function hashPassword(password: string): Promise<string> {
  const secret = getAdminSessionSecret();
  const saltBytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(saltBytes);
  const salt = Array.from(saltBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password + secret);
  const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", data);
  const hash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${salt}:${hash}`;
}

/**
 * Verifies a password against stored salt:hash string (Web Crypto standard).
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const secret = getAdminSessionSecret();
  const [salt, originalHash] = storedHash.split(":");
  if (!salt || !originalHash) return false;

  const encoder = new TextEncoder();
  const data = encoder.encode(salt + password + secret);
  const hashBuffer = await globalThis.crypto.subtle.digest("SHA-256", data);
  const computedHash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return computedHash === originalHash;
}

/**
 * Checks if an email is allow-listed for admin access.
 */
export function isAllowedAdminEmail(email: string): boolean {
  const allowed = getAdminAllowedEmails();
  const normalized = email.trim().toLowerCase();
  return allowed.includes(normalized);
}

export interface AdminSessionPayload {
  email: string;
  name: string;
  role: string;
  expiresAt: number; // Unix timestamp in ms
}

/**
 * Web Crypto helper to compute HMAC SHA-256 hex string
 */
async function computeHmacSha256(data: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const msgData = encoder.encode(data);

  const cryptoSubtle = globalThis.crypto.subtle;
  const cryptoKey = await cryptoSubtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await cryptoSubtle.sign("HMAC", cryptoKey, msgData);
  const hashArray = Array.from(new Uint8Array(signatureBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Creates a signed session token.
 * Format: base64Payload.signature
 */
export async function createSessionToken(
  payload: Omit<AdminSessionPayload, "expiresAt">,
  durationHours = 24
): Promise<string> {
  const secret = getAdminSessionSecret();
  const sessionData: AdminSessionPayload = {
    ...payload,
    expiresAt: Date.now() + durationHours * 60 * 60 * 1000,
  };

  const payloadStr = JSON.stringify(sessionData);
  let base64Payload: string;
  if (typeof Buffer !== "undefined") {
    base64Payload = Buffer.from(payloadStr, "utf-8").toString("base64url");
  } else {
    base64Payload = btoa(payloadStr).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  const signature = await computeHmacSha256(base64Payload, secret);
  return `${base64Payload}.${signature}`;
}

/**
 * Verifies and decodes a signed session token (Edge & Node compatible).
 */
export async function verifySessionToken(token: string | undefined): Promise<AdminSessionPayload | null> {
  if (!token) return null;
  const secret = getAdminSessionSecret();
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [base64Payload, signature] = parts;
  const expectedSignature = await computeHmacSha256(base64Payload, secret);

  if (signature !== expectedSignature) return null;

  try {
    let payloadStr: string;
    if (typeof Buffer !== "undefined") {
      payloadStr = Buffer.from(base64Payload, "base64url").toString("utf-8");
    } else {
      let b64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4) b64 += "=";
      payloadStr = atob(b64);
    }

    const payload: AdminSessionPayload = JSON.parse(payloadStr);

    if (Date.now() > payload.expiresAt) {
      return null;
    }

    if (!isAllowedAdminEmail(payload.email)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
