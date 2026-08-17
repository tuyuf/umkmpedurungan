-- DropIndex
DROP INDEX "umkm_deskripsi_trgm_idx";

-- DropIndex
DROP INDEX "umkm_nama_pemilik_trgm_idx";

-- DropIndex
DROP INDEX "umkm_nama_usaha_trgm_idx";

-- CreateTable
CREATE TABLE "admin_logs" (
    "id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "admin_email" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity_type" TEXT,
    "entity_id" TEXT,
    "detail" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "admin_logs_created_at_idx" ON "admin_logs"("created_at");

-- CreateIndex
CREATE INDEX "admin_logs_admin_id_idx" ON "admin_logs"("admin_id");

-- CreateIndex
CREATE INDEX "admin_logs_entity_type_entity_id_idx" ON "admin_logs"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "umkm_status_idx" ON "umkm"("status");

-- CreateIndex
CREATE INDEX "umkm_is_active_idx" ON "umkm"("is_active");
