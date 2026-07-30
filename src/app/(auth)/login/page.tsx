"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push(redirectTo);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || "Email atau password salah");
      }
    } catch {
      setError("Terjadi kesalahan, coba lagi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-xl font-display font-normal text-foreground tracking-tight">Masuk</h1>
        <p className="text-sm text-muted-foreground">
          Selamat datang kembali
        </p>
      </div>

      {error && (
        <div className="px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-5">
        <div className="space-y-2">
          <FieldLabel htmlFor="email" className="text-[11px] font-bold tracking-[0.15em] text-muted-foreground">
            Email
          </FieldLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="h-10 border-0 border-b-2 border-border bg-transparent px-0 text-sm text-foreground focus-visible:border-foreground"
            required
          />
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor="password" className="text-[11px] font-bold tracking-[0.15em] text-muted-foreground">
            Password
          </FieldLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="h-10 border-0 border-b-2 border-border bg-transparent px-0 text-sm text-foreground focus-visible:border-foreground"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="default"
        className="w-full h-10 gap-2 text-sm font-bold tracking-widest"
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Masuk
            <ArrowRight className="h-3.5 w-3.5" />
          </>
        )}
      </Button>

    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 bg-background">
      <div className="w-full max-w-sm">
        <div className="mb-12 text-center">
          <Link
            href="/"
            className="text-lg font-display font-normal tracking-tight text-foreground"
          >
            UMKM Pedurungan Tengah
          </Link>
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
