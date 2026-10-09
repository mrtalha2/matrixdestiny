import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import {
  Clock,
  ExternalLink,
  Sparkles,
  PanelTop,
  Globe,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Fetch recent audit activity
  const recentAudits = await prisma.auditLog.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-medium text-ink-primary">
            Site Management Console
          </h1>
          <p className="text-xs text-ink-secondary mt-1">
            Centralized control for SEO metadata, script injection, header/footer navigation, and audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/sitemap.xml"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-strong bg-surface hover:bg-surface-raised text-xs font-medium text-ink-primary transition-colors shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 text-brand-primary" />
            <span>Open sitemap.xml</span>
          </Link>
        </div>
      </div>

      {/* Modules Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* SEO Manager */}
        <Card elevation="subtle" className="p-5 border-border-subtle bg-surface">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-ink-muted tracking-wider">
              SEO Engine
            </span>
            <div className="w-7 h-7 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-sm font-medium text-ink-primary">
              Rank Math Style
            </span>
            <Link
              href="/admin/seo"
              className="text-xs text-brand-primary hover:underline font-medium"
            >
              Configure &rarr;
            </Link>
          </div>
        </Card>

        {/* Custom Scripts */}
        <Card elevation="subtle" className="p-5 border-border-subtle bg-surface">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-ink-muted tracking-wider">
              Code Injector
            </span>
            <div className="w-7 h-7 rounded-lg bg-chart-spirit/10 flex items-center justify-center text-chart-spirit">
              <PanelTop className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-sm font-medium text-ink-primary">
              WPCode Style
            </span>
            <Link
              href="/admin/scripts"
              className="text-xs text-brand-primary hover:underline font-medium"
            >
              Manage &rarr;
            </Link>
          </div>
        </Card>

        {/* Header & Footer */}
        <Card elevation="subtle" className="p-5 border-border-subtle bg-surface">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-ink-muted tracking-wider">
              Navigation
            </span>
            <div className="w-7 h-7 rounded-lg bg-chart-karmic/10 flex items-center justify-center text-chart-karmic">
              <Settings className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-sm font-medium text-ink-primary">
              Header / Footer
            </span>
            <Link
              href="/admin/navigation"
              className="text-xs text-brand-primary hover:underline font-medium"
            >
              Edit Menus &rarr;
            </Link>
          </div>
        </Card>

        {/* General Settings */}
        <Card elevation="subtle" className="p-5 border-border-subtle bg-surface">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-ink-muted tracking-wider">
              Settings & Cache
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-sm font-medium text-ink-primary">
              Site Settings
            </span>
            <Link
              href="/admin/settings"
              className="text-xs text-brand-primary hover:underline font-medium"
            >
              Open &rarr;
            </Link>
          </div>
        </Card>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/seo"
          className="p-4 rounded-xl border border-border-subtle bg-surface hover:border-brand-primary transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-center text-brand-primary group-hover:scale-105 transition-transform">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-ink-primary group-hover:text-brand-primary transition-colors">
                SEO Manager
              </h4>
              <p className="text-xs text-ink-muted">Global tags & page overrides</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/scripts"
          className="p-4 rounded-xl border border-border-subtle bg-surface hover:border-brand-primary transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-center text-brand-primary group-hover:scale-105 transition-transform">
              <PanelTop className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-ink-primary group-hover:text-brand-primary transition-colors">
                Custom Code
              </h4>
              <p className="text-xs text-ink-muted">Head, body start & end scripts</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/navigation"
          className="p-4 rounded-xl border border-border-subtle bg-surface hover:border-brand-primary transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-center text-brand-primary group-hover:scale-105 transition-transform">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-ink-primary group-hover:text-brand-primary transition-colors">
                Navigation
              </h4>
              <p className="text-xs text-ink-muted">Header, CTA & footer links</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="p-4 rounded-xl border border-border-subtle bg-surface hover:border-brand-primary transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-center text-brand-primary group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-ink-primary group-hover:text-brand-primary transition-colors">
                General Settings
              </h4>
              <p className="text-xs text-ink-muted">Site name, cache & profile</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Last 10 Content Edits / Audit Trail */}
      <div className="rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-primary" />
            <h3 className="font-display font-medium text-ink-primary text-base">
              Recent Admin Activity (Last 10 Actions)
            </h3>
          </div>
          <span className="text-xs font-mono text-ink-muted">
            Immutable Audit Trail
          </span>
        </div>

        {recentAudits.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border-subtle text-ink-muted uppercase font-mono text-[10px]">
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Target</th>
                  <th className="py-2.5 px-3">User</th>
                  <th className="py-2.5 px-3">Details</th>
                  <th className="py-2.5 px-3 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {recentAudits.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-raised transition-colors">
                    <td className="py-3 px-3">
                      <span className="font-mono font-semibold px-2 py-0.5 rounded bg-surface-raised border border-border-subtle text-[11px]">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-medium text-ink-primary">{log.target}</td>
                    <td className="py-3 px-3 text-ink-secondary">{log.userEmail}</td>
                    <td className="py-3 px-3 text-ink-muted max-w-xs truncate">
                      {log.details || "—"}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-ink-muted text-[11px]">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-ink-muted">
            No audit logs recorded yet. Changes made in the CMS will appear here.
          </div>
        )}
      </div>
    </div>
  );
}
