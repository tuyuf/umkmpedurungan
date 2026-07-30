"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FooterMap } from "./footer-map";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-reveal",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-background pt-16 pb-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 mb-12 pb-12 border-b border-border">
          <div className="lg:col-span-3 flex flex-col gap-24">
            <div className="footer-reveal">
              <Image
                src="/pedtengah.png"
                alt="Pedtengah"
                width={1520}
                height={419}
                className="h-24 w-auto"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="footer-reveal">
                <span className="font-display text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground block mb-6">
                  Navigasi
                </span>
                <ul className="flex flex-col gap-3 font-sans text-sm text-foreground/70">
                  <li>
                    <Link href="/" className="hover:text-foreground transition-colors duration-150">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/umkm" className="hover:text-foreground transition-colors duration-150">
                      UMKM
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="footer-reveal">
                <span className="font-display text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground block mb-6">
                  Tentang
                </span>
                <p className="font-sans text-sm text-foreground/60 leading-relaxed max-w-md">
                  Platform untuk menemukan dan mendukung usaha mikro, kecil, dan
                  menengah lokal di wilayah Pedurungan, Semarang.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 footer-reveal">
            <span className="font-display text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground block mb-4 lg:sr-only">
              Lokasi
            </span>
            <FooterMap />
          </div>
        </div>

        <div className="footer-reveal flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-xs text-muted-foreground tracking-[0.1em]">
          <p>&copy; {new Date().getFullYear()} UMKM Pedurungan Tengah. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-foreground transition-colors duration-150">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors duration-150">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
