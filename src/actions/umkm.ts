"use server";

import { cache } from "react";
import { prisma } from "@/lib/db";
import { umkmFormSchema, type UmkmFormValues } from "@/lib/schemas";
import { rateLimit, getSubmissionKey } from "@/lib/rate-limiter";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { Prisma, UmkmStatus } from "@/generated/prisma/client";
import { requireAdmin } from "@/lib/admin-auth";

const CUID_REGEX = /^c[^\s-]{8,}$/;

function isValidCuid(id: string): boolean {
  return CUID_REGEX.test(id) && id.length >= 8 && id.length <= 30;
}

export const getUmkmCards = cache(async (
  page = 1,
  search = "",
  categoryId = "",
  sortBy = "newest",
  location = "",
  take = 12,
) => {
  const skip = (page - 1) * take;

  const where: Prisma.UmkmWhereInput = {
    status: "APPROVED",
  };

  if (search) {
    where.OR = [
      { namaUsaha: { contains: search, mode: "insensitive" as const } },
      { deskripsi: { contains: search, mode: "insensitive" as const } },
      { namaPemilik: { contains: search, mode: "insensitive" as const } },
    ];
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (location) {
    where.alamat = { contains: location, mode: "insensitive" as const };
  }

  const orderBy: Prisma.UmkmOrderByWithRelationInput | Prisma.UmkmOrderByWithRelationInput[] = [{ isActive: "desc" as const }, getOrderBy(sortBy)];

  const [umkmList, total] = await Promise.all([
    prisma.umkm.findMany({
      where,
      include: {
        images: { orderBy: { urutan: "asc" } },
        category: true,
      },
      orderBy,
      skip,
      take,
    }),
    prisma.umkm.count({ where }),
  ]);

  return {
    data: umkmList,
    totalPages: Math.ceil(total / take),
    currentPage: page,
  };
});

export async function getAllUmkm(
  page = 1,
  search = "",
  categoryId = "",
  sortBy = "newest",
  location = "",
  includeInactive = true,
  status?: UmkmStatus
) {
  const take = 12;
  const skip = (page - 1) * take;

  const where: Prisma.UmkmWhereInput = {};

  if (!includeInactive) {
    where.isActive = true;
    where.status = "APPROVED";
  }

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { namaUsaha: { contains: search, mode: "insensitive" as const } },
      { deskripsi: { contains: search, mode: "insensitive" as const } },
      { namaPemilik: { contains: search, mode: "insensitive" as const } },
    ];
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (location) {
    where.alamat = { contains: location, mode: "insensitive" as const };
  }

  const orderBy: Prisma.UmkmOrderByWithRelationInput | Prisma.UmkmOrderByWithRelationInput[] = [{ isActive: "desc" as const }, getOrderBy(sortBy)];

  const [umkmList, total] = await Promise.all([
    prisma.umkm.findMany({
      where,
      include: {
        socialLinks: true,
        images: { orderBy: { urutan: "asc" } },
        category: true,
      },
      orderBy,
      skip,
      take,
    }),
    prisma.umkm.count({ where }),
  ]);

  return {
    data: umkmList,
    totalPages: Math.ceil(total / take),
    currentPage: page,
  };
}

function getOrderBy(sortBy: string) {
  switch (sortBy) {
    case "oldest":
      return { createdAt: "asc" as const };
    case "name_asc":
      return { namaUsaha: "asc" as const };
    case "name_desc":
      return { namaUsaha: "desc" as const };
    default:
      return { createdAt: "desc" as const };
  }
}

export async function getUmkmById(id: string) {
  if (!isValidCuid(id)) {
    throw new Error("ID tidak valid");
  }

  const umkm = await prisma.umkm.findUnique({
    where: { id },
    include: {
      socialLinks: true,
      images: { orderBy: { urutan: "asc" } },
      category: true,
    },
  });

  if (!umkm) {
    throw new Error("UMKM tidak ditemukan");
  }

  return umkm;
}

