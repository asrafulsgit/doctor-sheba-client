import ProfileFormSkeleton from "@/components/patient/settings/ProfileFormSkeleton";
import { EmptyState } from "@/components/shared/PageState";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { GENDER_OPTIONS } from "@/constants/patient/data";
import { useDoctorProfile, useUpdateDoctor } from "@/lib/hooks/UseDoctor";
import { zodResolver } from "@hookform/resolvers/zod";
import * as LucideIcons from "lucide-react";
import { Camera } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const MAX_AVATAR_BYTES = 2 * 1024 * 1024; // 2MB
const ACCEPTED_AVATAR_TYPES = ["image/png", "image/jpeg", "image/webp"];

const profileSchema = z.object({
  name: z
    .string({ error: "Full name is required" })
    .min(1, "Full name is required")
    .max(100, "Full name must be at most 100 characters"),

  email: z.string().email("Invalid email address").optional(),

  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits")
    .max(20, "Contact number must be at most 20 characters")
    .regex(/^[+]?[\d\s\-()]+$/, "Invalid contact number format")
    .optional(),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(255, "Address must be at most 255 characters")
    .optional(),

  avatarFile: z
    .file({ error: "File is required" })
    .max(MAX_AVATAR_BYTES, { error: "File size must be less than 2 MB" })
    .mime(ACCEPTED_AVATAR_TYPES, {
      error: "Only JPG, PNG or WEBP files are allowed",
    })
    .nullable()
    .optional(),

  experience: z
    .number()
    .int("Experience must be a whole number")
    .min(0, "Experience cannot be negative")
    .max(60, "Experience cannot exceed 60 years")
    .optional(),

  gender: z
    .enum(["MALE", "FEMALE"], {
      error: "Gender is required",
    })
    .optional(),

  registrationNumber: z
    .string()
    .min(5, "Registration number must be at least 5 characters")
    .max(50, "Registration number must be at most 50 characters")
    .optional(),

  appointmentFee: z
    .number({ error: "Appointment fee is required" })
    .int("Appointment fee must be a whole number")
    .min(0, "Appointment fee cannot be negative")
    .max(100_000, "Appointment fee is unrealistically high")
    .optional(),

  currentWorkingPlace: z
    .string({ error: "Current working place is required" })
    .min(2, "Current working place must be at least 2 characters")
    .max(150, "Current working place must be at most 150 characters")
    .optional(),

  designation: z
    .string({ error: "Designation is required" })
    .min(2, "Designation must be at least 2 characters")
    .max(100, "Designation must be at most 100 characters")
    .optional(),

  qualification: z
    .string({ error: "Qualification is required" })
    .min(2, "Qualification must be at least 2 characters")
    .max(255, "Qualification must be at most 255 characters")
    .optional(),

  specialties: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        icon: z.string(),
      }),
      {
        error: "Specialties must be an array of specialty",
      },
    )
    .min(1, "At least one specialty is required")
    .max(10, "You can select a maximum of 10 specialties")
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

const profileDefaultValues: ProfileFormValues = {
  name: "",
  email: "",
  contactNumber: "",
  address: "",
  avatarFile: null,
  experience: 0,
  gender: "MALE",
  registrationNumber: "",
  appointmentFee: 0,
  currentWorkingPlace: "",
  designation: "",
  qualification: "",
  specialties: [],
};

