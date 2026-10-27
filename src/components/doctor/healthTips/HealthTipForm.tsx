"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useSpecialties } from "@/lib/hooks/UseSpecialty";
import { Controller, UseFormReturn } from "react-hook-form";

import { HealthTipFormValues } from "./CreateHealthTip";

type HealthTipFieldsProps = {
  form: UseFormReturn<HealthTipFormValues>;
};
const HealthTipForm = ({ form }: HealthTipFieldsProps) => {
  const { data } = useSpecialties();
  const specialties = data?.data ?? [];

  return (
    <>
      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
              <FieldLabel htmlFor="title">Title *</FieldLabel>
              <Input
                {...field}
                id="title"
                placeholder="5 ways to control blood pressure"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="category"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="category">Category *</FieldLabel>
              <Input
                {...field}
                id="category"
                list="tip-categories"
                placeholder="Cardiology"
                aria-invalid={fieldState.invalid}
              />
              <datalist id="tip-categories">
                {specialties.map((specialty) => (
                  <option key={specialty.id} value={specialty.title} />
                ))}
              </datalist>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="excerpt"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="excerpt">Short summary</FieldLabel>
              <Input
                {...field}
                id="excerpt"
                placeholder="A brief summary of the health tip"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="sm:col-span-2">
              <FieldLabel htmlFor="content">Content *</FieldLabel>
              <Textarea
                {...field}
                id="content"
                rows={8}
                placeholder="Write your health tip..."
                aria-invalid={fieldState.invalid}
                className="min-h-48 resize-y"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="isPublished"
          control={form.control}
          render={({ field }) => (
            <Field className="sm:col-span-2">
              <div className="flex items-center justify-between gap-4 rounded-lg border p-4">
                <div className="space-y-1">
                  <FieldLabel htmlFor="isPublished">Publish now</FieldLabel>
                  <p className="text-sm text-muted-foreground">
                    Turn off to save this health tip as a draft.
                  </p>
                </div>

                <Switch
                  id="isPublished"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </div>
            </Field>
          )}
        />
      </FieldGroup>
    </>
  );
};

export default HealthTipForm;
