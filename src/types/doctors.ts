import { AppointmentStatus, IAppointment } from "./appointment";
import { IReview } from "./review";
import { ISpecialty, Specialty } from "./specialties";
import { Gender } from "./user";

export interface Doctor {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  registrationNumber: string;
  experience: number;
  gender?: Gender;
  appointmentFee?: number;
  qualification?: string;
  currentWorkingPlace?: string;
  designation?: string;
  isDeleted?: boolean;
  averageRating?: number;
  createdAt?: string;
  updatedAt?: string;
  specialties?: Specialty[];
  available?: boolean;
}

export interface IDoctorSchedule {
  doctorId: string;
  scheduleId: string;
  isBooked: boolean;
  createdAt: string;
  updatedA: string;
  schedule: {
    id: string;
    startDateTime: string;
    endDateTime: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IDoctor {
  id: string;
  name: string;
  email: string;
  profilePhoto: string | null;
  contactNumber: string;
  address: string;
  experience: number;
  gender: Gender;
  registrationNumber: string;
  appointmentFee: number;
  currentWorkingPlace: string;
  designation: string;
  qualification: string;
  isDeleted: boolean;
  averageRating: number;
  createdAt: string;
  updatedAt: string;

  doctorSchedules: IDoctorSchedule[];
  doctorSpecialities: ISpecialty[];
}

export interface IDoctorMeta {
  appointmentCount: number;
  reviewCount: number;
  averageRating: number;
  pendingAppointmentCount: number;
  patientCount: number;
  totalRevenue: number;
  todaysAppointments: IAppointment[];
  recentReviews: IReview[];
  formattedAppointmentStatusDistribution: {
    status: AppointmentStatus;
    count: number;
  }[];
  last7DaysCompletedAppointments: {
    day: string;
    count: 0;
  }[];
}
export interface IDoctorFilter {
  searchTerm?: string;
  designation?: string;
  minFee?: number;
  maxFee?: number;
  gender?: Gender;
  page?: number;
  limit?: number;
  sortOrder?: string;
  sortBy?: string;
  specialty?: string;
}
