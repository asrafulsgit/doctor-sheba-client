"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRole } from "@/types/public";
// import { RoleSelector } from "./Login";
import Link from "next/link";

// seo optimization
// export const Route = createFileRoute("/auth/register")({
//   head: () => ({ meta: [{ title: "Create account — DoctorSheba" }] }),
//   component: RegisterPage,
// });

const Register = () => {
  // const { register, isReady, user } = useAuth();
  // const navigate = useNavigate();
  const [role, setRole] = React.useState<UserRole>("PATIENT");
  const [submitting, setSubmitting] = React.useState(false);

  // React.useEffect(() => {
  //   if (isReady && user) navigate({ to: dashboardPathForRole(user.role), replace: true });
  // }, [isReady, user, navigate]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");
    if (!name || !email || password.length < 6) {
      // toast.error("Please fill all fields. Password must be 6+ characters.");
      return;
    }
    setSubmitting(true);
    // try {
    //   const u = await register(name, email, password, role);
    //   toast.success("Account created.");
    //   navigate({ to: dashboardPathForRole(u.role), replace: true });
    // } catch {
    //   toast.error("Could not create your account.");
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
        Create your account
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        It only takes a minute.
      </p>

      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        {/* <RoleSelector value={role} onChange={setRole} /> */}
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Your full name"
            className="mt-1.5"
          />
        </div>
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="At least 6 characters"
            className="mt-1.5"
          />
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Creating account…" : "Create account"}
        </Button>
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
