import { z } from "zod";

function sanitizeString(val: string) {
  return val
    .replace(/[<>]/g, "")
    .replace(/['";\\]/g, "")
    .replace(/\b(DROP|DELETE|INSERT|UPDATE|ALTER|CREATE|TRUNCATE|EXEC|UNION|SELECT|OR\s+1=1)\b/gi, "")
    .trim();
}

function sanitizeName(val: string) {
  return val.replace(/[^a-zA-Z0-9\s&.,'-]/g, "").trim();
}

function sanitizeAlamat(val: string) {
  return val.replace(/[<>&]/g, "").trim();
}

function sanitizeWhatsapp(val: string) {
  return val.replace(/[^0-9+]/g, "");
}

export const socialLinkSchema = z.object({
  platform: z.enum([
    "instagram",
    "facebook",
    "tiktok",
    "whatsapp",
    "twitter",
    "youtube",
    "shopee",
    "tokopedia",
  ]),
  url: z
    .string()
    .url("URL tidak valid")
    .max(2048, "URL terlalu panjang")
    .transform((val) => sanitizeString(val)),
});

export const imageSchema = z.object({
  publicId: z.string().max(500),
  url: z.string().url().max(2048),
});

export const umkmFormSchema = z.object({
  namaUsaha: z
    .string()
    .min(2, "Nama usaha minimal 2 karakter")
    .max(200, "Nama usaha maksimal 200 karakter")
    .transform((val) => sanitizeName(val))
    .pipe(z.string().min(2, "Nama usaha minimal 2 karakter")),
  deskripsi: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter")
    .max(5000, "Deskripsi maksimal 5000 karakter")
    .transform((val) => sanitizeString(val))
    .pipe(z.string().min(10, "Deskripsi minimal 10 karakter")),
  alamat: z
    .string()
    .min(5, "Alamat minimal 5 karakter")
    .max(1000, "Alamat maksimal 1000 karakter")
    .transform((val) => sanitizeAlamat(val))
    .pipe(z.string().min(5, "Alamat minimal 5 karakter")),
  alamatPribadi: z
    .string()
    .max(1000, "Alamat pribadi maksimal 1000 karakter")
    .transform((val) => sanitizeAlamat(val))
    .optional()
    .default(""),
  namaPemilik: z
    .string()
    .min(2, "Nama pemilik minimal 2 karakter")
    .max(200, "Nama pemilik maksimal 200 karakter")
    .transform((val) => sanitizeName(val))
    .pipe(z.string().min(2, "Nama pemilik minimal 2 karakter")),
  whatsapp: z
    .string()
    .transform((val) => sanitizeWhatsapp(val))
    .pipe(
      z
        .string()
        .regex(
          /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
          "Nomor WhatsApp tidak valid"
        )
    ),
  tanggalMulai: z.coerce
    .date()
    .min(new Date("1900-01-01"), "Tanggal tidak valid")
    .max(new Date(), "Tanggal tidak boleh di masa depan"),
  categoryId: z.string().min(1, "Pilih kategori"),
  thumbnailIndex: z.coerce.number().int().min(0).default(0),
  showPhotoAlert: z.boolean().default(false),
  socialLinks: z
    .array(socialLinkSchema)
    .max(10, "Maksimal 10 tautan")
    .default([]),
  images: z.array(imageSchema).max(5, "Maksimal 5 gambar"),
});

export type UmkmFormValues = z.infer<typeof umkmFormSchema>;

export const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
  twitter: "Twitter/X",
  youtube: "YouTube",
  shopee: "Shopee",
  tokopedia: "Tokopedia",
};

export const PLATFORM_PLACEHOLDERS: Record<string, string> = {
  instagram: "https://instagram.com/username",
  facebook: "https://facebook.com/page",
  tiktok: "https://tiktok.com/@username",
  whatsapp: "https://wa.me/628xxxxxxxxxx",
  twitter: "https://twitter.com/username",
  youtube: "https://youtube.com/@channel",
  shopee: "https://shopee.co.id/shop",
  tokopedia: "https://tokopedia.com/shop",
};

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nama kategori minimal 2 karakter")
    .max(100)
    .transform((val) => sanitizeName(val))
    .pipe(z.string().min(2, "Nama kategori minimal 2 karakter")),
  slug: z
    .string()
    .min(2, "Slug minimal 2 karakter")
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan dash"),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
