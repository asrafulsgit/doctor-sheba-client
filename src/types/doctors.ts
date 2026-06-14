import { Gender } from "./public";
import { Specialty } from "./specialties";

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
