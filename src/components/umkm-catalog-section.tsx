"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageContainer } from "./page-container";
import { SearchInput } from "./search-input";
import { SortDropdown, type SortOption } from "./sort-dropdown";
import { FilterChips, type FilterChip } from "./filter-chips";
import { UmkmCard } from "./umkm-card";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

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
  categoryId: string | null;
  socialLinks: { id: string; platform: string; url: string }[];
}

const SORT_OPTIONS: SortOption[] = [
  { value: "newest", label: "Terbaru" },
  { value: "oldest", label: "Terlama" },
  { value: "name_asc", label: "Nama A-Z" },
  { value: "name_desc", label: "Nama Z-A" },
];

interface UmkmCatalogSectionProps {
  categories: Category[];
  umkmList: Umkm[];
  totalPages: number;
  currentPage: number;
  currentCategory: string;
  currentSearch: string;
  currentSort?: string;
}

function buildPageUrl(search: string, category: string, sort: string, page: number) {
  const params = new URLSearchParams();
  if (search) params.set("q", search);
  if (category) params.set("category", category);
  if (sort && sort !== "newest") params.set("sort", sort);
  params.set("page", String(page));
  return `/umkm?${params.toString()}`;
}

export function UmkmCatalogSection({
  categories,
  umkmList,
  totalPages,
  currentPage,
  currentCategory,
  currentSearch,
  currentSort = "newest",
}: UmkmCatalogSectionProps) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch);
  const [sort, setSort] = useState(currentSort);
  const [category, setCategory] = useState(currentCategory);

  const categoryOptions = [
    { value: "", label: "Semua" },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];

  const activeChips: FilterChip[] = [];
  if (search) {
    activeChips.push({ id: "search", label: `"${search}"`, value: search });
  }
  if (category) {
    const cat = categories.find((c) => c.id === category);
    if (cat) {
      activeChips.push({ id: "category", label: cat.name, value: category });
    }
  }
  if (sort !== "newest") {
    const opt = SORT_OPTIONS.find((o) => o.value === sort);
    if (opt) {
      activeChips.push({ id: "sort", label: opt.label, value: sort });
    }
  }

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      const params = new URLSearchParams();
      if (value) params.set("q", value);
      if (currentCategory) params.set("category", currentCategory);
      if (sort) params.set("sort", sort);
      router.push(`/umkm?${params.toString()}`);
    },
    [currentCategory, sort, router]
  );

  const handleSort = useCallback(
    (value: string) => {
      setSort(value);
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (currentCategory) params.set("category", currentCategory);
      params.set("sort", value);
      router.push(`/umkm?${params.toString()}`);
    },
    [search, currentCategory, router]
  );

  const handleCategoryChange = useCallback(
    (value: string) => {
      setCategory(value);
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (value) params.set("category", value);
      if (sort) params.set("sort", sort);
      router.push(`/umkm?${params.toString()}`);
    },
    [search, sort, router]
  );

  const handleRemoveChip = useCallback(
    (id: string) => {
      const params = new URLSearchParams();
      if (id === "search") {
        setSearch("");
        if (category) params.set("category", category);
        if (sort !== "newest") params.set("sort", sort);
      } else if (id === "category") {
        setCategory("");
        if (search) params.set("q", search);
        if (sort !== "newest") params.set("sort", sort);
      } else if (id === "sort") {
        setSort("newest");
        if (search) params.set("q", search);
        if (category) params.set("category", category);
      }
      router.push(`/umkm?${params.toString()}`);
    },
    [search, category, sort, router]
  );

  const handleClearAll = useCallback(() => {
    setSearch("");
    setCategory("");
    setSort("newest");
    router.push("/umkm");
  }, [router]);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section id="umkm" className="py-20 md:py-28 bg-background">
      <PageContainer>
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display text-3xl md:text-5xl font-normal tracking-[-0.03em] text-foreground">
              UMKM Pedurungan Tengah
            </h2>
            <div className="hidden md:flex items-center gap-3">
              <SearchInput
                value={search}
                onChange={handleSearch}
                placeholder="Cari UMKM..."
                className="w-full md:w-80"
              />
              {categories.length > 0 && (
                <SortDropdown
                  options={categoryOptions}
                  value={category}
                  onChange={handleCategoryChange}
                />
              )}
              <SortDropdown
                options={SORT_OPTIONS}
                value={sort}
                onChange={handleSort}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 md:hidden">
            <SearchInput
              value={search}
              onChange={handleSearch}
              placeholder="Cari UMKM..."
            />
            <div className="flex items-center gap-3">
              {categories.length > 0 && (
                <SortDropdown
                  options={categoryOptions}
                  value={category}
                  onChange={handleCategoryChange}
                  align="left"
                />
              )}
              <SortDropdown
                options={SORT_OPTIONS}
                value={sort}
                onChange={handleSort}
              />
            </div>
          </div>

          {activeChips.length > 0 && (
            <FilterChips
              chips={activeChips}
              onRemove={handleRemoveChip}
              onClearAll={handleClearAll}
            />
          )}
        </div>

        {umkmList.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">
              {currentSearch
                ? `Tidak ada UMKM yang ditemukan untuk "${currentSearch}"`
                : currentCategory
                  ? "Tidak ada UMKM dalam kategori ini"
                  : "Belum ada UMKM yang terdaftar"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {umkmList.map((umkm, index) => (
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
        )}

        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-1" aria-label="Pagination">
            {currentPage > 1 && (
              <Link
                href={buildPageUrl(currentSearch, currentCategory, currentSort, currentPage - 1)}
                className="px-3 py-1.5 rounded-[12px] border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
              >
                &larr;
              </Link>
            )}

            {pages.map((page) => (
              <Link
                key={page}
                href={buildPageUrl(currentSearch, currentCategory, currentSort, page)}
                className={cn(
                  "px-3 py-1.5 rounded-[12px] text-sm transition-colors duration-150",
                  page === currentPage
                    ? "border border-foreground text-foreground font-semibold"
                    : "border border-border/50 text-muted-foreground/50 hover:text-foreground hover:bg-muted"
                )}
              >
                {page}
              </Link>
            ))}

            {currentPage < totalPages && (
              <Link
                href={buildPageUrl(currentSearch, currentCategory, currentSort, currentPage + 1)}
                className="px-3 py-1.5 rounded-[12px] border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
              >
                &rarr;
              </Link>
            )}
          </nav>
        )}
      </PageContainer>
    </section>
  );
}
