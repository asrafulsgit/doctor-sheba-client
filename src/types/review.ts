export interface IReview {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  rating: number;
  comment: string;
  patient: {
    name: string;
    profilePhoto: string | null;
  };
  createdAt: Date;
  updatedAt: Date;
}
