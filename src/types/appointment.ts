import { IDoctor } from "./doctors";
import { IPayment, PaymentStatus } from "./payment";
import { ISchedule } from "./schedule";

export type AppointmentStatus =
  | "SCHEDULED"
  | "INPROGRESS"
  | "COMPLETED"
  | "CANCELED";

export interface IAppointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduleId: string;
  videoCallingId: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  schedule: ISchedule;
  doctor: IDoctor;
  payments: IPayment[];
  createdAt: string;
  updatedAt: string;
}
