import { AppointmentStatus } from "./user";

export interface IPatient {
  id: string;
  name: string;
  email: string;
  contactNumber: string | null;
  address: string | null;
  profilePhoto: string | null;
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

  doctor: {
    id: string;
    name: string;
    email: string;
    profilePhoto: string | null;
    contactNumber: string;
    address: string;
    experience: number;
    gender: string;
    registrationNumber: string;
    appointmentFee: number;
    currentWorkingPlace: string;
    designation: string;
    qualification: string;
    isDeleted: boolean;
    averageRating: number;
    createdAt: string;
    updatedAt: string;

    doctorSpecialities: {
      id: string;
      doctorId?: string;
      specialities?: {
        id: string;
        title: string;
        icon?: string | null;
      };
    }[];
  };

  schedule: {
    id: string;
    startDateTime: string;
    endDateTime: string;
    createdAt: string;
    updatedAt: string;
  };
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
  medications: Medication[];
}

export interface Medication {
  id: string;
  prescriptionId: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}
