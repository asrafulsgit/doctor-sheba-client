// Domain types — mirror backend ERD exactly. Do not add fields.
 








export interface Patient {
  id: string;
  email: string;
  name: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}



export interface Admin {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}



export interface Schedule {
  id: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorSchedule {
  doctorId: string;
  scheduleId: string;
  isBooked: boolean;
  appointmentId?: string;
  schedule: Schedule;
}







export interface Review {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}




