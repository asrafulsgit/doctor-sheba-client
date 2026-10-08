import { useQuery } from "@tanstack/react-query";
import { PaymentFilters, queryKeys } from "../query/query-keys";
import { api } from "../api/api-client";
import { ApiResponse } from "@/types/api-response";
import { IPayment, Payment, PaymentStatus } from "@/types/payment";
import { IPatient } from "@/types/patient";

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

type AllPayment = {
  payments: Payment[];
  stats: {
    paidAmount: number;
    unPaidAmount: number;
    currentMonthPaidAmount: number;
  };
};

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

type MyEarnings = {
  totalEarnings: number;
  totalPaidPayments: number;
  last7DaysEarnings: number;
  lastMonthEarnings: number;
  last6MonthsEarningsChart: {
    label: string;
    value: number;
  }[];
  payments: {
    status: PaymentStatus;
    appointmentId: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    transactionId: string;
    amount: number;
    appointment: {
      patient: IPatient;
    };
    paymentGatewayData: Record<string, any>;
  }[];
};

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
