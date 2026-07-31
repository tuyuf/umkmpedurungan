import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { transformCloudinaryUrl } from "@/lib/cloudinary";

interface ProductCardProps {
  href: string;
  image?: string;
  title: string;
  location?: string;
  className?: string;
}

export function ProductCard({
  href,
  image,
  title,
  location,
  className,
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block overflow-hidden rounded-[12px] border border-border bg-card transition-all duration-300 hover:-translate-y-0.5",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {image ? (
          <Image
            src={transformCloudinaryUrl(image, "w_400,q_auto,f_auto")}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-5xl font-light text-muted-foreground">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 tracking-[-0.01em]">
          {title}
        </h3>
        {location && (
          <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{location}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
