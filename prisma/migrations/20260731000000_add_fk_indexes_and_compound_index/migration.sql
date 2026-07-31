-- DropIndexes
-- Remove duplicate single-column indexes (covered by schema @@index and new compound index)
DROP INDEX "umkm_status_idx";
DROP INDEX "umkm_is_active_idx";

-- CreateIndex
-- Add FK indexes for cascading deletes in updateUmkm transactions
CREATE INDEX "social_links_umkm_id_idx" ON "social_links"("umkm_id");
CREATE INDEX "umkm_images_umkm_id_idx" ON "umkm_images"("umkm_id");

-- CreateIndex
-- Compound index for most common query: isActive + status filter
CREATE INDEX "umkm_is_active_status_idx" ON "umkm"("is_active", "status");
