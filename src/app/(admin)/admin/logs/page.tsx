import type { AdminLog } from "@/generated/prisma/client";
import { getAdminLogs } from "@/actions/admin-log";
import { MinimalPagination } from "@/components/minimal-pagination";

const actionLabels: Record<string, string> = {
  CREATE: "Membuat",
  UPDATE: "Mengubah",
  DELETE: "Menghapus",
  APPROVE: "Menyetujui",
  REJECT: "Menolak",
  TOGGLE_STATUS: "Ubah status",
  UPSERT: "Menyimpan konten",
};

const entityLabels: Record<string, string> = {
  UMKM: "UMKM",
  CATEGORY: "Kategori",
  TESTIMONIAL: "Testimoni",
  BANNER: "Banner",
  ABOUT_CONTENT: "Konten Tentang",
  METRICS_CONTENT: "Konten Statistik",
};

const actionColor: Record<string, string> = {
  CREATE: "bg-emerald-50 text-emerald-700",
  UPDATE: "bg-blue-50 text-blue-700",
  DELETE: "bg-red-50 text-red-700",
  APPROVE: "bg-emerald-50 text-emerald-700",
  REJECT: "bg-red-50 text-red-700",
  TOGGLE_STATUS: "bg-amber-50 text-amber-700",
  UPSERT: "bg-indigo-50 text-indigo-700",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(date);
}

function DetailCell({ detail }: { detail: AdminLog["detail"] }) {
  if (!detail) {
    return (
      <span className="text-muted-foreground">
        <em>—</em>
      </span>
    );
  }

  const text = JSON.stringify(detail, null, 2);
  const isLong = text.length > 200;

  return (
    <pre className="max-h-40 max-w-xs overflow-auto whitespace-pre-wrap break-all rounded bg-muted/50 p-2 text-[11px] leading-relaxed text-muted-foreground">
      {isLong ? `${text.slice(0, 200)}…` : text}
    </pre>
  );
}

export default async function AdminLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const { data: logs, totalPages, total } = await getAdminLogs(page);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-normal tracking-tight text-foreground">
          Log Aktivitas Admin
        </h1>
        <span className="inline-flex items-center rounded-full bg-surface-container-high px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
          {total} entri
        </span>
      </div>

      <div className="overflow-hidden rounded-[12px] border border-border/50 bg-card">
        {logs.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Belum ada aktivitas admin
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[11px] tracking-[0.15em] text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Waktu</th>
                  <th className="px-4 py-3 font-medium">Admin</th>
                  <th className="px-4 py-3 font-medium">Aksi</th>
                  <th className="px-4 py-3 font-medium">Entitas</th>
                  <th className="px-4 py-3 font-medium">Detail</th>
                  <th className="px-4 py-3 font-medium">IP</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-border/50 align-top last:border-0"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                      {formatDate(log.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-medium text-foreground">
                        {log.adminEmail}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                          actionColor[log.action] ?? "bg-muted text-muted-foreground"
                        }`}
                      >
                        {actionLabels[log.action] ?? log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {entityLabels[log.entityType ?? ""] ?? "—"}
                      {log.entityId && (
                        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                          {log.entityId.slice(0, 12)}…
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <DetailCell detail={log.detail} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] text-muted-foreground">
                      {log.ipAddress ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <MinimalPagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/admin/logs"
          />
        </div>
      )}
    </div>
  );
}