"use client";

import Image from "next/image";
import { ImagePlus, X, Loader2, Check } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import { transformCloudinaryUrl } from "@/lib/cloudinary";

interface Image {
  publicId: string;
  url: string;
}

interface ImageUploaderProps {
  value: Image[];
  onChange: (images: Image[]) => void;
  maxImages?: number;
  thumbnailIndex?: number;
  onThumbnailChange?: (index: number) => void;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "default";

export function ImageUploader({
  value,
  onChange,
  maxImages = 5,
  thumbnailIndex = 0,
  onThumbnailChange,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const uploadToCloudinary = useCallback(async (file: File) => {
    const tempId = `temp-${Date.now()}-${file.name}`;
    setUploading((prev) => [...prev, tempId]);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error("Upload gagal");

      const data = await res.json();
      onChange([...value, { publicId: data.public_id, url: data.secure_url }]);
    } catch {
      toast.error(`Gagal mengupload ${file.name}`);
    } finally {
      setUploading((prev) => prev.filter((id) => id !== tempId));
    }
  }, [value, onChange]);

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const remaining = maxImages - value.length - uploading.length;
    const toUpload = Array.from(files).slice(0, remaining);

    const oversized = toUpload.filter((f) => f.size > MAX_FILE_SIZE);
    if (oversized.length > 0) {
      toast.error(
        `${oversized.map((f) => f.name).join(", ")} melebihi batas 5MB`
      );
      return;
    }

    if (toUpload.length === 0) {
      toast.error(`Maksimal ${maxImages} gambar`);
      return;
    }
    await Promise.all(toUpload.map(uploadToCloudinary));
    }, [value.length, uploading.length, maxImages, uploadToCloudinary, MAX_FILE_SIZE]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
    e.target.value = "";
  }, [handleFiles]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const removeImage = useCallback((index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    onChange(newImages);
    if (onThumbnailChange) {
      if (thumbnailIndex >= newImages.length) {
        onThumbnailChange(Math.max(0, newImages.length - 1));
      } else if (thumbnailIndex === index) {
        onThumbnailChange(0);
      } else if (thumbnailIndex > index) {
        onThumbnailChange(thumbnailIndex - 1);
      }
    }
  }, [value, onChange, thumbnailIndex, onThumbnailChange]);

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full border border-dashed flex flex-col items-center justify-center gap-4 py-10 cursor-pointer transition-colors duration-150 ${
          dragOver
            ? "border-foreground bg-surface-container-low"
            : "border-border hover:border-foreground text-muted-foreground hover:text-foreground"
        }`}
      >
        <div className="flex flex-col items-center gap-1.5">
          <ImagePlus className="h-6 w-6 text-muted-foreground" />
          <span className="text-sm text-foreground">Upload Gambar</span>
        </div>
        <span className="text-xs text-muted-foreground">
          JPG, PNG, WEBP. Max 5 MB.
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileInput}
        className="hidden"
      />

      {(value.length > 0 || uploading.length > 0) && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {value.map((image, index) => (
            <div
              key={image.publicId}
              className={`relative aspect-square overflow-hidden bg-surface-container-low group border cursor-pointer ${
                onThumbnailChange && thumbnailIndex === index
                  ? "border-2 border-foreground"
                  : "border border-border"
              }`}
              onClick={() => onThumbnailChange?.(index)}
            >
              <Image
                src={transformCloudinaryUrl(image.url, "w_150,q_auto,f_auto")}
                alt={`Gambar ${index + 1}`}
                fill
                sizes="150px"
                className="object-cover"
              />
              {onThumbnailChange && thumbnailIndex === index && (
                <div className="absolute bottom-1.5 left-1.5 bg-foreground text-background px-1.5 py-0.5 text-[10px] font-normal flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Thumbnail
                </div>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {uploading.map((tempId) => (
            <div
              key={tempId}
              className="relative aspect-square overflow-hidden bg-surface-container-low border border-border flex items-center justify-center"
            >
              <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
            </div>
          ))}
        </div>
      )}

      <p className="text-[11px] text-muted-foreground">
        {value.length}/{maxImages} gambar diupload
        {uploading.length > 0 && ` (${uploading.length} mengupload...)`}
      </p>
    </div>
  );
}
