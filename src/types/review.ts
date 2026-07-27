export interface IReview {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  rating: number;
  comment: string;
  patient: {
    id : string;
    name: string;
    profilePhoto: string | null;
  };
  createdAt: string;
  updatedAt: string;
}
