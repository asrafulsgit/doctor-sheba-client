"use client";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useChangePassword } from "@/lib/hooks/useAuth";
import { toast } from "sonner";

const passwordSchema = z
  .object({
    oldPassword: z
      .string({ error: "Current password is required" })
      .min(1, "Current password is required"),
    newPassword: z
      .string({ error: "New password is required" })
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+=<>[\]{}|\\:;"',./~`]).+$/,
        {
          error:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        },
      ),
    confirm: z.string({ error: "Please confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["next"],
  });

export type PasswordFormValues = z.infer<typeof passwordSchema>;

const passwordDefaultValues: PasswordFormValues = {
  oldPassword: "",
  newPassword: "",
  confirm: "",
};

const ChangePasswordSettingForm = () => {
  const { mutate: updatePassword, isPending } = useChangePassword();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: passwordDefaultValues,
  });

  function onSubmit(values: PasswordFormValues) {
    updatePassword(values, {
      onSuccess: () => {
        toast.success("Password updated");
        form.reset(passwordDefaultValues);
      },
      onError: (err: any) => {
        toast.error(err?.message || "Error while updating password!");
      },
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="rounded-2xl border border-border bg-card p-6 shadow-soft"
    >
      <h2 className="text-base font-semibold">Security</h2>

      <FieldGroup className="mt-5 grid gap-4">
        <Controller
          name="oldPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="oldPassword">Current password</FieldLabel>
              <Input
                {...field}
                id="oldPassword"
                type="password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="newPassword">New password</FieldLabel>
              <Input
                {...field}
                id="newPassword"
                type="password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirm"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="confirm">Confirm new password</FieldLabel>
              <Input
                {...field}
                id="confirm"
                type="password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          className={cn("w-fit")}
          variant="outline"
          disabled={isPending}
        >
          {isPending ? "Updating…" : "Update password"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default ChangePasswordSettingForm;
