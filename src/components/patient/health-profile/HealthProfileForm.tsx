"use client";
import { HeartPulse, NotebookText, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import {
  usePatientHealthProfile,
  useUpdatePatient,
} from "@/lib/hooks/usePatient";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BLOOD_GROUP_OPTIONS,
  bloodGroupLabels,
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
} from "@/constants/patient/data";
import HealthProfileSkeleton from "./HealthProfileSkeleton";
import { EmptyState } from "@/components/shared/PageState";
import { Combobox } from "@/components/ui/combobox";

const healthProfileSchema = z.object({
  gender: z.enum(GENDER_OPTIONS, { error: "Gender is required" }),
  dateOfBirth: z
    .string({ error: "Date of birth is required" })
    .min(1, "Date of birth is required"),
  bloodGroup: z.enum(BLOOD_GROUP_OPTIONS, { error: "Blood group is required" }),
  height: z
    .string({ error: "Height is required" })
    .min(1, "Height is required")
    .refine((v) => !Number.isNaN(Number(v)), "Height must be a number"),
  weight: z
    .string({ error: "Weight is required" })
    .min(1, "Weight is required")
    .refine((v) => !Number.isNaN(Number(v)), "Weight must be a number"),
  maritalStatus: z.enum(MARITAL_STATUS_OPTIONS, {
    error: "Marital status is required",
  }),

  hasAllergies: z.boolean(),
  hasDiabetes: z.boolean(),
  smokingStatus: z.boolean(),
  hasPastSurgeries: z.boolean(),
  pregnancyStatus: z.boolean(),
  recentAnxiety: z.boolean(),
  recentDepression: z.boolean(),

  dietaryPreferences: z.string().nullable().optional(),
  mentalHealthHistory: z.string().nullable().optional(),
  immunizationStatus: z.string().nullable().optional(),
});

export type HealthProfileFormValues = z.infer<typeof healthProfileSchema>;

const defaultValues: HealthProfileFormValues = {
  gender: "MALE",
  dateOfBirth: "",
  bloodGroup: "A_POSITIVE",
  height: "",
  weight: "",
  maritalStatus: "UNMARRIED",
  hasAllergies: false,
  hasDiabetes: false,
  smokingStatus: false,
  hasPastSurgeries: false,
  pregnancyStatus: false,
  recentAnxiety: false,
  recentDepression: false,
  dietaryPreferences: "",
  mentalHealthHistory: "",
  immunizationStatus: "",
};

const MEDICAL_TOGGLES: {
  name: keyof HealthProfileFormValues;
  label: string;
}[] = [
  { name: "hasAllergies", label: "Has allergies" },
  { name: "hasDiabetes", label: "Has diabetes" },
  { name: "smokingStatus", label: "Smokes regularly" },
  { name: "hasPastSurgeries", label: "Past surgeries" },
  { name: "pregnancyStatus", label: "Currently pregnant" },
  { name: "recentAnxiety", label: "Recent anxiety" },
  { name: "recentDepression", label: "Recent depression" },
];

