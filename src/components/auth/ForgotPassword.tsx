"use client";
import * as React from "react";
// import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPassword } from "@/lib/hooks/useAuth";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { cn } from "@/lib/utils";

// seo optimization
// export const Route = createFileRoute("/auth/forgot-password")({
//   head: () => ({ meta: [{ title: "Reset password — DoctorSheba" }] }),
//   component: ForgotPage,
// });

const forgotPasswordSchema = z.object({
  email: z.string().trim().email({ error: "Invalid email format." }),
});
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [sent, setSent] = React.useState(false);
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  function onSubmit(data: ForgotPasswordFormValues) {
    forgotPassword(data, {
      onSuccess: () => {
        setSent(true);
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
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Reset your password
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter the email associated with your account and we'll send you a reset
        link.
      </p>

      {sent ? (
        <div className="mt-8 rounded-xl border border-border bg-success-soft p-5 text-sm text-foreground">
          Check your inbox for a link to reset your password.
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="you@example.com"
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
              {isPending ? "Sending…" : "Send reset link"}
            </Button>
          </FieldGroup>
        </form>
      )}

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

export default ForgotPassword;
