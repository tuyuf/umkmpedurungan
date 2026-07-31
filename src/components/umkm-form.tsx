"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@/lib/zod-resolver";
import {
  umkmFormSchema,
  type UmkmFormValues,
  PLATFORM_LABELS,
  PLATFORM_PLACEHOLDERS,
} from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { ImageUploader } from "./image-uploader";
import { StepperForm } from "./stepper-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

interface UmkmFormProps {
  categories?: Category[];
  defaultValues?: Partial<UmkmFormValues>;
  onSubmit: (data: UmkmFormValues) => Promise<void>;
  submitLabel?: string;
  showPhotoAlert?: boolean;
  redirectTo?: string;
  hideAlamatPribadi?: boolean;
}

export function UmkmForm({
  categories = [],
  defaultValues,
  onSubmit,
  submitLabel = "Simpan",
  showPhotoAlert: showPhotoAlertProp = true,
  redirectTo = "/formulir/sukses",
  hideAlamatPribadi = false,
}: UmkmFormProps) {
  const router = useRouter();
  const form = useForm<UmkmFormValues>({
    resolver: zodResolver(umkmFormSchema),
    defaultValues: {
      namaUsaha: "",
      deskripsi: "",
      alamat: "",
      alamatPribadi: "",
      namaPemilik: "",
      whatsapp: "",
      categoryId: "",
      thumbnailIndex: 0,
      showPhotoAlert: false,
      socialLinks: [],
      images: [],
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  const {
    formState: { isSubmitting },
  } = form;

  async function handleSubmit() {
    const valid = await form.trigger();
    if (!valid) {
      toast.error("Mohon lengkapi semua field yang diperlukan");
      return;
    }

    const alamatPribadiValue = form.getValues("alamatPribadi");
    if (!hideAlamatPribadi && (!alamatPribadiValue || alamatPribadiValue.trim().length < 5)) {
      toast.error("Alamat pribadi pemilik minimal 5 karakter");
      return;
    }
    try {
      await onSubmit(form.getValues());
      toast.success("Data UMKM berhasil disimpan");
      if (form.getValues("showPhotoAlert")) {
        toast.info("Foto produk hanya contoh");
      }
      router.push(redirectTo);
    } catch (error) {
      toast.error("Gagal menyimpan data UMKM");
      console.error(error);
    }
  }

  const inputClass =
    "bg-background focus-visible:ring-0";
  const labelClass =
    "text-[11px] font-normal tracking-[0.1em] text-muted-foreground";
  const inputSelectClass =
    "!h-10 border border-border bg-background px-3 py-3 text-sm text-foreground focus:ring-0";

  const steps = [
    {
      title: "Informasi Dasar",
      description: "Masukkan data dasar usaha Anda",
      content: (
        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Controller
              name="namaUsaha"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Nama Usaha
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Contoh: Warung Mak Juhri"
                    className={inputClass}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="namaPemilik"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Nama Pemilik
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Contoh: Juhri"
                    className={inputClass}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name="deskripsi"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  Deskripsi Usaha
                </FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Ceritakan tentang usaha Anda..."
                  className={`min-h-[100px] ${inputClass} resize-none`}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="alamat"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className={labelClass}>
                  Alamat Usaha
                </FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Alamat lengkap usaha (Pedurungan Tengah)"
                  className={`min-h-[80px] ${inputClass} resize-none`}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {!hideAlamatPribadi && (
            <Controller
              name="alamatPribadi"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Alamat Pribadi Pemilik
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Alamat pribadi pemilik (untuk verifikasi)"
                    className={`min-h-[80px] ${inputClass} resize-none`}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <Controller
              name="whatsapp"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className={labelClass}>
                    Nomor WhatsApp
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="08xxxxxxxxxx"
                    className={inputClass}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="tanggalMulai"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="tanggalMulai" className={labelClass}>
                    Tanggal Mulai Usaha
                  </FieldLabel>
                  <Input
                    id="tanggalMulai"
                    type="date"
                    aria-invalid={fieldState.invalid}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                    className={inputClass}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            name="categoryId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className={labelClass}>
                  Kategori
                </FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    aria-invalid={fieldState.invalid}
                    className={inputSelectClass}
                  >
                    <span className="flex flex-1 text-left">
                      {field.value
                        ? categories.find((c) => c.id === field.value)?.name || "Pilih kategori"
                        : "Pilih kategori"}
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      ),
    },
    {
      title: "Platform Digital & Sosial Media",
      description: "Tambahkan tautan sosial media dan marketplace",
      content: (
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-start">
              <Controller
                name={`socialLinks.${index}.platform`}
                control={form.control}
                render={({ field: selectField, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="w-[160px] shrink-0"
                  >
                    <Select
                      value={selectField.value}
                      onValueChange={selectField.onChange}
                    >
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                      className={inputSelectClass}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(PLATFORM_LABELS).map(
                          ([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              <Controller
                name={`socialLinks.${index}.url`}
                control={form.control}
                render={({ field: inputField, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex-1">
                    <Input
                      {...inputField}
                      aria-invalid={fieldState.invalid}
                      placeholder={
                        PLATFORM_PLACEHOLDERS[
                          form.watch(`socialLinks.${index}.platform`) // eslint-disable-line react-hooks/incompatible-library
                        ] || "https://..."
                      }
                      className={inputClass}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {fields.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="h-10 w-10 shrink-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => append({ platform: "instagram", url: "" })}
            disabled={fields.length >= 10}
            className="gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            Tambah Link
          </Button>

          {form.formState.errors.socialLinks?.message && (
            <p className="text-sm text-red-500">
              {form.formState.errors.socialLinks.message}
            </p>
          )}
        </div>
      ),
    },
    {
      title: "Gambar Usaha",
      description: `Upload foto usaha Anda (maks. 5 gambar)`,
      content: (
        <div className="space-y-3">
          <Label className={labelClass}>Gambar Usaha (Maks. 5)</Label>
          <Controller
            name="images"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <ImageUploader
                  value={field.value}
                  onChange={field.onChange}
                  maxImages={5}
                  thumbnailIndex={form.watch("thumbnailIndex")}
                  onThumbnailChange={(index) => form.setValue("thumbnailIndex", index, { shouldValidate: true })}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {showPhotoAlertProp && (
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={form.watch("showPhotoAlert")}
                onChange={(e) => form.setValue("showPhotoAlert", e.target.checked)}
                className="h-4 w-4 rounded border-border accent-foreground"
              />
              Tampilkan peringatan: Foto produk hanya contoh
            </label>
          )}
        </div>
      ),
    },
  ];

  return (
    <StepperForm
      steps={steps}
      onSubmit={handleSubmit}
      submitLabel={submitLabel}
      isSubmitting={isSubmitting}
      onCancel={() => router.back()}
    />
  );
}
