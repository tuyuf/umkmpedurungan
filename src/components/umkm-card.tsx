import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { transformCloudinaryUrl } from "@/lib/cloudinary";

interface UmkmCardProps {
  umkm: {
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
    socialLinks?: { id: string; platform: string; url: string }[];
    images: { id: string; publicId: string; url: string; urutan: number }[];
  };
}

export function UmkmCard({ umkm }: UmkmCardProps) {
  const mainImage =
    umkm.images[umkm.thumbnailIndex] || umkm.images[0];
  const [imageError, setImageError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const descRef = useRef<HTMLParagraphElement>(null);
  const isActive = umkm.isActive !== false;

  useEffect(() => {
    if (descRef.current) {
      setIsTruncated(descRef.current.scrollHeight > descRef.current.clientHeight);
    }
  }, []);

  return (
    <Link
      href={`/umkm/${umkm.id}`}
      className={cn(
        "group flex flex-col h-full overflow-hidden rounded-[12px] border bg-card transition-all duration-300",
        isActive
          ? "border-border hover:-translate-y-0.5"
          : "border-border/40 opacity-60 hover:no-underline"
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {mainImage && !imageError ? (
          <Image
            src={transformCloudinaryUrl(mainImage.url, "w_400,q_auto,f_auto")}
            alt={umkm.namaUsaha}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "object-cover transition-transform duration-700",
              isActive ? "group-hover:scale-105" : "grayscale"
            )}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span
              className={cn(
                "text-5xl font-light",
                isActive ? "text-muted-foreground" : "text-muted-foreground/50"
              )}
            >
              {umkm.namaUsaha.charAt(0)}
            </span>
          </div>
        )}
        {umkm.showPhotoAlert && (
          <span className="absolute top-3 left-3 rounded bg-black/60 px-2 py-1 text-[10px] font-medium text-white uppercase tracking-[0.1em]">
            *Gambar hanya ilustrasi
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        {!isActive && (
          <span className="mb-1.5 inline-block rounded bg-amber-600/90 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-[0.1em]">
            Sedang Libur
          </span>
        )}
        <h3
          className={cn(
            "text-sm font-medium line-clamp-1 tracking-[-0.01em]",
            isActive ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {umkm.namaUsaha}
        </h3>
        <div className="mt-1">
          <p
            ref={descRef}
            className={cn(
              "text-xs",
              !expanded && "line-clamp-2",
              isActive ? "text-muted-foreground" : "text-muted-foreground/50"
            )}
          >
            {umkm.deskripsi}
          </p>
          {isTruncated && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setExpanded((prev) => !prev);
              }}
              className="mt-1 text-xs font-medium text-foreground/50 hover:text-foreground transition-colors"
            >
              {expanded ? "Sembunyikan" : "Selengkapnya"}
            </button>
          )}
        </div>
        <div
          className={cn(
            "mt-auto pt-2 flex items-center gap-1 text-xs",
            isActive ? "text-muted-foreground" : "text-muted-foreground/50"
          )}
        >
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="line-clamp-1">{umkm.alamat}</span>
        </div>
      </div>
    </Link>
  );
}
