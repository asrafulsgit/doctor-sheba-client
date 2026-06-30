"use client";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { KeyRound, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useQueryManager from "@/hooks/UseQueryManager";
import { useRouter } from "next/navigation";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useResetPassword } from "@/lib/hooks/useAuth";
import { cn } from "@/lib/utils";

// export const Route = createFileRoute("/auth/reset-password")({
//   validateSearch: zodValidator(
//     z.object({
//       token: fallback(z.string(), "demo-token").default("demo-token"),
//       email: fallback(z.string(), "").default(""),
//     }),
//   ),
//   head: () => ({ meta: [{ title: "Set a new password — DoctorSheba" }] }),
//   component: ResetPasswordPage,
// });

const resetPasswordSchema = z
  .object({
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
    confirmPassword: z.string({ error: "Confirm Password is required" }).trim(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match.",
  });
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const router = useRouter();
  const { getQuery } = useQueryManager();
  const email = getQuery("email");
  const token = getQuery("token") as string;
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { mutate: resetPassword, isPending } = useResetPassword(token);

  function onSubmit(data: ResetPasswordFormValues) {
    resetPassword(data, {
      onSuccess: () => {
        toast.success("Password reset successful");
        router.push("/auth/login");
      },
      onError: (error) => {
        toast.error(error.message || "Error while login!");
      },
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
        <KeyRound className="h-6 w-6" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Set a new password
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {email ? (
          <>
            Choose a new password for{" "}
            <span className="font-medium text-foreground">{email}</span>.
          </>
        ) : (
          <>Choose a strong password you haven't used before.</>
        )}
      </p>

      <form className="mt-8 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">New password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmPassword">
                  Confirm new password
                </FieldLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button
            type="submit"
            className={cn("", "w-full mt-1")}
            disabled={isPending}
          >
            {isPending ? "Updating…" : "Update password"}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary hover:underline"
        >
          Back to sign in
        </Link>
      </p>
    </motion.div>
  );
};

export default ResetPassword;