export async function createUmkm(data: UmkmFormValues) {
  await requireAdmin();
  const validated = umkmFormSchema.parse(data);

  const umkm = await prisma.umkm.create({
    data: {
      namaUsaha: validated.namaUsaha,
      deskripsi: validated.deskripsi,
      alamat: validated.alamat,
      alamatPribadi: validated.alamatPribadi,
      namaPemilik: validated.namaPemilik,
      whatsapp: validated.whatsapp,
      tanggalMulai: validated.tanggalMulai,
      thumbnailIndex: validated.thumbnailIndex,
      showPhotoAlert: validated.showPhotoAlert,
      categoryId: validated.categoryId || null,
      socialLinks: {
        create: validated.socialLinks.map((link) => ({
          platform: link.platform,
          url: link.url,
        })),
      },
      images: {
        create: validated.images.map((img, index) => ({
          publicId: img.publicId,
          url: img.url,
          urutan: index + 1,
        })),
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/umkm");
  revalidatePath("/admin/umkm");

  return umkm;
}

export async function submitUmkm(data: UmkmFormValues) {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "anonymous";
  const { allowed, remaining } = await rateLimit(getSubmissionKey(ip), 3, 60 * 60 * 1000);

  if (!allowed) {
    throw new Error(
      `Terlalu banyak permintaan. Coba lagi dalam 1 jam. Sisa percobaan: ${remaining}`
    );
  }

  const validated = umkmFormSchema.parse(data);

  const umkm = await prisma.umkm.create({
    data: {
      namaUsaha: validated.namaUsaha,
      deskripsi: validated.deskripsi,
      alamat: validated.alamat,
      alamatPribadi: validated.alamatPribadi,
      namaPemilik: validated.namaPemilik,
      whatsapp: validated.whatsapp,
      tanggalMulai: validated.tanggalMulai,
      thumbnailIndex: validated.thumbnailIndex,
      showPhotoAlert: false,
      isActive: false,
      status: "PENDING",
      categoryId: validated.categoryId || null,
      socialLinks: {
        create: validated.socialLinks.map((link) => ({
          platform: link.platform,
          url: link.url,
        })),
      },
      images: {
        create: validated.images.map((img, index) => ({
          publicId: img.publicId,
          url: img.url,
          urutan: index + 1,
        })),
      },
    },
  });

  revalidatePath("/admin/umkm");
  return umkm;
}

export async function updateUmkm(id: string, data: UmkmFormValues, updatedAt?: Date) {
  await requireAdmin();
  if (!isValidCuid(id)) {
    throw new Error("ID tidak valid");
  }

  if (updatedAt) {
    const existing = await prisma.umkm.findUnique({
      where: { id },
      select: { updatedAt: true },
    });
    if (!existing) throw new Error("UMKM tidak ditemukan");
    if (existing.updatedAt.getTime() !== updatedAt.getTime()) {
      throw new Error(
        "Data ini telah diubah oleh pengguna lain. Silakan muat ulang dan coba lagi."
      );
    }
  }

  const validated = umkmFormSchema.parse(data);

  await prisma.$transaction(async (tx) => {
    await tx.socialLink.deleteMany({ where: { umkmId: id } });
    await tx.umkmImage.deleteMany({ where: { umkmId: id } });

    await tx.umkm.update({
      where: { id },
      data: {
        namaUsaha: validated.namaUsaha,
        deskripsi: validated.deskripsi,
        alamat: validated.alamat,
        alamatPribadi: validated.alamatPribadi,
        namaPemilik: validated.namaPemilik,
        whatsapp: validated.whatsapp,
        tanggalMulai: validated.tanggalMulai,
        thumbnailIndex: validated.thumbnailIndex,
        showPhotoAlert: validated.showPhotoAlert,
        categoryId: validated.categoryId || null,
      },
    });

    if (validated.socialLinks.length > 0) {
      await tx.socialLink.createMany({
        data: validated.socialLinks.map((link) => ({
          umkmId: id,
          platform: link.platform,
          url: link.url,
        })),
      });
    }

    if (validated.images.length > 0) {
      await tx.umkmImage.createMany({
        data: validated.images.map((img, index) => ({
          umkmId: id,
          publicId: img.publicId,
          url: img.url,
          urutan: index + 1,
        })),
      });
    }
  });

  revalidatePath("/");
  revalidatePath(`/umkm/${id}`);
  revalidatePath("/dashboard");
  revalidatePath("/umkm");
  revalidatePath("/admin/umkm");
}

export async function approveUmkm(id: string) {
  await requireAdmin();
  if (!isValidCuid(id)) throw new Error("ID tidak valid");

  const umkm = await prisma.umkm.findUnique({ where: { id }, select: { id: true, status: true } });
  if (!umkm) throw new Error("UMKM tidak ditemukan");
  if (umkm.status !== "PENDING") throw new Error("UMKM sudah diproses");

  await prisma.umkm.update({
    where: { id },
    data: {
      status: "APPROVED",
      isActive: true,
      approvedAt: new Date(),
    },
  });

  revalidatePath("/");
  revalidatePath("/umkm");
  revalidatePath("/admin/umkm");
}

export async function rejectUmkm(id: string, reason?: string) {
  await requireAdmin();
  if (!isValidCuid(id)) throw new Error("ID tidak valid");

  const umkm = await prisma.umkm.findUnique({ where: { id }, select: { id: true, status: true } });
  if (!umkm) throw new Error("UMKM tidak ditemukan");
  if (umkm.status !== "PENDING") throw new Error("UMKM sudah diproses");

  await prisma.umkm.update({
    where: { id },
    data: {
      status: "REJECTED",
      isActive: false,
      rejectedAt: new Date(),
      rejectionReason: reason || null,
    },
  });

  revalidatePath("/admin/umkm");
}

export async function toggleUmkmStatus(id: string) {
  await requireAdmin();
  if (!isValidCuid(id)) throw new Error("ID tidak valid");

  const umkm = await prisma.umkm.findUnique({
    where: { id },
    select: { isActive: true, status: true },
  });
  if (!umkm) throw new Error("UMKM tidak ditemukan");

  await prisma.umkm.update({
    where: { id },
    data: { isActive: !umkm.isActive },
  });

  revalidatePath("/");
  revalidatePath("/umkm");
  revalidatePath("/admin/umkm");

  return { isActive: !umkm.isActive };
}

export async function getRandomUmkm(count = 4, excludeId?: string) {
  const ids: { id: string }[] = await prisma.$queryRaw`
    SELECT id FROM umkm
    WHERE status = 'APPROVED'
    ${excludeId ? Prisma.sql`AND id != ${excludeId}` : Prisma.empty}
    ORDER BY RANDOM()
    LIMIT ${count}
  `;

  if (ids.length === 0) return [];

  const umkms = await prisma.umkm.findMany({
    where: { id: { in: ids.map(i => i.id) } },
    include: {
      images: { orderBy: { urutan: "asc" }, take: 1 },
    },
  });

  return umkms;
}

export async function deleteUmkm(id: string) {
  await requireAdmin();
  if (!isValidCuid(id)) throw new Error("ID tidak valid");

  await prisma.umkm.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath("/umkm");
  revalidatePath("/admin/umkm");
}
