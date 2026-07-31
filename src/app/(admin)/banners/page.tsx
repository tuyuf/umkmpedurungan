import { getAllBanners } from "@/actions/banner";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteBannerButton } from "./delete-banner-button";
import Image from "next/image";
import { transformCloudinaryUrl } from "@/lib/cloudinary";

export default async function BannersPage() {
  const banners = await getAllBanners();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-normal tracking-tight text-foreground">
          Hero Banners
        </h1>
        <Link href="/banners/new">
          <Button variant="default" className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah Banner
          </Button>
        </Link>
      </div>

      <div className="rounded-[12px] border border-border/50 bg-card p-6">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-[11px] tracking-[0.15em] text-muted-foreground">
                Gambar
              </TableHead>
              <TableHead className="text-[11px] tracking-[0.15em] text-muted-foreground">
                Judul
              </TableHead>
              <TableHead className="text-[11px] tracking-[0.15em] text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="text-[11px] tracking-[0.15em] text-muted-foreground">
                Urutan
              </TableHead>
              <TableHead className="text-[11px] tracking-[0.15em] text-muted-foreground text-right">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  Belum ada banner
                </TableCell>
              </TableRow>
            ) : (
              banners.map((b) => (
                <TableRow key={b.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="w-20 h-12 overflow-hidden rounded bg-muted">
                      {b.image ? (
                        <Image
                          src={transformCloudinaryUrl(b.image, "w_160,q_auto,f_auto")}
                          alt={b.title || "Banner"}
                          width={80}
                          height={48}
                          sizes="80px"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-foreground">
                    {b.title || "-"}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-medium tracking-wider rounded ${
                        b.active
                          ? "bg-green-100 text-green-700"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {b.active ? "Aktif" : "Nonaktif"}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {b.order}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/banners/${b.id}/edit`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <DeleteBannerButton id={b.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
