import { useQuery } from "@tanstack/react-query";
import { PaymentFilters, queryKeys, RefundFilters } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { AllPayment, IPayment, IRefund, MyEarnings } from "@/types/payment";

export function usePatientPayments(filters: PaymentFilters) {
  return useQuery({
    queryKey: queryKeys.payments.patientPayments(filters),
    queryFn: () =>
      api<ApiResponse<IPayment>>(`/payment/my-payments`, {
        params: filters,
      }),
    staleTime: 1000 * 60 * 5,
  });
}

export function usePayments(filters: PaymentFilters) {
  return useQuery({
    queryKey: queryKeys.payments.list(filters),
    queryFn: () =>
      api<ApiResponse<AllPayment>>(`/payment/all`, {
        params: filters,
      }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useMyEarnings(filters: PaymentFilters) {
  return useQuery({
    queryKey: queryKeys.payments.myEarnings(filters),
    queryFn: () =>
      api<ApiResponse<MyEarnings>>(`/payment/my-earnings`, {
        params: filters,
      }),
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetRefunds(filters: RefundFilters) {
  return useQuery({
    queryKey: queryKeys.payments.refunds(filters),
    queryFn: () =>
      api<ApiResponse<IRefund[]>>("/payment/refunds", {
        params: filters,
      }),
    staleTime: 1000 * 60 * 5,
  });
}
