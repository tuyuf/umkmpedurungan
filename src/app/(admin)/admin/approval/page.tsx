import Link from "next/link";
import Image from "next/image";
import { getAllUmkm } from "@/actions/umkm";
import { MinimalPagination } from "@/components/minimal-pagination";
import { UmkmStatusBadge } from "@/components/umkm-status-badge";
import { ApproveUmkmButton } from "@/components/approve-umkm-button";
import { RejectUmkmButton } from "@/components/reject-umkm-button";
import type { UmkmStatus } from "@/generated/prisma/client";
import { transformCloudinaryUrl } from "@/lib/cloudinary";

const statusTabs = [
  { label: "Pending", value: "PENDING" },
  { label: "Disetujui", value: "APPROVED" },
  { label: "Ditolak", value: "REJECTED" },
];

export default async function ApprovalPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const currentStatus = (params.status as UmkmStatus) || "PENDING";

  const { data: umkmList, totalPages } = await getAllUmkm(
    page,
    "",
    "",
    "newest",
    "",
    true,
    currentStatus
  );

  const pendingCount = currentStatus === "PENDING" ? umkmList.length : 0;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-normal tracking-tight text-foreground">
          Persetujuan UMKM
        </h1>
        {(currentStatus === "PENDING" || !currentStatus) && pendingCount > 0 && (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-[11px] font-medium text-yellow-800">
            {pendingCount} menunggu
          </span>
        )}
      </div>

      <div className="mb-4 flex gap-1">
        {statusTabs.map((tab) => {
          const isActive = currentStatus === tab.value;
          return (
            <Link
              key={tab.value}
              href={
                tab.value
                  ? `/admin/approval?status=${tab.value}`
                  : "/admin/approval"
              }
              className={`rounded px-3 py-1.5 text-xs transition-colors duration-150 ${
              isActive
                    ? "bg-white text-foreground border border-border"
                    : "text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="rounded-[12px] border border-border/50 bg-card p-6">
        {umkmList.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            {currentStatus === "PENDING"
              ? "Tidak ada UMKM yang menunggu persetujuan"
              : currentStatus === "APPROVED"
                ? "Belum ada UMKM yang disetujui"
                : currentStatus === "REJECTED"
                  ? "Belum ada UMKM yang ditolak"
                  : "Tidak ada data UMKM"}
          </p>
        ) : (
          <div className="space-y-3">
            {umkmList.map((umkm) => (
              <div
                key={umkm.id}
                className="flex items-start gap-4 rounded-[12px] border border-border/50 p-4"
              >
                <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded bg-muted">
                  {umkm.images?.[0]?.url ? (
                    <Image
                      src={transformCloudinaryUrl(umkm.images[0].url, "w_80,q_auto,f_auto")}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-muted-foreground">
                      No img
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-foreground">
                        {umkm.namaUsaha}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {umkm.namaPemilik}
                        {umkm.whatsapp ? ` · ${umkm.whatsapp}` : ""}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {umkm.alamat}
                      </p>
                      {umkm.category?.name && (
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {umkm.category.name}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <UmkmStatusBadge status={umkm.status} />
                    </div>
                  </div>
                  {umkm.status === "PENDING" && (
                    <div className="mt-3 flex items-center gap-2">
                      <ApproveUmkmButton id={umkm.id} />
                      <RejectUmkmButton id={umkm.id} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <MinimalPagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/admin/approval"
          />
        </div>
      )}
    </div>
  );
}
