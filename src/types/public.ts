// Domain types — mirror backend ERD exactly. Do not add fields.
 





export type AppointmentStatus = "SCHEDULED" | "INPROGRESS" | "COMPLETED" | "CANCELED";
export type PaymentStatus = "PAID" | "UNPAID";



export interface Patient {
  id: string;
  email: string;
  name: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}



export interface Admin {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}



export interface Schedule {
  id: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorSchedule {
  doctorId: string;
  scheduleId: string;
  isBooked: boolean;
  appointmentId?: string;
  schedule: Schedule;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduleId: string;
  videoCallingId: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

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

export interface Prescription {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  instructions: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}



export interface MedicalReport {
  id: string;
  patientId: string;
  reportName: string;
  reportLink: string;
  createdAt: string;
  updatedAt: string;
}
