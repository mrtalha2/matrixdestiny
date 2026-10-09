"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  RefreshCw,
  Server,
  Image as ImageIcon,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_DOMAIN } from "@/lib/seo/structured-data";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isPurging, setIsPurging] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState(false);

  // Profile & Username state
  const [adminProfile, setAdminProfile] = useState<{ email: string; name: string; role: string } | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [isSavingUsername, setIsSavingUsername] = useState(false);
  const [usernameSuccess, setUsernameSuccess] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [settingsRes, profileRes] = await Promise.all([
          fetch("/api/admin/settings"),
          fetch("/api/admin/profile"),
        ]);
        const data = await settingsRes.json();
        if (data.settings) setSettings(data.settings);

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          if (profileData.admin) {
            setAdminProfile(profileData.admin);
            setUsernameInput(profileData.admin.name || "");
          }
        }
      } catch (err) {
        console.error("Failed to load settings or profile:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError("");
    const trimmed = usernameInput.trim();
    if (!trimmed || trimmed.length < 2) {
      setUsernameError("Username must be at least 2 characters long.");
      return;
    }
    if (trimmed.length > 50) {
      setUsernameError("Username cannot exceed 50 characters.");
      return;
    }

    try {
      setIsSavingUsername(true);
      const res = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setUsernameError(data.error || "Failed to update username");
      } else {
        setUsernameSuccess(true);
        if (adminProfile) {
          setAdminProfile({ ...adminProfile, name: data.name });
        }
        setTimeout(() => setUsernameSuccess(false), 3000);
      }
    } catch (err) {
      setUsernameError("Failed to update username. Network error.");
    } finally {
      setIsSavingUsername(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error("Save settings error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePurgeAll = async () => {
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

  if (isLoading) {
    return <div className="p-12 text-center text-xs text-ink-muted">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border-subtle">
        <div>
          <h1 className="text-2xl font-display font-medium text-ink-primary">
            Settings & Architecture
          </h1>
          <p className="text-xs text-ink-secondary mt-1">
            Manage your admin profile, ISR cache timeouts, LiteSpeed Web Server purge adapters, and code injection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePurgeAll}
            isLoading={isPurging}
            leftIcon={
              purgeSuccess ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
              ) : (
                <RefreshCw className="w-3.5 h-3.5" />
              )
            }
          >
            {purgeSuccess ? "All Purged!" : "Purge Entire Cache"}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            isLoading={isSaving}
            leftIcon={
              saveSuccess ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )
            }
          >
            {saveSuccess ? "Saved!" : "Save Settings"}
          </Button>
        </div>
      </div>

      {/* Admin Profile & Change Username Card */}
      <div className="rounded-xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/[0.04] to-surface p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-medium text-sm text-ink-primary">
                Admin Account & Profile
              </h3>
              <p className="text-[11px] text-ink-muted">
                Update your display name and administrative credentials
              </p>
            </div>
          </div>
          {adminProfile && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium uppercase bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
              {adminProfile.role}
            </span>
          )}
        </div>

        <form onSubmit={handleUpdateUsername} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Admin Email (System Login)
              </label>
              <input
                type="text"
                disabled
                value={adminProfile?.email || `admin@${SITE_DOMAIN}`}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border-subtle bg-surface-raised text-ink-muted cursor-not-allowed font-mono"
              />
              <span className="text-[10px] text-ink-muted mt-1 block">
                Contact database administrator to change root email.
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Display Username <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="e.g. Master Oracle, John Doe"
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-border-strong bg-surface text-ink-primary font-medium focus:outline-none focus:ring-1 focus:ring-brand-primary"
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isSavingUsername}
                  leftIcon={
                    usernameSuccess ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
                    ) : (
                      <Save className="w-3.5 h-3.5" />
                    )
                  }
                >
                  {usernameSuccess ? "Updated!" : "Change Username"}
                </Button>
              </div>
              <span className="text-[10px] text-ink-muted mt-1 block">
                This name is displayed in admin logs, audits, and console sessions.
              </span>
            </div>
          </div>

          {usernameError && (
            <div className="text-xs text-red-500 flex items-center gap-1.5 pt-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{usernameError}</span>
            </div>
          )}

          {usernameSuccess && (
            <div className="text-xs text-status-success flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Username successfully updated and session refreshed!</span>
            </div>
          )}
        </form>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Hosting & Cache Purge Adapter */}
        <div className="rounded-xl border border-border-subtle bg-surface p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border-subtle">
            <Server className="w-4 h-4 text-brand-primary" />
            <h3 className="font-display font-medium text-sm text-ink-primary">
              Cache Purge Engine (Host-Agnostic Adapter)
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Active Purge Adapter
              </label>
              <select
                value={settings.cache_purge_adapter || "nextjs"}
                onChange={(e) =>
                  setSettings({ ...settings, cache_purge_adapter: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-lg border border-border-strong bg-surface text-ink-primary font-medium"
              >
                <option value="nextjs">Next.js On-Demand ISR Revalidation (Default - Cloud & Node)</option>
                <option value="litespeed">LiteSpeed Web Server API (Self-Hosted VPS Mode)</option>
              </select>
            </div>

            {settings.cache_purge_adapter === "litespeed" && (
              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-ink-secondary leading-relaxed">
                    <strong className="text-ink-primary block">LiteSpeed VPS Integration Notes:</strong>
                    When running behind a LiteSpeed Web Server reverse proxy, cache purges can be dispatched via HTTP requests or local Unix sockets. Ensure your VPS firewall permits loopback purge requests.
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-ink-muted">LiteSpeed API Endpoint</label>
                    <input
                      type="text"
                      value={settings.litespeed_api_url || "http://127.0.0.1:8088/purge-cache"}
                      onChange={(e) =>
                        setSettings({ ...settings, litespeed_api_url: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-border-strong bg-surface text-ink-primary"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-ink-muted">Purge Auth Token</label>
                    <input
                      type="password"
                      value={settings.litespeed_auth_token || ""}
                      onChange={(e) =>
                        setSettings({ ...settings, litespeed_auth_token: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs font-mono rounded-lg border border-border-strong bg-surface text-ink-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Default Route ISR Revalidation (seconds)
              </label>
              <input
                type="number"
                value={settings.isr_default_revalidate || "3600"}
                onChange={(e) =>
                  setSettings({ ...settings, isr_default_revalidate: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-lg border border-border-strong bg-surface text-ink-primary font-mono"
              />
              <span className="text-[11px] text-ink-muted mt-1 block">
                Standard TTL applied to public hubs when not overridden per-entry.
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Image Optimization Settings */}
        <div className="rounded-xl border border-border-subtle bg-surface p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border-subtle">
            <ImageIcon className="w-4 h-4 text-brand-primary" />
            <h3 className="font-display font-medium text-sm text-ink-primary">
              Image Optimization (next/image)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-ink-secondary">Default Quality (1-100)</label>
              <input
                type="number"
                min="50"
                max="100"
                value={settings.image_quality || "85"}
                onChange={(e) =>
                  setSettings({ ...settings, image_quality: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-lg border border-border-strong bg-surface text-ink-primary font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-ink-secondary">Supported Formats</label>
              <input
                type="text"
                value={settings.image_formats || "image/avif,image/webp"}
                onChange={(e) =>
                  setSettings({ ...settings, image_formats: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-lg border border-border-strong bg-surface text-ink-primary font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Admin Allow-list */}
        <div className="rounded-xl border border-border-subtle bg-surface p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border-subtle">
            <ShieldCheck className="w-4 h-4 text-brand-primary" />
            <h3 className="font-display font-medium text-sm text-ink-primary">
              Admin Access Allow-list
            </h3>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-ink-secondary">
              Authorized Admin Email Addresses (comma separated)
            </label>
            <input
              type="text"
              value={settings.admin_allow_list || `admin@${SITE_DOMAIN}`}
              onChange={(e) =>
                setSettings({ ...settings, admin_allow_list: e.target.value })
              }
              className="w-full px-3 py-2 text-xs rounded-lg border border-border-strong bg-surface text-ink-primary"
            />
            <span className="text-[11px] text-ink-muted block">
              Only accounts matching these emails are permitted to establish active admin sessions.
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
