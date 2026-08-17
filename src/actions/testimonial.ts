"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireAdmin, logAdminAction } from "@/lib/admin-auth";

export async function getAllTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getTestimonialById(id: string) {
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) throw new Error("Testimonial tidak ditemukan");
  return testimonial;
}

export async function createTestimonial(data: {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
}) {
  await requireAdmin();
  const testimonial = await prisma.testimonial.create({ data });
  revalidatePath("/");
  revalidatePath("/testimonials");

  await logAdminAction({
    action: "CREATE",
    entityType: "TESTIMONIAL",
    entityId: testimonial.id,
    detail: { author: testimonial.author },
  });

  return testimonial;
}

export async function updateTestimonial(
  id: string,
  data: { quote: string; author: string; role?: string; avatar?: string }
) {
  await requireAdmin();
  const testimonial = await prisma.testimonial.update({
    where: { id },
    data,
  });
  revalidatePath("/");
  revalidatePath("/testimonials");

  await logAdminAction({
    action: "UPDATE",
    entityType: "TESTIMONIAL",
    entityId: id,
    detail: { author: testimonial.author },
  });

  return testimonial;
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  const existing = await prisma.testimonial.findUnique({
    where: { id },
    select: { id: true, author: true },
  });
  await prisma.testimonial.delete({ where: { id } });

  await logAdminAction({
    action: "DELETE",
    entityType: "TESTIMONIAL",
    entityId: id,
    detail: existing ? { author: existing.author } : undefined,
  });

  revalidatePath("/");
  revalidatePath("/testimonials");
}
