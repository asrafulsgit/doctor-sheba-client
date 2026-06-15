"use client";
import * as React from "react";
// import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

// seo optimization
// export const Route = createFileRoute("/auth/forgot-password")({
//   head: () => ({ meta: [{ title: "Reset password — DoctorSheba" }] }),
//   component: ForgotPage,
// });

const ForgotPassword = () => {
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      // toast.success("If that email exists, a reset link is on its way.");
    }, 600);
  };

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
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
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
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Sending…" : "Send reset link"}
          </Button>
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
