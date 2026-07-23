"use client";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { useLogin, useVerfiyEmailOTPSend } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { UserRole } from "@/types/user";
import { useState } from "react";

// seo optimization
// export const Route = createFileRoute("/auth/login")({
//   validateSearch: zodValidator(
//     z.object({ redirect: fallback(z.string(), "").default("") }),
//   ),
//   head: () => ({
//     meta: [{ title: "Sign in — DoctorSheba" }],
//   }),
//   component: LoginPage,
// });

const loginSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email("Invalid email address"),
  password: z.string({ error: "Password is required" }),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>(() => "PATIENT" as UserRole);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "patient@gmail.com",
      password: "Patient@@11",
    },
  });
  const { mutate: login, isPending } = useLogin();
  const { mutate: otpSend, isPending: otpSendPending } =
    useVerfiyEmailOTPSend();

  const handleRole = (role: UserRole) => {
    if (role === "PATIENT")
      form.reset({
        password: "Patient@@11",
        email: "patient@gmail.com",
      });
    if (role === "DOCTOR")
      form.reset({
        password: "arif123",
        email: "arif.hossain@gmail.com",
      });
    if (role === "ADMIN")
      form.reset({
        password: "admin123",
        email: "admin@gmail.com",
      });

    setRole(role);
  };

  function onSubmit(data: LoginFormValues) {
    login(data, {
      onSuccess: () => {
        toast.success("Login successful");
        router.push("/");
      },
      onError: (error: any) => {
        if (error?.status === 403) {
          otpSend(
            { email: data.email },
            {
              onSuccess: () => {
                router.push(`/auth/verify-email?email=${data.email}`);
              },

              onError: (error) => {
                toast.error(error.message || "Error while send otp!");
              },
            },
          );
          return;
        }

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
        Welcome back
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Sign in to access your dashboard.
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <RoleSelector value={role} onChange={handleRole} />
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
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex justify-between items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
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
            className={cn("", "w-full mt-2")}
            disabled={isPending}
          >
            {isPending || otpSendPending ? "Signing in…" : "Sign in"}
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/auth/register"
          className="font-medium text-primary hover:underline"
        >
          Create one
        </Link>
      </p>
    </motion.div>
  );
};

export function RoleSelector({
  value,
  onChange,
}: {
  value: UserRole;
  onChange: (v: UserRole) => void;
}) {
  const opts: {
    v: UserRole;
    label: string;
  }[] = [
    { v: "PATIENT" as UserRole, label: "Patient" },
    { v: "DOCTOR" as UserRole, label: "Doctor" },
    { v: "ADMIN" as UserRole, label: "Admin" },
  ];
  return (
    <div>
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">
        I am a
      </Label>
      <div className="mt-1.5 grid grid-cols-3 gap-2">
        {opts.map((o) => (
          <button
            key={o.v}
            type="button"
            onClick={() => onChange(o.v)}
            className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
              value === o.v
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-primary/40"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Login;
