"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { transformCloudinaryUrl } from "@/lib/cloudinary";

interface UmkmImage {
  id: string;
  publicId: string;
  url: string;
  urutan: number;
}

interface UmkmDetailClientProps {
  images: UmkmImage[];
  thumbnailIndex: number;
  namaUsaha: string;
}

export function UmkmDetailClient({
  images,
  thumbnailIndex,
  namaUsaha,
}: UmkmDetailClientProps) {
  const [selectedIndex, setSelectedIndex] = useState(thumbnailIndex);
  const selectedImage = images[selectedIndex] || images[0];

  if (!selectedImage) {
    return (
      <div className="space-y-4">
        <div className="aspect-[4/5] w-full overflow-hidden bg-surface-container-low flex items-center justify-center text-muted-foreground">
          Tidak ada gambar
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-[4/5] w-full overflow-hidden bg-surface-container-low">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
              <Image
                src={transformCloudinaryUrl(selectedImage.url, "w_800,q_auto,f_auto")}
                alt={namaUsaha}
                width={800}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
                priority
              />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto hide-scrollbar">
          {images.map((img, index) => (
            <button
              key={img.id}
              onClick={() => setSelectedIndex(index)}
              className={`w-20 h-20 shrink-0 overflow-hidden transition-all duration-200 ${
                selectedIndex === index
                  ? "ring-2 ring-foreground ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={transformCloudinaryUrl(img.url, "w_80,q_auto,f_auto")}
                alt={`${namaUsaha} ${img.urutan}`}
                width={80}
                height={80}
                sizes="80px"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
