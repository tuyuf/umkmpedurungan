"use server";

import { cache } from "react";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin, logAdminAction } from "@/lib/admin-auth";

export const getAllCategories = cache(async () => {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { umkms: true } } },
  });
});

export async function getCategoryById(id: string) {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw new Error("Kategori tidak ditemukan");
  return category;
}

export async function createCategory(data: { name: string; slug: string }) {
  await requireAdmin();
  const maxOrder = await prisma.category.aggregate({ _max: { order: true } });
  const category = await prisma.category.create({
    data: {
      name: data.name,
      slug: data.slug,
      order: (maxOrder._max.order ?? 0) + 1,
    },
  });
  revalidatePath("/");
  revalidatePath("/umkm");

  await logAdminAction({
    action: "CREATE",
    entityType: "CATEGORY",
    entityId: category.id,
    detail: { name: category.name, slug: category.slug },
  });

  return category;
}

export async function updateCategory(
  id: string,
  data: { name: string; slug: string }
) {
  await requireAdmin();
  const category = await prisma.category.update({
    where: { id },
    data: { name: data.name, slug: data.slug },
  });
  revalidatePath("/");
  revalidatePath("/umkm");

  await logAdminAction({
    action: "UPDATE",
    entityType: "CATEGORY",
    entityId: id,
    detail: { name: category.name, slug: category.slug },
  });

  return category;
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  const existing = await prisma.category.findUnique({
    where: { id },
    select: { id: true, name: true, slug: true },
  });
  const umkmsCount = await prisma.umkm.count({
    where: { categoryId: id },
  });
  if (umkmsCount > 0) {
    throw new Error(
      `Tidak bisa menghapus kategori yang masih memiliki ${umkmsCount} UMKM`
    );
  }
  await prisma.category.delete({ where: { id } });

  await logAdminAction({
    action: "DELETE",
    entityType: "CATEGORY",
    entityId: id,
    detail: existing ? { name: existing.name, slug: existing.slug } : undefined,
  });

  revalidatePath("/");
  revalidatePath("/umkm");
}
