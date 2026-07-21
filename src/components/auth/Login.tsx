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
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate: login, isPending } = useLogin();
  const { mutate: otpSend, isPending: otpSendPending } =
    useVerfiyEmailOTPSend();

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
            {(isPending || otpSendPending) ? "Signing in…" : "Sign in"}
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

export default Login;