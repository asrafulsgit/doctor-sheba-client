"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePrescription } from "@/lib/hooks/useprescription";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const medicationSchema = z.object({
  name: z.string().min(1, "Medication name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"),
  duration: z.string().min(1, "Duration is required"),
});

export const prescriptionFormSchema = z.object({
  diagnosis: z.string().min(1, "Diagnosis is required").max(500),
  medications: z
    .array(medicationSchema)
    .min(1, "At least one medication is required"),
  instructions: z.string("Instructions is required").max(500).or(z.literal("")),
  followUp: z
    .string()
    .optional()
    .refine(
      (val) => !val || !Number.isNaN(Date.parse(val)),
      "Invalid follow-up date",
    ),
});

export type PrescriptionFormValues = z.infer<typeof prescriptionFormSchema>;

export const blankMed = (): z.infer<typeof medicationSchema> => ({
  name: "",
  dosage: "",
  frequency: "",
  duration: "",
});

const CreatePrescriptionForm = () => {
  const appointmentId = useParams().appointmentId as string;
  const router = useRouter();
  const form = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionFormSchema),
    defaultValues: {
      diagnosis: "",
      medications: [blankMed()],
      instructions: "",
      followUp: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "medications",
  });

  const { mutate: createPrescription, isPending } = useCreatePrescription();

  const onSubmit = (data: PrescriptionFormValues) => {
    if (!appointmentId)
      return toast.error(
        "Appointment not found, Please pick an appointment and try again",
      );
    createPrescription(
      {
        ...data,
        appointmentId,
      },
      {
        onSuccess: () => {
          toast.success("Prescription created");
          router.push("/doctor/prescriptions");
        },
        onError: (err: any) => {
          toast.error(err?.message || "Error while creating prescription!");
        },
      },
    );
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="mt-5">
        {/* ── Diagnosis ──────────────────────────────────────────── */}
        <Controller
          name="diagnosis"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="diagnosis">Diagnosis</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="diagnosis"
                placeholder="e.g. Acute upper respiratory infection"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* ── Medications (dynamic) ──────────────────────────────── */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label>Medications</Label>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => append(blankMed())}
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>

          <div className="space-y-2">
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-2 rounded-md border border-border p-2"
              >
                {/* Name */}
                <Controller
                  name={`medications.${index}.name`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="col-span-4 space-y-0"
                    >
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        id={`med-name-${index}`}
                        placeholder="Name"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />

                {/* Dosage */}
                <Controller
                  name={`medications.${index}.dosage`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="col-span-2 space-y-0"
                    >
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        id={`med-dosage-${index}`}
                        placeholder="Dosage"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />

                {/* Frequency */}
                <Controller
                  name={`medications.${index}.frequency`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="col-span-3 space-y-0"
                    >
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        id={`med-frequency-${index}`}
                        placeholder="Frequency"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />

                {/* Duration */}
                <Controller
                  name={`medications.${index}.duration`}
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="col-span-2 space-y-0"
                    >
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        id={`med-duration-${index}`}
                        placeholder="Duration"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-[10px]"
                        />
                      )}
                    </Field>
                  )}
                />

                {/* Remove */}
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="col-span-1"
                  disabled={fields.length === 1}
                  onClick={() => remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Array-level error */}
          {(form.formState.errors.medications?.root ||
            typeof form.formState.errors.medications?.message === "string") && (
            <p className="text-sm font-medium text-destructive mt-1">
              {form.formState.errors.medications?.root?.message ||
                form.formState.errors.medications?.message}
            </p>
          )}
        </div>

        {/* ── Instructions ───────────────────────────────────────── */}
        <Controller
          name="instructions"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="instructions">Instructions</FieldLabel>
              <Textarea
                {...field}
                value={field.value ?? ""}
                id="instructions"
                rows={3}
                placeholder="Additional instructions for the patient…"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* ── Follow-up date ─────────────────────────────────────── */}
        <Controller
          name="followUp"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="max-w-62">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <FieldLabel htmlFor="followUp">Follow-up date</FieldLabel>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-62">
                  <Calendar
                    mode="single"
                    defaultMonth={
                      field.value ? new Date(field.value) : new Date()
                    }
                    selected={field.value ? new Date(field.value) : new Date()}
                    onSelect={(selectedDate) => {
                      field.onChange(selectedDate?.toISOString());
                    }}
                    disabled={{ before: new Date() }}
                    showWeekNumber
                  />
                </DropdownMenuContent>
              </DropdownMenu>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {/* ── Actions ────────────────────────────────────────────── */}
      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => form.reset()}
          disabled={form.formState.isSubmitting}
        >
          Reset
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {isPending ? "Saving…" : "Save Prescription"}
        </Button>
      </div>
    </form>
  );
};

export default CreatePrescriptionForm;
