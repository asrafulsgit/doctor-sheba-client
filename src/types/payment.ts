export type PaymentStatus = "PAID" | "UNPAID";
export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  transactionId: string;
  status: PaymentStatus;
  paymentGatewayData?: unknown;
  createdAt: string;
  updatedAt: string;
}
 

export interface IPayment  {
  id: string;
  appointmentId: string;
  amount: number;
  transactionId: string;
  status: PaymentStatus;
  paymentGatewayData: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
};