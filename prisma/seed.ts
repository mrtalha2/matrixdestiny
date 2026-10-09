import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth/admin-auth";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Destiny Matrix database seed...");

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || "admin@matrixofdestiny.online";
  const adminPassword = process.env.ADMIN_PASSWORD || "AdminMatrix2026!";
  const passwordHash = await hashPassword(adminPassword);

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash,
        name: "Master Administrator",
        role: "superadmin",
      },
    });
    console.log(`✅ Seeded admin user: ${adminEmail} (password: ${adminPassword})`);
  } else {
    console.log(`ℹ️ Admin user ${adminEmail} already exists.`);
  }

  // 2. Seed Default Site Settings
  console.log("Seeding site settings...");
  const defaultSettings: Record<string, string> = {
    isr_default_revalidate: "3600",
    cache_purge_adapter: "nextjs", // "nextjs" | "litespeed"
    image_quality: "85",
    image_formats: "image/avif,image/webp",
    litespeed_api_url: "http://127.0.0.1:8088/purge-cache",
    litespeed_auth_token: "placeholder_litespeed_token",
    admin_allow_list: adminEmail,
  };

  for (const [key, value] of Object.entries(defaultSettings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }
  console.log("✅ Seeded site settings.");

  console.log("🎉 Destiny Matrix database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
