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
