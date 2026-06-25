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
import { useLogin } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

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
  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const fd = new FormData(e.currentTarget);
  //   const email = String(fd.get("email") || "");
  //   const password = String(fd.get("password") || "");
  //   if (!email || !password) {
  //     // toast.error("Email and password are required.");
  //     return;
  //   }
  //   setSubmitting(true);
  //   // try {
  //   //   const u = await login(email, password, role);
  //   //   toast.success(`Welcome back, ${u.name}.`);
  //   //   navigate({ to: redirect || dashboardPathForRole(u.role), replace: true });
  //   // } catch {
  //   //   toast.error("Could not sign you in.");
  //   // } finally {
  //   //   setSubmitting(false);
  //   // }
  // };

  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate: login, isPending} = useLogin();

  function onSubmit(data: LoginFormValues) {
    login(data, {
      onSuccess: () => {
        toast.success("Login successful");
        router.push("/");
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
                <FieldLabel htmlFor="password">Password</FieldLabel>
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
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing in…" : "Sign in"}
          </Button>
        </FieldGroup>
      </form>

      {/* <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-1.5"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="mt-1.5"
          />
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form> */}

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

// export function RoleSelector({
//   value,
//   onChange,
// }: {
//   value: UserRole;
//   onChange: (v: UserRole) => void;
// }) {
//   const opts: { v: UserRole; label: string }[] = [
//     { v: "PATIENT", label: "Patient" },
//     { v: "DOCTOR", label: "Doctor" },
//     { v: "ADMIN", label: "Admin" },
//   ];
//   return (
//     <div>
//       <Label className="text-xs uppercase tracking-wide text-muted-foreground">
//         I am a
//       </Label>
//       <div className="mt-1.5 grid grid-cols-3 gap-2">
//         {opts.map((o) => (
//           <button
//             key={o.v}
//             type="button"
//             onClick={() => onChange(o.v)}
//             className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
//               value === o.v
//                 ? "border-primary bg-primary text-primary-foreground"
//                 : "border-border bg-background text-foreground hover:border-primary/40"
//             }`}
//           >
//             {o.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
