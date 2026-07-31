import { prisma } from "@/lib/db";

export async function rateLimit(
  key: string,
  maxAttempts: number = 3,
  windowMs: number = 60 * 60 * 1000
): Promise<{ allowed: boolean; remaining: number; resetIn: number }> {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + windowMs);

  const result = await prisma.rateLimit.upsert({
    where: { identifier: key },
    update: { count: { increment: 1 } },
    create: { identifier: key, count: 1, expiresAt },
  });

  if (now > result.expiresAt) {
    await prisma.rateLimit.update({
      where: { identifier: key },
      data: { count: 1, expiresAt },
    });
    return { allowed: true, remaining: maxAttempts - 1, resetIn: windowMs };
  }

  if (result.count > maxAttempts) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: result.expiresAt.getTime() - now.getTime(),
    };
  }

  return {
    allowed: true,
    remaining: maxAttempts - result.count,
    resetIn: result.expiresAt.getTime() - now.getTime(),
  };
}

export function getClientIp(): string {
  return "global";
}

export function getSubmissionKey(ip: string): string {
  return `submission:${ip}`;
}
