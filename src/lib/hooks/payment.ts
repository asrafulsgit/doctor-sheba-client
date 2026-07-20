import { useQuery } from "@tanstack/react-query";
import { PaymentFilters, queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { IPayment } from "@/types/payment";

export function usePatientPayments(filters: PaymentFilters) {
  return useQuery({
    queryKey: queryKeys.payments.patientPayments(filters),
    queryFn: () =>
      api<ApiResponse<IPayment>>(`/payment/my-payments`),
    staleTime: 1000 * 60 * 5,
  });
}