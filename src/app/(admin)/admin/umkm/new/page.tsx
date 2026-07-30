import { createUmkm } from "@/actions/umkm";
import { getAllCategories } from "@/actions/category";
import { UmkmForm } from "@/components/umkm-form";
import type { UmkmFormValues } from "@/lib/schemas";

export default async function CreateUmkmPage() {
  const categories = await getAllCategories();

  async function handleSubmit(data: UmkmFormValues) {
    "use server";
    await createUmkm(data);
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-normal tracking-tight text-foreground">
        Tambah UMKM Baru
      </h1>
      <div className="max-w-3xl">
        <UmkmForm
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
          onSubmit={handleSubmit}
          submitLabel="Tambah UMKM"
          redirectTo="/admin/umkm"
          hideAlamatPribadi={true}
        />
      </div>
    </div>
  );
}
