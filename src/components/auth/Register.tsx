"use client"; 
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";  
import Link from "next/link"; 
import z from "zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePatientRegister } from "@/lib/hooks/useAuth";
import { toast } from "sonner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";

// seo optimization
// export const Route = createFileRoute("/auth/register")({
//   head: () => ({ meta: [{ title: "Create account — DoctorSheba" }] }),
//   component: RegisterPage,
// });

const registerSchema = z.object({
  name: z
      .string()
      .trim()
      .min(3, { error: "Name must be at least 3 characters long." }),

    email: z.string().trim().email({ error: "Invalid email format." }),
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
      )
});
export type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => { 

  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name : "",
      email: "",
      password: "",
    },
  });
  const { mutate: patientRegister, isPending } = usePatientRegister();

  function onSubmit(data: RegisterFormValues) {
    patientRegister(data, {
      onSuccess: () => {
        toast.success("Login successful");
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
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Create your account
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        It only takes a minute.
      </p>

      <form className="mt-8 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
         <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field}
                  type="name"
                  placeholder="jhony huang"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
          {isPending ? "Creating account…" : "Create account"}
        </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
};

export default Register;
