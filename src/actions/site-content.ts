"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

const ABOUT_FALLBACK = {
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
} as const;

export async function getAboutContent() {
  const content = await prisma.aboutContent.findFirst({
    where: { active: true },
  });
  return content ?? { ...ABOUT_FALLBACK };
}

export async function getAboutContentForAdmin() {
  await requireAdmin();
  const content = await prisma.aboutContent.findFirst();
  return content ?? { ...ABOUT_FALLBACK };
}

export async function upsertAboutContent(data: {
  title: string;
  paragraph1: string;
  paragraph2: string;
  ctaText: string;
  ctaLink: string;
}) {
  await requireAdmin();
  const updated = await prisma.aboutContent.updateMany({ data });
  if (updated.count === 0) {
    await prisma.aboutContent.create({
      data: { ...data, active: true },
    });
  }
  revalidatePath("/");
  revalidatePath("/about");
}

const METRICS_FALLBACK = {
  id: "",
  sectionTitle: "Komunitas yang Terus Bertumbuh",
  label1: "UMKM Terdaftar",
  label2: "UMKM Aktif",
  label3: "Kategori",
  label4: "Testimoni",
  active: true,
  updatedAt: new Date(),
} as const;

export async function getMetricsContent() {
  const content = await prisma.metricsContent.findFirst({
    where: { active: true },
  });
  return content ?? { ...METRICS_FALLBACK };
}

export async function getMetricsContentForAdmin() {
  await requireAdmin();
  const content = await prisma.metricsContent.findFirst();
  return content ?? { ...METRICS_FALLBACK };
}

export async function upsertMetricsContent(data: {
  sectionTitle: string;
  label1: string;
  label2: string;
  label3: string;
  label4: string;
}) {
  await requireAdmin();
  const updated = await prisma.metricsContent.updateMany({ data });
  if (updated.count === 0) {
    await prisma.metricsContent.create({
      data: { ...data, active: true },
    });
  }
  revalidatePath("/");
  revalidatePath("/metrics");
}
