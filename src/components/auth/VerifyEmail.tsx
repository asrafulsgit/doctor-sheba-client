"use client";
import * as React from "react";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import useQueryManager from "@/hooks/UseQueryManager";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  useVerfiyEmailOTPSend,
  useVerfiyEmailOTPVerification,
} from "@/lib/hooks/useAuth";

// export const Route = createFileRoute("/auth/verify-email")({
//   validateSearch: zodValidator(
//     z.object({ email: fallback(z.string(), "").default("") }),
//   ),
//   head: () => ({ meta: [{ title: "Verify your email — DoctorSheba" }] }),
//   component: VerifyEmailPage,
// });

const otpSchema = z.object({
  otp: z.string().length(6, "Verification code must be 6 digits"),
});
export type OtpFormValues = z.infer<typeof otpSchema>;

const VerifyEmail = () => {
  const router = useRouter();
  const { getQuery } = useQueryManager();
  const [resendIn, setResendIn] = React.useState(60);
  const email = getQuery("email");
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  React.useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  const { mutate: otpVerification, isPending: otpVerificationPending } =
    useVerfiyEmailOTPVerification();
  const { mutate: otpSend, isPending: otpSendPending } =
    useVerfiyEmailOTPSend();
  const onSubmit = async (values: OtpFormValues) => {
    if (!email) {
      return toast.error("Email is required");
    }
    const payload = {
      ...values,
      email,
    };

    otpVerification(payload, {
      onSuccess: () => {
        toast.success("OTP verirification successful");
        router.push("/auth/login");
      },
      onError: (error) => {
        toast.error(error.message || "Error while verify otp!");
      },
    });
  };

  const resend = () => {
    if (!email) {
      return toast.error("Email is required");
    }
    setResendIn(60);
    otpSend(
      { email },
      {
        onSuccess: () => {
          toast.success(`Verification code sent${email ? ` to ${email}` : ""}`);
        },
        onError: (error) => {
          toast.error(error.message || "Error while send otp!");
        },
      },
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
        <MailCheck className="h-6 w-6" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Verify your email
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        We've sent a 6-digit code to{" "}
        <span className="font-medium text-foreground">
          {email || "your email"}
        </span>
        . Enter it below to confirm your account.
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4">
        <FieldGroup>
          <Controller
            name="otp"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="otp">Verification code</FieldLabel>
                <Input
                  {...field}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="123456"
                  className={cn(
                    "",
                    "mt-1.5 tracking-[0.5em] text-center text-lg font-semibold",
                  )}
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
            disabled={otpVerificationPending || otpSendPending}
          >
            {otpVerificationPending ? "Verifying…" : "Verify email"}
          </Button>
        </FieldGroup>
      </form>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Didn't get the code?</span>
        <button
          type="button"
          onClick={resend}
          disabled={resendIn > 0}
          className={`font-medium text-primary hover:underline disabled:cursor-not-allowed 
            ${resendIn <= 0 && "cursor-pointer"} disabled:text-muted-foreground disabled:no-underline`}
        >
          {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Wrong email?{" "}
        <Link
          href="/auth/login"
          className="font-medium text-primary hover:underline"
        >
          Start over
        </Link>
      </p>
    </motion.div>
  );
};

export default VerifyEmail;
