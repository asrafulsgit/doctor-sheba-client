import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUploadMedicalReport } from "@/lib/hooks/useMedicalReport";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const uploadReportSchema = z.object({
  reportName: z
    .string({ error: "Name is required" })
    .trim()
    .min(1, "Name is required"),
  reportFile: z
    .file({ error: "File is required" })
    .max(MAX_FILE_SIZE, { error: "File size must be less than 2 MB" })
    .mime(ACCEPTED_FILE_TYPES, {
      error: "Only PDF, JPG, PNG or WEBP files are allowed",
    }),
});
export type MedicalReportFormValues = z.infer<typeof uploadReportSchema>;

const UploadReportForm = ({ onClose }: { onClose: () => void }) => {
  const form = useForm<z.infer<typeof uploadReportSchema>>({
    resolver: zodResolver(uploadReportSchema),
    defaultValues: {
      reportName: "",
      reportFile: undefined,
    },
  });

  const { mutate: uploadReport, isPending } = useUploadMedicalReport();

  function onSubmit(data: MedicalReportFormValues) {
    uploadReport(data, {
      onSuccess: () => {
        toast.success("Medical report created");
        form.reset();
        onClose();
      },
      onError: (error: any) => {
        form.setError("root", {
          message: error?.message || "Error while uploading report!",
        });
      },
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FieldGroup>
        <Controller
          name="reportName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Name</FieldLabel>
              <Input
                {...field}
                type="text"
                placeholder="Blood test"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="reportFile"
          control={form.control}
          render={({ field: { value, onChange, ...field }, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="reportFile">Report file</FieldLabel>
              <Input
                {...field}
                id="reportFile"
                type="file"
                accept={ACCEPTED_FILE_TYPES.join(",")}
                aria-invalid={fieldState.invalid}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange(file);
                }}
              />
              {value instanceof File && (
                <p className="text-xs text-muted-foreground">
                  {value.name} ({(value.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {form.formState.errors.root && (
          <p className="text-sm text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}
        <Button
          type="submit"
          className={cn("", "w-full mt-2")}
          disabled={isPending}
        >
          {isPending ? "Uploading…" : "Upload Report"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default UploadReportForm;
