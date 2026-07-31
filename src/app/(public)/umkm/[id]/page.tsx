export const revalidate = 300;

import { getUmkmById, getRandomUmkm } from "@/actions/umkm";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import {
  MapPin,
  Phone,
  Calendar,
  User,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import { PLATFORM_LABELS } from "@/lib/schemas";
import { notFound } from "next/navigation";
import Link from "next/link";
import { UmkmDetailClient } from "./umkm-detail-client";

export default async function UmkmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let umkm;
  try {
    umkm = await getUmkmById(id);
  } catch {
    notFound();
  }

  if (umkm.status !== "APPROVED" || !umkm.isActive) {
    notFound();
  }

  const relatedUmkm = await getRandomUmkm(4, id);

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-28 md:pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali
          </Link>

          {!umkm.isActive && (
            <div className="mb-8 rounded-[12px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
              <span className="font-semibold">Toko Sedang Libur</span>
              <span className="ml-2 text-amber-600">
                &mdash; UMKM ini sedang tidak beroperasi untuk sementara waktu.
              </span>
            </div>
          )}

          {/* Bygone-style: large image left, info right */}
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] mb-20">
            {/* Left: Images */}
            <UmkmDetailClient
              images={umkm.images}
              thumbnailIndex={umkm.thumbnailIndex}
              namaUsaha={umkm.namaUsaha}
            />

            {/* Right: Info */}
            <div className="py-4 lg:py-8 space-y-8">
              <div>
                <h1
                  className="font-display font-normal tracking-tight text-foreground mb-2"
                  style={{ fontSize: "clamp(2rem, 1rem + 2.5vw, 3rem)" }}
                >
                  {umkm.namaUsaha}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {umkm.namaPemilik}
                </p>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <User className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {umkm.namaPemilik}
                    </p>
                    <p className="text-xs text-muted-foreground tracking-wider">Pemilik</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {umkm.alamat}
                    </p>
                    <p className="text-xs text-muted-foreground tracking-wider">Alamat</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {umkm.whatsapp}
                    </p>
                    <p className="text-xs text-muted-foreground tracking-wider">WhatsApp</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(umkm.tanggalMulai).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground tracking-wider">Tanggal Mulai</p>
                  </div>
                </div>
              </div>

              {umkm.socialLinks.length > 0 && (
                <>
              <div className="h-px bg-border" />
                  <div className="space-y-3">
                    <h3 className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground">
                      Platform Digital
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {umkm.socialLinks.map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-muted text-sm text-foreground hover:bg-muted/80 transition-colors"
                        >
                          {PLATFORM_LABELS[link.platform] || link.platform}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="h-px bg-border" />

              <div>
                <h2 className="mb-4 text-[11px] font-bold tracking-[0.2em] text-muted-foreground">
                  Tentang Usaha Ini
                </h2>
                <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground/80">
                  {umkm.deskripsi}
                </p>
              </div>

              {/* WhatsApp CTA */}
              {umkm.isActive ? (
                <a
                  href={`https://wa.me/${umkm.whatsapp.replace(/^0/, "62")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3.5 border border-border bg-white text-foreground text-sm font-bold tracking-widest rounded transition-colors hover:bg-muted"
                >
                  Hubungi via WhatsApp
                </a>
              ) : (
                <span className="inline-block px-8 py-3.5 bg-muted text-muted-foreground text-sm font-bold tracking-widest rounded cursor-not-allowed">
                  Toko Sedang Libur
                </span>
              )}
            </div>
          </div>

          {/* You might also like */}
          {relatedUmkm.length > 0 && (
            <section className="mb-20">
              <div className="mb-8">
                <span className="font-display text-[10px] font-bold tracking-[0.2em] text-muted-foreground block mb-3">
                  Lainnya
                </span>
                <h2
                  className="font-display font-normal tracking-tight text-foreground"
                  style={{ fontSize: "clamp(1.5rem, 0.8rem + 1.5vw, 2rem)" }}
                >
                  UMKM Lainnya
                </h2>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedUmkm.map((item) => (
                  <ProductCard
                    key={item.id}
                    href={`/umkm/${item.id}`}
                    image={item.images[item.thumbnailIndex]?.url || item.images[0]?.url}
                    title={item.namaUsaha}
                    location={item.alamat}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
