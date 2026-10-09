"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  ExternalLink,
  RefreshCw,
  LogOut,
  Sparkles,
  CheckCircle2,
  PanelTop,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_DOMAIN } from "@/lib/seo/structured-data";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPurging, setIsPurging] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);

  React.useEffect(() => {
    // Fetch profile info for the header
    fetch("/api/admin/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.admin) setAdminUser(data.admin);
      })
      .catch(() => {});
  }, []);

  // If on login page, render clean full-width layout without admin chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navSections = [
    {
      title: "Overview",
      items: [
        { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      ],
    },
    {
      title: "Site Management",
      items: [
        { label: "SEO & Indexing", href: "/admin/seo", icon: Sparkles },
        { label: "Scripts & Code", href: "/admin/scripts", icon: PanelTop },
        { label: "Header & Footer", href: "/admin/navigation", icon: Settings },
        { label: "Settings & Profile", href: "/admin/settings", icon: RefreshCw },
      ],
    },
  ];

  const handleGlobalPurge = async () => {
    try {
      setIsPurging(true);
      const res = await fetch("/api/admin/cache/purge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      if (res.ok) {
        setPurgeSuccess(true);
        setTimeout(() => setPurgeSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Purge error:", err);
    } finally {
      setIsPurging(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col md:flex-row text-ink-primary selection:bg-brand-primary/15 selection:text-brand-primary">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-surface border-r border-border-subtle flex flex-col justify-between shrink-0">
        <div>
          {/* Logo / Brand */}
          <div className="p-5 border-b border-border-subtle flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-semibold text-sm text-ink-primary block leading-tight">
                Destiny Matrix
              </span>
              <span className="text-[10px] text-ink-muted uppercase tracking-wider font-mono">
                Site Console
              </span>
            </div>
          </div>

          {/* Nav Sections */}
          <nav className="p-3 space-y-4">
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <div className="px-3 text-[10px] font-mono uppercase tracking-wider text-ink-muted/70 font-semibold mb-1">
                  {section.title}
                </div>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-brand-primary text-white shadow-sm"
                          : "text-ink-secondary hover:text-ink-primary hover:bg-surface-raised"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-ink-muted"}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Actions & User */}
        <div className="p-4 border-t border-border-subtle space-y-3">
          <div className="flex items-center gap-2.5 text-xs">
            <div className="w-8 h-8 rounded-full bg-brand-primary/15 text-brand-primary font-bold flex items-center justify-center shrink-0 border border-brand-primary/25">
              {(adminUser?.name || "A")[0]?.toUpperCase() || "A"}
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-medium text-ink-primary block truncate">
                {adminUser?.name || "Administrator"}
              </span>
              <span className="text-[10px] text-ink-muted block truncate font-mono">
                {adminUser?.email || `admin@${SITE_DOMAIN}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className="flex-1">
              <Button variant="outline" size="sm" className="w-full text-xs justify-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                Live Site
              </Button>
            </Link>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-lg border border-border-subtle hover:bg-surface-raised text-ink-muted hover:text-ink-primary transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-border-subtle bg-surface/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase text-ink-muted tracking-wider">
              Console /
            </span>
            <span className="text-sm font-medium text-ink-primary capitalize">
              {pathname.replace("/admin", "").replace(/^\//, "") || "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/sitemap.xml"
              target="_blank"
              className="text-xs text-ink-secondary hover:text-brand-primary transition-colors flex items-center gap-1 hidden sm:flex"
            >
              <span>Live sitemap.xml</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Quick Purge All Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleGlobalPurge}
              isLoading={isPurging}
              leftIcon={
                purgeSuccess ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5" />
                )
              }
            >
              {purgeSuccess ? "Purged All!" : "Purge All Cache"}
            </Button>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="p-6 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
