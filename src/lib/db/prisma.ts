import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export function isDatabaseConfigured(): boolean {
  if (process.env.NODE_ENV === "test") return true;
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  if (url.includes("HOST:5432") || url.includes("USER:PASSWORD")) return false;
  return true;
}
