"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDoctorRegister } from "@/lib/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Combobox } from "@/components/ui/combobox";
import { useSpecialties } from "@/lib/hooks/UseSpecialty";

export const doctorFormSchema = z.object({
  name: z.string().trim().min(1, "Full name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .trim()
    .min(8, { error: "Password must be at least 8 characters long." })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=<>[\]{}|\\:;"',./~`]).+$/,
      {
        error:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    ),
  contactNumber: z.string().min(11, "Contact number is too short"),
  address: z.string().min(3, "Address is required"),
  gender: z.enum(["MALE", "FEMALE"]),
  registrationNumber: z.string().trim(),
  specialties: z.array(z.string()).min(1, "Select at least one specialty"),
  experience: z.number().nonnegative("Experience cannot be negative"),
  currentWorkingPlace: z.string().min(2, "Current working place is required"),
  designation: z.string().min(2, "Designation is required"),
  qualification: z.string().min(2, "Qualification is required"),
  appointmentFee: z.number().nonnegative("Fee cannot be negative"),
});

export type DoctorFormValues = z.infer<typeof doctorFormSchema>;

const CreateDoctorForm = () => {
  const form = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      contactNumber: "",
      address: "",
      registrationNumber: "",
      specialties: [],
      experience: 0,
      currentWorkingPlace: "",
      designation: "",
      qualification: "",
      appointmentFee: 0,
    },
  });

  const { mutate: doctorRegister, isPending } = useDoctorRegister();
  const { data, isLoading, isError, error } = useSpecialties();
  const specialties = data?.data;
  function onSubmit(data: DoctorFormValues) {
    doctorRegister(data, {
      onSuccess: () => {
        toast.success("Doctor created successfully");
        form.reset();
      },
      onError: (error) => {
        toast.error(error.message || "Error while creating doctor!");
      },
    });
  }

  return (
    <form className="mt-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="grid gap-3 sm:grid-cols-2">
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
                type="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                {...field}
                id="password"
                type="password"
                placeholder="••••••••"
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
                id="contactNumber"
                type="tel"
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
              <select
                {...field}
                id="gender"
                value={field.value ?? ""}
                aria-invalid={fieldState.invalid}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="registrationNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="registrationNumber">BMDC #</FieldLabel>
              <Input
                {...field}
                id="registrationNumber"
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
                id="qualification"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="currentWorkingPlace"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="currentWorkingPlace">
                Current working place
              </FieldLabel>
              <Input
                {...field}
                id="currentWorkingPlace"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="designation"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="designation">Designation</FieldLabel>
              <Input
                {...field}
                id="designation"
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
              <FieldLabel htmlFor="experience">Experience (yrs)</FieldLabel>
              <Input
                id="experience"
                type="number"
                min={0}
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? 0 : e.target.valueAsNumber,
                  )
                }
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
              <FieldLabel htmlFor="appointmentFee">Fee (৳)</FieldLabel>
              <Input
                id="appointmentFee"
                type="number"
                min={0}
                name={field.name}
                ref={field.ref}
                onBlur={field.onBlur}
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? 0 : e.target.valueAsNumber,
                  )
                }
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="specialties"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
              <FieldLabel htmlFor="specialties">Specialties</FieldLabel>
              <Combobox
                options={
                  specialties?.map((s) => ({
                    value: s?.title,
                    label: s?.title,
                  })) ?? []
                }
                value={field.value[0] ?? ""}
                onChange={(value) => field.onChange(value ? [value] : [])}
                placeholder="Select Specialty"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <Button type="submit" className="w-full sm:w-auto" disabled={isPending}>
        {isPending ? "Creating…" : "Create doctor"}
      </Button>
    </form>
  );
};

export default CreateDoctorForm;
