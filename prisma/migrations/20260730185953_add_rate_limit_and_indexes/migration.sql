-- Enable pg_trgm extension for fuzzy text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- CreateTable
CREATE TABLE "rate_limits" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rate_limits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "rate_limits_identifier_key" ON "rate_limits"("identifier");

-- CreateIndex
CREATE INDEX "umkm_status_idx" ON "umkm"("status");

-- CreateIndex
CREATE INDEX "umkm_is_active_idx" ON "umkm"("is_active");

-- Create GIN indexes for ILIKE search on nama_usaha, deskripsi, nama_pemilik
CREATE INDEX "umkm_nama_usaha_trgm_idx" ON "umkm" USING gin ("nama_usaha" gin_trgm_ops);
CREATE INDEX "umkm_deskripsi_trgm_idx" ON "umkm" USING gin ("deskripsi" gin_trgm_ops);
CREATE INDEX "umkm_nama_pemilik_trgm_idx" ON "umkm" USING gin ("nama_pemilik" gin_trgm_ops);
