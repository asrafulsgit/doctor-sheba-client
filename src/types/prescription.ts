import { IAppointment } from "./appointment";
import { IDoctor } from "./doctors";
import { IMedication, IPatient } from "./patient";

export interface IPrescription {
  id: string;
  appointmentId: string;
  doctorId: string;
  patientId: string;
  diagnosis: string;
  instructions: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
  appointment: IAppointment;
  doctor?: IDoctor;
  patient?: IPatient;
  medications: IMedication[];
}
