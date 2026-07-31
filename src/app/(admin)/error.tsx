"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <h1 className="mb-4 text-2xl font-normal tracking-tight text-foreground">
        Terjadi Kesalahan
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Maaf, terjadi kesalahan yang tidak terduga.
      </p>
      <button
        onClick={reset}
        className="rounded-[12px] border border-border bg-card px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-muted transition-colors"
      >
        Coba Lagi
      </button>
    </div>
  );
}