const SettingsForm = () => {
  const { data, isLoading, isError, error } = useDoctorProfile();
  const { mutate: updateProfile, isPending } = useUpdateDoctor();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: profileDefaultValues,
  });

  const specialties = form.watch("specialties") ?? [];

  useEffect(() => {
    if (data?.data) {
      const profile = data.data;
      form.reset({
        name: profile.name ?? "",
        email: profile.email ?? "",
        contactNumber: profile.contactNumber ?? "",
        address: profile.address ?? "",
        avatarFile: null,
        experience: profile.experience ?? 0,
        gender: profile.gender ?? "MALE",
        registrationNumber: profile.registrationNumber ?? "",
        appointmentFee: profile.appointmentFee ?? 0,
        currentWorkingPlace: profile.currentWorkingPlace ?? "",
        designation: profile.designation ?? "",
        qualification: profile.qualification ?? "",
        specialties:
          profile.doctorSpecialities?.map((spec) => ({
            id: spec.specialities.id,
            title: spec.specialities.title,
            icon: spec.specialities.icon,
          })) ?? [],
      });
    }
  }, [data?.data, form]);

  const currentAvatarUrl = data?.data?.profilePhoto;

  function pick() {
    fileInputRef.current?.click();
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      form.setValue("avatarFile", file, { shouldValidate: true });
      const url = URL.createObjectURL(file);
      setAvatarPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    }
  }

  function onSubmit(values: ProfileFormValues) {
    const payload = new FormData();

    if (values.avatarFile) {
      payload.append("avatar", values.avatarFile);
    }

    if (values.name) payload.append("name", values.name);
    if (values.contactNumber)
      payload.append("contactNumber", values.contactNumber);
    if (values.address) payload.append("address", values.address);
    if (values.experience != null)
      payload.append("experience", String(values.experience));
    if (values.gender) payload.append("gender", values.gender);
    if (values.registrationNumber)
      payload.append("registrationNumber", values.registrationNumber);
    if (values.currentWorkingPlace)
      payload.append("currentWorkingPlace", values.currentWorkingPlace);
    if (values.designation) payload.append("designation", values.designation);
    if (values.qualification)
      payload.append("qualification", values.qualification);

    updateProfile(payload, {
      onSuccess: () => {
        toast.success("Profile updated");
        form.resetField("avatarFile");
      },
      onError: (err: unknown) => {
        const message =
          err instanceof Error ? err.message : "Error while saving profile!";
        toast.error(message);
      },
    });
  }

  if (isLoading) {
    return <ProfileFormSkeleton />;
  }

  if (isError) {
    return (
      <EmptyState
        title="Something went wrong"
        description={error?.message || "Error while fetching profile"}
        className="mt-2"
      />
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-card p-6 shadow-soft"
    >
      <h2 className="text-base font-semibold">Profile</h2>

      {/* ── Avatar ─────────────────────────────────────────────── */}
      <Controller
        name="avatarFile"
        control={form.control}
        render={({ fieldState }) => (
          <div className="mt-5 mb-2 rounded-xl border border-border/60 bg-surface p-4">
            <div className="relative w-fit">
              <div
                className="grid h-20 w-20 place-items-center overflow-hidden rounded-full 
                bg-primary-soft text-2xl font-semibold text-primary ring-2 ring-border"
              >
                {avatarPreview || currentAvatarUrl ? (
                  <img
                    src={avatarPreview ?? currentAvatarUrl ?? ""}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>
                    {(form.getValues("name") || "?").charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={pick}
                aria-label="Change photo"
                className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border border-border bg-background text-foreground shadow-soft hover:bg-accent"
              >
                <Camera className="h-4 w-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_AVATAR_TYPES.join(",")}
                className="hidden"
                onChange={onFileChange}
              />
            </div>
            {fieldState.invalid && (
              <p className="mt-2 text-sm text-destructive">
                {fieldState.error?.message}
              </p>
            )}
          </div>
        )}
      />

      <FieldGroup className="mt-5 grid gap-4">
        {/* ── 1. Personal identity ─────────────────────────────── */}
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">Full name</FieldLabel>
              <Input {...field} id="name" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...field}
                id="email"
                disabled
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="contactNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="contactNumber">Contact number</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="contactNumber"
                placeholder="+8801....."
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="address"
                placeholder="Feni sadar, Feni, Bangladesh"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* ── 2. Professional credentials ──────────────────────── */}
        <Controller
          name="designation"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="designation">Designation</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="designation"
                placeholder="Associate Consultant"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="qualification"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="qualification">Qualification</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="qualification"
                placeholder="MBBS, FCPS (Medicine)"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="registrationNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="registrationNumber">
                Registration Number
              </FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="registrationNumber"
                placeholder="BMDC-XXXXX"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="experience"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="experience">Experience (Years)</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="experience"
                type="number"
                min={0}
                max={60}
                placeholder="5"
                aria-invalid={fieldState.invalid}
                onChange={(e) => {
                  const val = e.target.value;
                  field.onChange(val === "" ? undefined : Number(val));
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* ── 3. Practice details ──────────────────────────────── */}
        <Controller
          name="currentWorkingPlace"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="currentWorkingPlace">
                Current Working Place
              </FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="currentWorkingPlace"
                placeholder="United Hospital Limited"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="appointmentFee"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="appointmentFee">Appointment Fee</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ""}
                id="appointmentFee"
                type="number"
                min={0}
                disabled
                placeholder="1000"
                aria-invalid={fieldState.invalid}
                onChange={(e) => {
                  const val = e.target.value;
                  field.onChange(val === "" ? undefined : Number(val));
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* ── 4. Specialties (read-only display) ───────────────── */}
        <div className="space-y-3">
          <FieldLabel>Specialties</FieldLabel>

          {specialties.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No specialties assigned yet.
            </p>
          ) : (
            <ul className="flex flex-wrap gap-2">
              {specialties.map((spec) => (
                <li
                  key={spec.id}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground"
                >
                  <SpecialtyIcon
                    name={spec.icon}
                    className="h-4 w-4 shrink-0 text-primary"
                  />
                  <span>{spec.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Button type="submit" className="ml-auto w-fit" disabled={isPending}>
          {isPending ? "Saving…" : "Save profile"}
        </Button>
      </FieldGroup>
    </form>
  );
};

function SpecialtyIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon =
    (LucideIcons[name as keyof typeof LucideIcons] as React.ComponentType<{
      className?: string;
    }>) ?? LucideIcons.Stethoscope;

  return <Icon className={className} aria-hidden />;
}

export default SettingsForm;
