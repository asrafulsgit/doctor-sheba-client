"use client";
// import * as React from "react";
// import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
// import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
// import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/types/public";
import { useState } from "react";
import Link from "next/link";

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

const Login = () => {
  // const { login, isReady, user } = useAuth();
  // const navigate = useNavigate();
  // const { redirect } = Route.useSearch();
  const [role, setRole] = useState<UserRole>("PATIENT");
  const [submitting, setSubmitting] = useState(false);

  // React.useEffect(() => {
  //   if (isReady && user) {
  //     navigate({ to: redirect || dashboardPathForRole(user.role), replace: true });
  //   }
  // }, [isReady, user, navigate, redirect]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    if (!email || !password) {
      // toast.error("Email and password are required.");
      return;
    }
    setSubmitting(true);
    // try {
    //   const u = await login(email, password, role);
    //   toast.success(`Welcome back, ${u.name}.`);
    //   navigate({ to: redirect || dashboardPathForRole(u.role), replace: true });
    // } catch {
    //   toast.error("Could not sign you in.");
    // } finally {
    //   setSubmitting(false);
    // }
  };

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

      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        {/* <RoleSelector value={role} onChange={setRole} /> */}

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
