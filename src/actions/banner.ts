"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin, logAdminAction } from "@/lib/admin-auth";

export async function getAllBanners() {
  await requireAdmin();
  return prisma.heroBanner.findMany({
    orderBy: { order: "asc" },
  });
}

export async function getActiveBanners() {
  return prisma.heroBanner.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });
}

export async function getBannerById(id: string) {
  await requireAdmin();
  const banner = await prisma.heroBanner.findUnique({
    where: { id },
  });
  if (!banner) throw new Error("Banner tidak ditemukan");
  return banner;
}

export async function createBanner(data: {
  image: string;
  mobileImage?: string;
  title?: string;
  subtitle?: string;
  link?: string;
  active?: boolean;
  order?: number;
}) {
  await requireAdmin();
  const banner = await prisma.heroBanner.create({
    data,
  });
  revalidatePath("/");
  revalidatePath("/banners");

  await logAdminAction({
    action: "CREATE",
    entityType: "BANNER",
    entityId: banner.id,
    detail: { title: banner.title ?? null },
  });

  return banner;
}

export async function updateBanner(
  id: string,
  data: {
    image: string;
    mobileImage?: string;
    title?: string;
    subtitle?: string;
    link?: string;
    active?: boolean;
    order?: number;
  }
) {
  await requireAdmin();
  const banner = await prisma.heroBanner.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  revalidatePath("/banners");

  await logAdminAction({
    action: "UPDATE",
    entityType: "BANNER",
    entityId: id,
    detail: { title: banner.title ?? null, active: banner.active },
  });

  return banner;
}

export async function deleteBanner(id: string) {
  await requireAdmin();
  const existing = await prisma.heroBanner.findUnique({
    where: { id },
    select: { id: true, title: true },
  });
  await prisma.heroBanner.delete({ where: { id } });

  await logAdminAction({
    action: "DELETE",
    entityType: "BANNER",
    entityId: id,
    detail: existing ? { title: existing.title ?? null } : undefined,
  });

  revalidatePath("/");
  revalidatePath("/banners");
}
