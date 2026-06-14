// Domain types — mirror backend ERD exactly. Do not add fields.

import { Specialty } from "./specialties";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";
export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";
export type Gender = "MALE" | "FEMALE";
export type MaritalStatus = "MARRIED" | "UNMARRIED";
export type BloodGroup =
  | "A_POSITIVE" | "B_POSITIVE" | "O_POSITIVE" | "AB_POSITIVE"
  | "A_NEGATIVE" | "B_NEGATIVE" | "O_NEGATIVE" | "AB_NEGATIVE";

export type AppointmentStatus = "SCHEDULED" | "INPROGRESS" | "COMPLETED" | "CANCELED";
export type PaymentStatus = "PAID" | "UNPAID";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  needPasswordChange: boolean;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

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