const HealthProfileForm = () => {
  const { data, isLoading, isError, error } = usePatientHealthProfile();
  const { mutate: updatePatient, isPending } = useUpdatePatient();

  const form = useForm<HealthProfileFormValues>({
    resolver: zodResolver(healthProfileSchema),
    defaultValues,
  });

  useEffect(() => {
    if (data?.data) {
      const profile = data.data;
      form.reset({
        gender: profile.gender,
        dateOfBirth: profile.dateOfBirth?.slice(0, 10) ?? "",
        bloodGroup: profile.bloodGroup,
        height: profile.height ?? "",
        weight: profile.weight ?? "",
        maritalStatus: profile.maritalStatus,
        hasAllergies: !!profile.hasAllergies,
        hasDiabetes: !!profile.hasDiabetes,
        smokingStatus: !!profile.smokingStatus,
        hasPastSurgeries: !!profile.hasPastSurgeries,
        pregnancyStatus: !!profile.pregnancyStatus,
        recentAnxiety: !!profile.recentAnxiety,
        recentDepression: !!profile.recentDepression,
        dietaryPreferences: profile.dietaryPreferences ?? "",
        mentalHealthHistory: profile.mentalHealthHistory ?? "",
        immunizationStatus: profile.immunizationStatus ?? "",
      });
    }
  }, [data?.data]);

  function onSubmit(data: HealthProfileFormValues) {
    const payload = {
      patientHealthData: data,
    };

    updatePatient(payload, {
      onSuccess: () => {
        toast.success("Health profile updated");
      },
      onError: (error: any) => {
        toast.error(error?.message || "Error while saving health profile!");
      },
    });
  }

  if (isLoading) {
    return <HealthProfileSkeleton />;
  }
  if (isError) {
    return (
      <EmptyState
        title="Something went wrong"
        description={
          isError ? error.message : "Error while fetching health profile"
        }
        className="mt-2"
      />
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-6 lg:grid-cols-2"
    >
      {/* Personal health -------------------------------------------------- */}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
            <HeartPulse className="h-4 w-4" />
          </span>
          <h2 className="text-base font-semibold">Personal health</h2>
        </div>

        <FieldGroup className="mt-5 grid gap-4 sm:grid-cols-2">
          <Controller
            name="dateOfBirth"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="dob">Date of birth</FieldLabel>
                <Input
                  {...field}
                  id="dob"
                  type="date"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="gender"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="gender">Gender</FieldLabel>
                <Combobox
                  options={
                    GENDER_OPTIONS?.map((g) => ({
                      value: g,
                      label: g.charAt(0) + g.slice(1).toLowerCase(),
                    })) ?? []
                  }
                  value={field.value as string}
                  onChange={field.onChange}
                  placeholder="Select"
                  className="w-full"
                  isSearhable={false}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="bloodGroup"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="blood">Blood group</FieldLabel>
                <Combobox
                  options={
                    BLOOD_GROUP_OPTIONS?.map((bg) => ({
                      value: bg,
                      label: bloodGroupLabels[bg],
                    })) ?? []
                  }
                  value={field.value as string}
                  onChange={field.onChange}
                  placeholder="Select"
                  className="w-full"
                  isSearhable={false}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="maritalStatus"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="marital">Marital status</FieldLabel>
                <Combobox
                  options={
                    MARITAL_STATUS_OPTIONS?.map((m) => ({
                      value: m,
                      label: m.charAt(0) + m.slice(1).toLowerCase(),
                    })) ?? []
                  }
                  value={field.value as string}
                  onChange={field.onChange}
                  placeholder="Select"
                  className="w-full"
                  isSearhable={false}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="height"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="height">Height (m)</FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  id="height"
                  placeholder="e.g. 1.70"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="weight"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="weight">Weight (kg)</FieldLabel>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  id="weight"
                  placeholder="e.g. 68"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </section>

      {/* Medical history ---------------------------------------------------*/}
      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
            <Stethoscope className="h-4 w-4" />
          </span>
          <h2 className="text-base font-semibold">Medical history</h2>
        </div>

        <div className="mt-5 ">
          {MEDICAL_TOGGLES.map((f) => (
            <Controller
              key={f.name}
              name={f.name}
              control={form.control}
              render={({ field }) => (
                <div className="flex items-center justify-between rounded-lg bg-surface px-3 py-2.5">
                  <FieldLabel htmlFor={f.name} className="cursor-pointer">
                    {f.label}
                  </FieldLabel>
                  <Switch
                    id={f.name}
                    checked={!!field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              )}
            />
          ))}
        </div>
      </section>

      {/* Additional notes ---------------------------------------------------*/}
      <section className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
            <NotebookText className="h-4 w-4" />
          </span>
          <h2 className="text-base font-semibold">Additional notes</h2>
        </div>

        <FieldGroup className="mt-5 grid gap-4 sm:grid-cols-3">
          <Controller
            name="dietaryPreferences"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="diet">Dietary preferences</FieldLabel>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  id="diet"
                  placeholder="e.g. Vegetarian, low sodium"
                  className="min-h-20"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="mentalHealthHistory"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="mental">Mental health history</FieldLabel>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  id="mental"
                  placeholder="Optional"
                  className="min-h-20"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="immunizationStatus"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="immunization">
                  Immunization status
                </FieldLabel>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  id="immunization"
                  placeholder="Optional"
                  className="min-h-20"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </section>

      <div className="lg:col-span-2 flex justify-end">
        <Button
          type="submit"
          className={cn("", "min-w-32")}
          disabled={isPending}
        >
          {isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </form>
  );
};

export default HealthProfileForm;
