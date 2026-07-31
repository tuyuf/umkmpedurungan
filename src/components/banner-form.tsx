"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@/lib/zod-resolver";
import { bannerSchema, type BannerFormValues } from "@/lib/schemas-new";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { Loader2, ArrowRight, Upload, X } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { transformCloudinaryUrl } from "@/lib/cloudinary";

interface BannerFormProps {
  defaultValues?: Partial<BannerFormValues>;
  onSubmit: (data: BannerFormValues) => Promise<void>;
  submitLabel?: string;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "default";

export function BannerForm({
  defaultValues,
  onSubmit,
  submitLabel = "Simpan",
}: BannerFormProps) {
  const router = useRouter();
  const [uploadingField, setUploadingField] = useState<"image" | "mobileImage" | null>(null);

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      image: "",
      mobileImage: "",
      title: "",
      subtitle: "",
      link: "",
      active: true,
      order: 0,
      ...defaultValues,
    },
  });

  const { formState: { isSubmitting } } = form;

  async function handleSubmit(data: BannerFormValues) {
    try {
      await onSubmit(data);
      toast.success("Banner berhasil disimpan");
      router.push("/banners");
      router.refresh();
    } catch (error) {
      toast.error("Gagal menyimpan banner");
      console.error(error);
    }
  }

  const inputClass = "h-10 border-0 border-b border-border bg-transparent px-0 text-sm text-foreground focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground";
  const labelClass = "text-[11px] font-normal tracking-[0.15em] text-muted-foreground";

  const image = form.watch("image"); // eslint-disable-line react-hooks/incompatible-library
  const mobileImage = form.watch("mobileImage");

  const uploadToCloudinary = useCallback(async (file: File, field: "image" | "mobileImage") => {
    setUploadingField(field);
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
      form.setValue(field, data.secure_url, { shouldValidate: true });
    } catch {
      toast.error(`Gagal mengupload gambar`);
    } finally {
      setUploadingField(null);
    }
  }, [form]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>, field: "image" | "mobileImage") => {
    const file = e.target.files?.[0];
    if (file) uploadToCloudinary(file, field);
    e.target.value = "";
  }, [uploadToCloudinary]);

  function ImageUploadField({
    field,
    label,
    value,
    required,
  }: {
    field: "image" | "mobileImage";
    label: string;
    value: string;
    required?: boolean;
  }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isUploading = uploadingField === field;

    return (
      <div className="space-y-3">
        <label className={labelClass}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="rounded border border-border bg-background p-4 space-y-3">
          {value ? (
            <div className="relative aspect-video overflow-hidden bg-surface-container-low border border-border">
              <Image
                src={transformCloudinaryUrl(value, "w_600,q_auto,f_auto")}
                alt={label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => form.setValue(field, "", { shouldValidate: true })}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) uploadToCloudinary(file, field);
              }}
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed flex flex-col items-center justify-center gap-3 py-8 cursor-pointer transition-colors duration-150 border-border hover:border-foreground text-muted-foreground hover:text-foreground"
            >
              {isUploading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <div className="flex items-center gap-2 border border-border bg-background px-4 py-2 text-sm font-normal text-foreground">
                    <Upload className="h-4 w-4" />
                    Upload
                  </div>
                  <span className="text-xs text-muted-foreground">
                    JPG, JPEG, PNG, WEBP. Max 20 MB.
                  </span>
                </>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => handleFileInput(e, field)}
            className="hidden"
          />
        </div>
        {form.formState.errors[field as keyof BannerFormValues] && (
          <p className="text-sm text-red-500">
            {form.formState.errors[field]?.message}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <ImageUploadField
        field="image"
        label="Gambar Desktop"
        value={image}
        required
      />

      <ImageUploadField
        field="mobileImage"
        label="Gambar Mobile (opsional)"
        value={mobileImage}
      />

      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className={labelClass}>
              Judul (opsional)
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Judul banner"
              className={inputClass}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="subtitle"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className={labelClass}>
              Subtitle (opsional)
            </FieldLabel>
            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Deskripsi singkat banner"
              className={`min-h-[60px] ${inputClass} resize-none`}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Controller
          name="link"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Link (opsional)
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="/umkm/xxx atau https://..."
                className={inputClass}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="order"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Urutan
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="number"
                aria-invalid={fieldState.invalid}
                placeholder="0"
                className={inputClass}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

      <Controller
        name="active"
        control={form.control}
        render={({ field }) => (
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={field.value}
              onChange={field.onChange}
              className="w-4 h-4 rounded border-border text-foreground focus:ring-foreground"
            />
            <span className="text-sm text-foreground">Banner aktif</span>
          </label>
        )}
      />

      <div className="flex gap-4 pt-4">
        <Button type="submit" variant="default" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {submitLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} className="text-muted-foreground hover:text-foreground">
          Batal
        </Button>
      </div>
    </form>
  );
}
