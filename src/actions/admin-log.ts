"use server";

import { cache } from "react";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";

export const getAdminLogs = cache(async (page = 1, take = 50) => {
  await requireAdmin();

  const skip = (page - 1) * take;

  const [data, total] = await Promise.all([
    prisma.adminLog.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.adminLog.count(),
  ]);

  return {
    data,
    total,
    totalPages: Math.ceil(total / take),
    currentPage: page,
  };
});