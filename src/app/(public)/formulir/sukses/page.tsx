import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function FormulirSuksesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="flex min-h-[60vh] items-center justify-center px-5 md:px-12">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-400">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="mb-3 text-2xl font-display font-normal tracking-tight text-foreground">
              Pendaftaran Berhasil
            </h1>
            <p className="mb-8 text-sm text-muted-foreground leading-relaxed">
              Data UMKM Anda telah kami terima. Tim admin akan melakukan
              verifikasi dan persetujuan dalam waktu 1x24 jam. Silakan cek
              secara berkala untuk melihat status pendaftaran Anda.
            </p>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md border border-foreground bg-white px-6 text-sm font-medium text-foreground transition-colors hover:bg-gray-50"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
