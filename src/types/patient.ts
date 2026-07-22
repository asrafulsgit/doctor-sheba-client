import { IDoctor } from "./doctors";
import { ISchedule } from "./schedule";
import { AppointmentStatus, BloodGroup, Gender, MaritalStatus } from "./user";

export interface IPatient {
  id: string;
  name: string;
  email: string; 
  contactNumber: string | null;
  address: string | null;
  profilePhoto: string | null;
  patientHealthData: Partial<IHealthProfile>;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PatientMetadataResponse {
  stats: {
    upcoming: number;
    completedVisits: number;
    totalPrescriptions: number;
    savedReports: number;
  };

  upcomingAppointments: UpcomingAppointment[];

  healthSummary: {
    bloodGroup: string;
    height: string;
    weight: string;
    bmi: number;
    hasAllergies: boolean;
    hasDiabetes: boolean;
    hasPastSurgeries: boolean;
    mentalHealthHistory: string | null;
    lastCheckup: string | null;
  };

  recentPrescriptions: RecentPrescription[];
}

export interface UpcomingAppointment {
  id: string;
  patientId: string;
  doctorId: string;
  scheduleId: string;
  videoCallingId: string;
  status: AppointmentStatus;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;

  doctor: IDoctor;

  schedule: ISchedule;
}

export interface RecentPrescription {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  date: string;
  doctorName: string;
  instructions: string;
  followUpDate: string | null;
  diagnosis: string;
  medications: IMedication[];
}

export interface IMedication {
  id: string;
  prescriptionId: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface IHealthProfile {
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
  dietaryPreferences: string | null;
  pregnancyStatus: boolean;
  mentalHealthHistory: string | null;
  immunizationStatus: string | null;
  hasPastSurgeries: boolean;
  recentAnxiety: boolean;
  recentDepression: boolean;
  maritalStatus: MaritalStatus;
  createdAt: string;
  updatedAt: string;
}
