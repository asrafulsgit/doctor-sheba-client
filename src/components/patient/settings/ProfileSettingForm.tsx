"use client";
import { usePatientProfile, useUpdatePatient } from "@/lib/hooks/usePatient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ProfileFormSkeleton from "./ProfileFormSkeleton";
import { EmptyState } from "@/components/shared/PageState";
import { Camera } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MAX_AVATAR_BYTES = 2 * 1024 * 1024; // 2MB
const ACCEPTED_AVATAR_TYPES = ["image/png", "image/jpeg", "image/webp"];
const profileSchema = z.object({
  name: z
    .string({ error: "Full name is required" })
    .min(1, "Full name is required"),
  email: z.string().optional(),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
  avatarFile: z
    .file({ error: "File is required" })
    .max(MAX_AVATAR_BYTES, { error: "File size must be less than 2 MB" })
    .mime(ACCEPTED_AVATAR_TYPES, {
      error: "Only PDF, JPG, PNG or WEBP files are allowed",
    })
    .nullable()
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

const profileDefaultValues: ProfileFormValues = {
  name: "",
  email: "",
  contactNumber: "",
  address: "",
  avatarFile: null,
};

const ProfileSettingForm = () => {
  const { data, isLoading, isError, error } = usePatientProfile();
  const { mutate: updateProfile, isPending } = useUpdatePatient();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: profileDefaultValues,
  });

  useEffect(() => {
    if (data?.data) {
      const profile = data.data;
      form.reset({
        name: profile.name ?? "",
        email: profile.email ?? "",
        contactNumber: profile.contactNumber ?? "",
        address: profile.address ?? "",
        avatarFile: null,
      });
    }
  }, [data?.data]);

  const currentAvatarUrl = data?.data?.profilePhoto;

  function pick() {
    fileInputRef.current?.click();
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      form.setValue("avatarFile", file);
      const url = URL.createObjectURL(file);
      setAvatarPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    }
  }

  function onSubmit(values: ProfileFormValues) {
    console.log(values);
    const payload = new FormData();
    payload.append("name", values.name);
    if (values.contactNumber)
      payload.append("contactNumber", values.contactNumber);
    if (values.address) payload.append("address", values.address);
    if (values.avatarFile) payload.append("avatar", values.avatarFile);

    updateProfile(payload, {
      onSuccess: () => {
        toast.success("Profile updated");
        form.resetField("avatarFile");
      },
      onError: (err: any) => {
        toast.error(err?.message || "Error while saving profile!");
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

      <Controller
        name="avatarFile"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="mt-5 mb-2 rounded-xl border border-border/60 bg-surface p-4">
            <div className="relative w-fit">
              <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-primary-soft text-2xl font-semibold text-primary ring-2 ring-border">
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
                onChange={(e) => onFileChange(e)}
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
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                {...field}
                id="address"
                type="address"
                placeholder="Feni sadar, Feni, Bangladesh"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" className="w-fit" disabled={isPending}>
          {isPending ? "Saving…" : "Save profile"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ProfileSettingForm;
