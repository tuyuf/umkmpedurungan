import { auth } from "./auth";
import { prisma } from "./db";
import { Prisma } from "@/generated/prisma/client";
import { headers } from "next/headers";

export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Sesi tidak valid. Silakan login kembali.");
  }

  if (session.user.role !== "ADMIN") {
    throw new Error("Akses ditolak. Hanya admin yang dapat melakukan operasi ini.");
  }

  return session;
}

export async function logAdminAction(input: {
  action: string;
  entityType?: string;
  entityId?: string;
  detail?: Prisma.InputJsonValue;
}) {
  try {
    const h = await headers();
    const session = await auth.api.getSession({ headers: h });

    if (!session?.user) return;

    await prisma.adminLog.create({
      data: {
        adminId: session.user.id,
        adminEmail: session.user.email ?? "",
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId,
        detail: input.detail ?? undefined,
        ipAddress: h.get("x-forwarded-for") || h.get("x-real-ip") || null,
        userAgent: h.get("user-agent") || null,
      },
    });
  } catch {
    // Audit logging must never break the admin operation itself.
  }
}
