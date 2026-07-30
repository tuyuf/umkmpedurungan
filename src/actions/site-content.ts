"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

export async function getAboutContent() {
  const content = await prisma.aboutContent.findFirst({
    where: { active: true },
  });
  return (
    content ?? {
      id: "",
      title: "Mendukung UMKM Pedurungan Tengah Indonesia",
      paragraph1:
        "Platform ini hadir untuk memudahkan masyarakat menemukan dan mendukung usaha kecil menengah di sekitar mereka. Kami percaya setiap UMKM layak mendapatkan ruang untuk tumbuh dan terhubung dengan pelanggan baru.",
      paragraph2:
        "Mulai dari kuliner lokal, kerajinan tangan, hingga jasa profesional. Semuanya tersedia di satu tempat.",
      ctaText: "Jelajahi UMKM",
      ctaLink: "#umkm",
      active: true,
      updatedAt: new Date(),
    }
  );
}

export async function getAboutContentForAdmin() {
  await requireAdmin();
  const content = await prisma.aboutContent.findFirst();
  return content ?? {
    id: "",
    title: "Mendukung UMKM Pedurungan Tengah Indonesia",
    paragraph1:
      "Platform ini hadir untuk memudahkan masyarakat menemukan dan mendukung usaha kecil menengah di sekitar mereka. Kami percaya setiap UMKM layak mendapatkan ruang untuk tumbuh dan terhubung dengan pelanggan baru.",
    paragraph2:
      "Mulai dari kuliner lokal, kerajinan tangan, hingga jasa profesional. Semuanya tersedia di satu tempat.",
    ctaText: "Jelajahi UMKM",
    ctaLink: "#umkm",
    active: true,
    updatedAt: new Date(),
  };
}

export async function upsertAboutContent(data: {
  title: string;
  paragraph1: string;
  paragraph2: string;
  ctaText: string;
  ctaLink: string;
}) {
  await requireAdmin();
  const existing = await prisma.aboutContent.findFirst();
  if (existing) {
    await prisma.aboutContent.update({
      where: { id: existing.id },
      data,
    });
  } else {
    await prisma.aboutContent.create({
      data: { ...data, active: true },
    });
  }
  revalidatePath("/");
  revalidatePath("/about");
}

export async function getMetricsContent() {
  const content = await prisma.metricsContent.findFirst({
    where: { active: true },
  });
  return (
    content ?? {
      id: "",
      sectionTitle: "Komunitas yang Terus Bertumbuh",
      label1: "UMKM Terdaftar",
      label2: "UMKM Aktif",
      label3: "Kategori",
      label4: "Testimoni",
      active: true,
      updatedAt: new Date(),
    }
  );
}

export async function getMetricsContentForAdmin() {
  await requireAdmin();
  const content = await prisma.metricsContent.findFirst();
  return content ?? {
    id: "",
    sectionTitle: "Komunitas yang Terus Bertumbuh",
    label1: "UMKM Terdaftar",
    label2: "UMKM Aktif",
    label3: "Kategori",
    label4: "Testimoni",
    active: true,
    updatedAt: new Date(),
  };
}

export async function upsertMetricsContent(data: {
  sectionTitle: string;
  label1: string;
  label2: string;
  label3: string;
  label4: string;
}) {
  await requireAdmin();
  const existing = await prisma.metricsContent.findFirst();
  if (existing) {
    await prisma.metricsContent.update({
      where: { id: existing.id },
      data,
    });
  } else {
    await prisma.metricsContent.create({
      data: { ...data, active: true },
    });
  }
  revalidatePath("/");
  revalidatePath("/metrics");
}
