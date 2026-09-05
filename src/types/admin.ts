import { AppointmentStatus, IAppointment } from "./appointment";
import { IDoctor } from "./doctors";

export type AdminMeta = {
  stats: {
    totalPatients: number;
    totalDoctors: number;
    lastMonthRevenue: number;
    lastMonthAppointments: number;
  };

  monthlyRevenue: {
    month: string;
    revenue: number;
  }[];

  appointmentCountsByStatus: {
    status: AppointmentStatus;
    appointments: number;
  }[];

  recentAppointments: IAppointment[];

  topPerformingDoctors: IDoctor[];
};
