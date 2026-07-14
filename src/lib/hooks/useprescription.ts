import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { IPrescription } from "@/types/prescription";

export function useMyPrescriptions() {
  return useQuery({
    queryKey: queryKeys.prescriptions.myPrescriptions(),
    queryFn: () => api<ApiResponse<IPrescription[]>>("/prescription/my-prescriptions"),
    staleTime: 1000 * 60 * 5,
  });
}