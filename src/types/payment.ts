import { AppointmentStatus } from "./appointment";
import { IDoctor } from "./doctors";
import { IPatient } from "./patient";

export type PaymentStatus =
  | "PAID"
  | "UNPAID"
  | "FAILED"
  | "REFUND_PENDING"
  | "REFUNDED"
  | "REFUND_FAILED";
export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  transactionId: string;
  status: PaymentStatus;

  paymentGatewayData: {
    method: string[];
    currency: string;

    customer_details: {
      name: string;
      email: string;
      phone: string | null;

      address: {
        city: string | null;
        line1: string | null;
        line2: string | null;
        state: string | null;
        country: string | null;
        postal_code: string | null;
      };

      tax_ids: unknown[];
      tax_exempt: string;
      business_name: string | null;
      individual_name: string | null;
    };
  };

  createdAt: string;
  updatedAt: string;

  appointment: {
    id: string;
    status: AppointmentStatus;
    doctor: IDoctor;
    patient: IPatient;
  };
}

export interface IPayment {
  paid: number;
  due: number;
  transactions: number;
  payments: Payment[];
}

export type AllPayment = {
  payments: Payment[];
  stats: {
    paidAmount: number;
    unPaidAmount: number;
    currentMonthPaidAmount: number;
  };
};

export type MyEarnings = {
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

export type RefundStatus = "PENDING" | "PROCESSING" | "SUCCEEDED" | "FAILED";
export interface IRefund{
    status: RefundStatus;
    id: string;
    createdAt: string;
    updatedAt: string;
    amount: number;
    paymentId: string;
    stripeRefundId?: string ;
    reason?: string ;
    failureReason?: string ;
}
