import { PaymentStatus } from "./payment";

export enum UserRole {
  PATIENT    = "PATIENT",
  DOCTOR     = "DOCTOR",
  ADMIN      = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

export type Gender = "MALE" | "FEMALE";

export type MaritalStatus = "MARRIED" | "UNMARRIED";
export type BloodGroup =
  | "A_POSITIVE"
  | "B_POSITIVE"
  | "O_POSITIVE"
  | "AB_POSITIVE"
  | "A_NEGATIVE"
  | "B_NEGATIVE"
  | "O_NEGATIVE"
  | "AB_NEGATIVE";
export type AppointmentStatus =
  | "SCHEDULED"
  | "INPROGRESS"
  | "COMPLETED"
  | "CANCELED";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  needPasswordChange: boolean;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}
export interface PatientHealthData {
  id: string;
  patientId: string;
  gender: Gender;
  dateOfBirth: string;
  bloodGroup: BloodGroup;
  hasAllergies: boolean;
  hasDiabetes: boolean;
  height: string;
  weight: string;
  smokingStatus: boolean;
  dietaryPreferences?: string;
  pregnancyStatus: boolean;
  mentalHealthHistory?: string;
  immunizationStatus?: string;
  hasPastSurgeries: boolean;
  recentAnxiety: boolean;
  recentDepression: boolean;
  maritalStatus: MaritalStatus;
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
