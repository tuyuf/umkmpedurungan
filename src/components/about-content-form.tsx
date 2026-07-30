"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@/lib/zod-resolver";
import { aboutContentSchema, type AboutContentFormValues } from "@/lib/schemas-new";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";

interface AboutContentFormProps {
  defaultValues?: Partial<AboutContentFormValues>;
  onSubmit: (data: AboutContentFormValues) => Promise<void>;
  submitLabel?: string;
}

export function AboutContentForm({
  defaultValues,
  onSubmit,
  submitLabel = "Simpan",
}: AboutContentFormProps) {
  const router = useRouter();
  const form = useForm<AboutContentFormValues>({
    resolver: zodResolver(aboutContentSchema),
    defaultValues: {
      title: "",
      paragraph1: "",
      paragraph2: "",
      ctaText: "",
      ctaLink: "",
      ...defaultValues,
    },
  });

  const { formState: { isSubmitting } } = form;

  async function handleSubmit(data: AboutContentFormValues) {
    try {
      await onSubmit(data);
      toast.success("Konten About berhasil disimpan");
      router.refresh();
    } catch (error) {
      toast.error("Gagal menyimpan konten About");
      console.error(error);
    }
  }

  const inputClass = "h-10 border-0 border-b border-border bg-transparent px-0 text-sm text-foreground focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground";
  const labelClass = "text-[11px] font-normal tracking-[0.15em] text-muted-foreground";

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
      <Controller
        name="title"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className={labelClass}>
              Judul Section
            </FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Mendukung UMKM Pedurungan Tengah Indonesia"
              className={inputClass}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="paragraph1"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className={labelClass}>
              Paragraf 1
            </FieldLabel>
            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Paragraf pertama tentang platform..."
              className={`min-h-[80px] ${inputClass} resize-none`}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="paragraph2"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name} className={labelClass}>
              Paragraf 2
            </FieldLabel>
            <Textarea
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Paragraf kedua tentang platform..."
              className={`min-h-[80px] ${inputClass} resize-none`}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Controller
          name="ctaText"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Teks Tombol CTA
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Jelajahi UMKM"
                className={inputClass}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="ctaLink"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Link Tombol CTA
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="#umkm"
                className={inputClass}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>

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
