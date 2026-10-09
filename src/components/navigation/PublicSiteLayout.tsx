"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";

import { HeaderConfig, FooterConfig } from "@/lib/settings/site-settings";

interface PublicSiteLayoutProps {
  children: React.ReactNode;
  header?: HeaderConfig;
  footer?: FooterConfig;
}

/**
 * Universal Site Layout wrapper
 * Ensures Header (Navbar), Footer, and the minimal sacred background
 * are statically present on every public page (including guides, blog posts,
 * calculators, and legal docs), while leaving the /admin section untouched.
 */
export function PublicSiteLayout({ children, header, footer }: PublicSiteLayoutProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-brand-primary/15 selection:text-brand-primary">
      <SacredAuraBackground showGeometry intensity="subtle" />
      <Navbar initialConfig={header} />
      <main className="flex-1 w-full">{children}</main>
      <Footer initialConfig={footer} />
    </div>
  );
}
