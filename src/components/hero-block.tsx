"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { transformCloudinaryUrl } from "@/lib/cloudinary";

interface HeroBanner {
  id: string;
  title: string | null;
  subtitle: string | null;
  link: string | null;
  image: string;
  mobileImage: string | null;
  active: boolean;
}

interface HeroBlockProps {
  banners: HeroBanner[];
}

export function HeroBlock({ banners }: HeroBlockProps) {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [banners.length, next]);

  if (banners.length === 0) return null;

  const banner = banners[current];
  const bgImage = isMobile && banner.mobileImage ? banner.mobileImage : banner.image;

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={banner.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {bgImage && (
            <Image
              src={transformCloudinaryUrl(bgImage, "w_1920,q_auto,f_auto")}
              alt={banner.title || "Banner"}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center px-6 max-w-4xl"
          >
            {banner.title && (
              <h1
                className="font-display font-normal text-white leading-[1.0] tracking-[-0.03em] mb-6"
                style={{
                  fontSize: "clamp(2.5rem, 1.2rem + 5vw, 5rem)",
                }}
              >
                {banner.title}
              </h1>
            )}
            {banner.subtitle && (
              <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8 tracking-[-0.01em]">
                {banner.subtitle}
              </p>
            )}
            {banner.link && (
              <Link
                href={banner.link}
                className="inline-block px-8 py-3.5 rounded bg-white text-black text-xs font-semibold uppercase tracking-[0.15em] hover:bg-white/90 transition-colors duration-150"
              >
                Lihat Selengkapnya
              </Link>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-150"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-150"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-px transition-all duration-300 ${
                  i === current ? "bg-white w-8" : "bg-white/40 w-4 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
