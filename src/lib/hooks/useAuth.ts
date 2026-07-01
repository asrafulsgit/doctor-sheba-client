import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { LoginFormValues } from "@/components/auth/Login";
import { queryKeys } from "../query/query-keys";
import { IPatient } from "@/types/patient";
import { RegisterFormValues } from "@/components/auth/Register";
import { ResetPasswordFormValues } from "@/components/auth/ResetPassword";
import { ForgotPasswordFormValues } from "@/components/auth/ForgotPassword";
import { OtpFormValues } from "@/components/auth/VerifyEmail";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginFormValues) =>
      api<ApiResponse<Record<string, any>>>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.session(), data);
    },
  });
}

export function usePatientRegister() {
  return useMutation({
    mutationFn: (data: RegisterFormValues) =>
      api<ApiResponse<IPatient>>("/user/create-patient", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api("/auth/logout", { method: "POST" }),
    onSettled: () => {
      queryClient.clear();
    },
  });
}


export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordFormValues) =>
      api<ApiResponse<null>>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}
export function useResetPassword(token : string) {
  return useMutation({
    mutationFn: (data: ResetPasswordFormValues) =>
      api<ApiResponse<IPatient>>(`/auth/reset-password?token=${token}`, {
        method: "POST",
        body: JSON.stringify({password : data.password}),
      }),
  });
}

export function useVerfiyEmailOTPSend() {
  return useMutation({
    mutationFn: (data: ForgotPasswordFormValues) =>
      api<ApiResponse<null>>("/auth/verify-email/otp-send", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}
export function useVerfiyEmailOTPVerification() {
  return useMutation({
    mutationFn: (data: OtpFormValues & ForgotPasswordFormValues) =>
      api<ApiResponse<null>>("/auth/verify-email/otp-verification", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}