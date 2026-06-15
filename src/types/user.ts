export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "PATIENT";
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
