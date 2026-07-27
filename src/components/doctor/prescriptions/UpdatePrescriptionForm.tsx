"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  blankMed,
  prescriptionFormSchema,
  PrescriptionFormValues,
} from "./CreatePrescriptionForm";

import { toast } from "sonner";
import {
  usePrescription,
  useUpdatePrescription,
} from "@/lib/hooks/usePrescription";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { useEffect } from "react";
import { PrescriptionForm } from "./CreatePrescriptionFromSkeleton";
import { EmptyState } from "@/components/shared/PageState";

const UpdatePrescriptionForm = () => {
  const parmas = useParams();
  const appointmentId = parmas.appointmentId as string;
  const prescriptionId = parmas.prescriptionId as string;
  const router = useRouter();
  const form = useForm<PrescriptionFormValues>({
    resolver: zodResolver(prescriptionFormSchema),
    defaultValues: {
      diagnosis: "",
      medications: [blankMed()],
      instructions: "",
      followUpDate: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "medications",
  });
  const { data, isLoading, isError, error } = usePrescription(prescriptionId);
  const { mutate: updatePrescription, isPending } =
    useUpdatePrescription(prescriptionId);

  useEffect(() => {
    if (data?.data) {
      const prescription = data.data;
      form.reset({
        diagnosis: prescription.diagnosis ?? "",
        instructions: prescription.instructions ?? "",
        followUpDate: prescription.followUpDate ?? "",
        medications: prescription.medications ?? "",
      });
    }
  }, [data?.data]);

  const onSubmit = (data: PrescriptionFormValues) => {
    if (!appointmentId || !prescriptionId)
      return toast.error(
        "Appointment or prescription not found, Please pick an appointment and try again",
      );
    updatePrescription(
      {
        ...data,
      },
      {
        onSuccess: () => {
          toast.success("Prescription updated");
          router.push("/doctor/prescriptions");
        },
        onError: (err: any) => {
          toast.error(err?.message || "Error while updating prescription!");
        },
      },
    );
  };

  if (isLoading) {
    return <PrescriptionForm />;
  }
  if (!data?.data || isError) {
    <EmptyState
      title={isError ? error.message : "Prescription not found"}
      description={"Error while getting presction, Please try again!"}
    />;
  }

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
                className="grid  grid-cols-4 sm:grid-cols-12 gap-2 rounded-md border border-border p-2"
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
                      className="col-span-4 sm:col-span-2 space-y-0"
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
                      className="col-span-4 sm:col-span-3 space-y-0"
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
                      className="col-span-3 sm:col-span-2 space-y-0"
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
          name="followUpDate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="max-w-62">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <FieldLabel htmlFor="followUpDate">
                      Follow-up date
                    </FieldLabel>
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
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {isPending ? "Updating…" : "Update Prescription"}
        </Button>
      </div>
    </form>
  );
};

export default UpdatePrescriptionForm;
