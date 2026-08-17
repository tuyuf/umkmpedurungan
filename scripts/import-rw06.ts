import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { rw06UmkmData, rw06ImageLinks } from "../prisma/rw06-data";

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const CATEGORY_SLUG = "makanan-minuman";

async function main() {
  console.log("Importing RW 06 UMKM data...\n");

  const category = await prisma.category.upsert({
    where: { slug: CATEGORY_SLUG },
    update: {},
    create: { name: "Makanan & Minuman", slug: CATEGORY_SLUG, order: 1 },
  });
  console.log(`Category "${category.name}" ready (id: ${category.id})`);

  let createdCount = 0;
  let skippedCount = 0;

  for (const data of rw06UmkmData) {
    const existing = await prisma.umkm.findFirst({ where: { namaUsaha: data.namaUsaha } });
    if (existing) {
      if (existing.showPhotoAlert !== data.showPhotoAlert) {
        await prisma.umkm.update({
          where: { id: existing.id },
          data: { showPhotoAlert: data.showPhotoAlert },
        });
        console.log(`  Updated showPhotoAlert for "${data.namaUsaha}"`);
      } else {
        console.log(`  Skipping "${data.namaUsaha}" (already exists)`);
      }
      skippedCount++;
      continue;
    }

    await prisma.umkm.create({
      data: {
        namaUsaha: data.namaUsaha,
        deskripsi: data.deskripsi,
        alamat: data.alamat,
        alamatPribadi: data.alamat,
        namaPemilik: data.namaPemilik,
        whatsapp: data.whatsapp,
        tanggalMulai: data.tanggalMulai,
        showPhotoAlert: data.showPhotoAlert,
        thumbnailIndex: 0,
        isActive: data.isActive ?? false,
        status: "APPROVED",
        categoryId: category.id,
      },
    });
    createdCount++;
    console.log(`  Created "${data.namaUsaha}"`);
  }

  console.log(`\nDone creating UMKM. Created: ${createdCount}, Skipped: ${skippedCount}`);

  let imageCount = 0;
  for (const entry of rw06ImageLinks) {
    const umkm = await prisma.umkm.findFirst({ where: { namaUsaha: entry.namaUsaha } });
    if (!umkm) {
      console.log(`  Skipping images for "${entry.namaUsaha}" (UMKM not found)`);
      continue;
    }
    for (const img of entry.images) {
      const existing = await prisma.umkmImage.findFirst({
        where: { umkmId: umkm.id, publicId: img.publicId },
      });
      if (existing) {
        console.log(`  Skipping image "${img.publicId}" (already exists)`);
        continue;
      }
      await prisma.umkmImage.create({
        data: {
          umkmId: umkm.id,
          publicId: img.publicId,
          url: img.url,
          urutan: img.urutan,
        },
      });
      imageCount++;
    }
    console.log(`  Processed ${entry.images.length} image(s) for "${entry.namaUsaha}"`);
  }
  console.log(`\nDone creating images. Created: ${imageCount}`);
}

main()
  .catch((e) => {
    console.error("Import failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
