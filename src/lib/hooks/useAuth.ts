import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { LoginFormValues } from "@/components/auth/Login";
import { queryKeys } from "../query/query-keys";

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginFormValues) =>
      api<ApiResponse<Record<string,any>>>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.session(), data);
    },
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

