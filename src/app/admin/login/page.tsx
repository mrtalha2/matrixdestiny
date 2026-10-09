"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_DOMAIN } from "@/lib/seo/structured-data";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push(nextUrl);
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-surface border border-border-strong flex items-center justify-center text-brand-primary shadow-elevation-subtle">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-2xl font-display font-medium text-ink-primary">
          Destiny Matrix Administration
        </h2>
        <p className="mt-1 text-center text-xs text-ink-secondary">
          Protected content management & SEO infrastructure
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-surface py-8 px-6 sm:px-10 rounded-2xl border border-border-strong shadow-elevation-mid space-y-6">
          {error && (
            <div className="p-3 rounded-lg border border-status-error/20 bg-status-error/5 text-xs text-status-error">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-muted absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={`admin@${SITE_DOMAIN}`}
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-border-strong bg-surface focus:outline-none focus:ring-1 focus:ring-brand-primary text-ink-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-ink-muted absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-border-strong bg-surface focus:outline-none focus:ring-1 focus:ring-brand-primary text-ink-primary"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full justify-center"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In to Console
              </Button>
            </div>
          </form>

          <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-[11px] text-ink-muted">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-status-success" /> Allow-list gated
            </span>
            <span>Default: AdminMatrix2026!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
