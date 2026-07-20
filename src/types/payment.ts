import { AppointmentStatus } from "./appointment";
import { IDoctor } from "./doctors";

export type PaymentStatus = "PAID" | "UNPAID";
// export interface Payment {
//   id: string;
//   appointmentId: string;
//   amount: number;
//   transactionId: string;
//   status: PaymentStatus;
//   paymentGatewayData?: unknown;
//   createdAt: string;
//   updatedAt: string;
// }

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
  };
}

export interface IPayment {
  paid: number;
  due: number;
  transactions: number;
  payments: Payment[];
}
