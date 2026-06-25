import { useMutation } from "@tanstack/react-query";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { LoginFormValues } from "@/components/auth/Login";

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginFormValues) =>
      api<ApiResponse<null>>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
  });
}


