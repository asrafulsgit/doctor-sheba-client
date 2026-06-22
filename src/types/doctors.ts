import { Specialty } from "./specialties";
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
}
