import { submitUmkm } from "@/actions/umkm";
import { getAllCategories } from "@/actions/category";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { UmkmForm } from "@/components/umkm-form";
import type { UmkmFormValues } from "@/lib/schemas";

export default async function FormulirUmkmPage() {
  const categories = await getAllCategories();

  async function handleSubmit(data: UmkmFormValues) {
    "use server";
    await submitUmkm(data);
  }

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <section className="relative pt-8 pb-4 md:pt-12 md:pb-6">
          <div className="mx-auto max-w-2xl px-5 md:px-12 text-center">
            <h1 className="text-3xl md:text-5xl font-display font-normal tracking-tight text-foreground mb-3">
              Formulir UMKM
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Isi data usaha Anda dengan lengkap. Setelah dikirim, tim admin akan
              melakukan verifikasi dan persetujuan.
            </p>
          </div>
        </section>

        <section className="pt-6 pb-36 md:pt-10 md:pb-48">
          <div className="mx-auto max-w-3xl px-5 md:px-12">
            <UmkmForm
              categories={categories.map((c) => ({ id: c.id, name: c.name }))}
              onSubmit={handleSubmit}
              submitLabel="Kirim Pendaftaran"
              showPhotoAlert={false}
            />
            <p className="mt-6 text-xs text-muted-foreground text-center">
              Data Anda akan diverifikasi oleh admin sebelum ditampilkan.
              Maksimal 1 pendaftaran per hari.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
