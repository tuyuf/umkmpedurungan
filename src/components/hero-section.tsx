"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight } from "lucide-react";
import { PageContainer } from "./page-container";
import { gsap, useGSAP } from "@/lib/gsap";
import { useRef } from "react";

export function HeroSection() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/?q=${encodeURIComponent(search.trim())}`);
    }
  }

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        ".hero-eyebrow",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".hero-search",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          ".hero-stat",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 },
          "-=0.2"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-surface">
      <PageContainer>
        <div className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center md:min-h-[80vh]">
          <p className="hero-eyebrow mb-6 text-[11px] font-bold tracking-[0.25em] text-muted-foreground opacity-0">
            Temukan UMKM Pedurungan Tengah
          </p>

          <h1 className="hero-title mb-6 max-w-4xl font-display font-bold leading-[0.95] tracking-tight text-foreground opacity-0" style={{ fontSize: "clamp(3rem, 1.5rem + 5vw, 7rem)" }}>
            Dukung Usaha Lokal,{" "}
            <span className="font-light">Bangun Ekonomi</span>{" "}
            Bersama
          </h1>

          <p className="hero-subtitle mb-10 max-w-md text-sm text-muted-foreground md:text-base opacity-0">
            Jelajahi ribuan usaha mikro, kecil, dan menengah di sekitar Anda.
            Temukan produk dan layanan terbaik dari pelaku UMKM lokal.
          </p>

          <form
            onSubmit={handleSubmit}
            className="hero-search relative w-full max-w-md opacity-0"
          >
            <div className="relative flex items-center border-b-2 border-foreground">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari UMKM, produk, atau lokasi..."
                className="w-full bg-transparent py-3 pl-3 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 p-1 text-muted-foreground hover:text-foreground transition-colors duration-150"
                aria-label="Search"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="mt-16 flex items-center gap-12 text-center">
            <div className="hero-stat opacity-0">
              <p className="text-2xl font-display font-bold text-foreground">500+</p>
              <p className="text-[11px] text-muted-foreground tracking-wider">UMKM Terdaftar</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="hero-stat opacity-0">
              <p className="text-2xl font-display font-bold text-foreground">50+</p>
              <p className="text-[11px] text-muted-foreground tracking-wider">Kota</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="hero-stat opacity-0">
              <p className="text-2xl font-display font-bold text-foreground">10k+</p>
              <p className="text-[11px] text-muted-foreground tracking-wider">Pengguna</p>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
