import { getUmkmCards } from "@/actions/umkm";
import { getAllCategories } from "@/actions/category";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { UmkmCatalogSection } from "@/components/umkm-catalog-section";

export default async function UmkmPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string; page?: string }>;
}) {
  const params = await searchParams;
  const search = params.q || "";
  const categoryId = params.category || "";
  const sortBy = params.sort || "newest";
  const currentPage = Math.max(1, Number(params.page) || 1);

  const [{ data: umkmList, totalPages }, categories] = await Promise.all([
    getUmkmCards(currentPage, search, categoryId, sortBy, "", 12),
    getAllCategories(),
  ]);

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <UmkmCatalogSection
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
          umkmList={umkmList}
          totalPages={totalPages}
          currentPage={currentPage}
          currentCategory={categoryId}
          currentSearch={search}
          currentSort={sortBy}
        />
      </main>
      <Footer />
    </>
  );
}
