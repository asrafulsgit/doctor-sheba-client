import { IDoctor } from "./doctors";
import { IPatient } from "./patient";
import { IPayment, Payment, PaymentStatus } from "./payment";
import { ISchedule } from "./schedule";

export type AppointmentStatus =
  | "SCHEDULED"
  | "INPROGRESS"
  | "COMPLETED"
  | "CANCELED";

export interface IAppointment {
  id: string;
  patientId: string;
  patient: IPatient;
  doctorId: string;
  doctor: IDoctor;
  scheduleId: string;
  videoCallingId: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  schedule: ISchedule;
  payments: Payment[];
  createdAt: string;
  updatedAt: string;
}
