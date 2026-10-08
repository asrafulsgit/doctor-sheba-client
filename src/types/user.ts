import { Admin } from "./admin";
import { IDoctor } from "./doctors";
import { IPatient } from "./patient";

export enum UserRole {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
  ADMIN = "ADMIN",
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

export interface User {
  id: string;
  email: string;
  role: UserRole;
  needPasswordChange: boolean;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;

  admin: Admin;
  patient: IPatient;
  doctor: IDoctor;
}
