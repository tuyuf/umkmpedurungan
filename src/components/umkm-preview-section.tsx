"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import { UmkmCard } from "./umkm-card";

interface UmkmImage {
  id: string;
  publicId: string;
  url: string;
  urutan: number;
}

interface Umkm {
  id: string;
  namaUsaha: string;
  deskripsi: string;
  alamat: string;
  namaPemilik: string;
  whatsapp: string;
  tanggalMulai: Date;
  thumbnailIndex: number;
  showPhotoAlert: boolean;
  isActive?: boolean;
  images: UmkmImage[];
  socialLinks?: { id: string; platform: string; url: string }[];
}

interface UmkmPreviewSectionProps {
  umkmList: Umkm[];
}

export function UmkmPreviewSection({ umkmList }: UmkmPreviewSectionProps) {
  if (umkmList.length === 0) return null;

  return (
    <section id="umkm" className="py-28 md:py-36 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal y={25} className="mb-12 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-normal tracking-[-0.03em] text-foreground">
            UMKM Kelurahan Pedurungan Tengah
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {umkmList.slice(0, 8).map((umkm, index) => (
            <motion.div
              key={umkm.id}
              className="h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <UmkmCard umkm={umkm} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: umkmList.length * 0.06 + 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-center"
        >
          <Link
            href="/umkm"
            className="inline-block rounded-[12px] border border-border/50 bg-card px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-foreground transition-all duration-150 hover:bg-muted"
          >
            Lihat Selengkapnya
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
