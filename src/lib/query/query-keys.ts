import { AppointmentStatus } from "@/types/appointment";
import { IDoctorFilter } from "@/types/doctors";
import { IHealthTipFilter } from "@/types/health-tips";
import { PaymentStatus } from "@/types/payment";

export const queryKeys = {
  // ─── Auth ────────────────────────────────────────────────────────────────
  auth: {
    all: ["auth"] as const,
    session: () => ["auth", "session"] as const,
    profile: () => ["auth", "profile"] as const,
    permissions: () => ["auth", "permissions"] as const,
  },

  // ─── Doctors ─────────────────────────────────────────────────────────────
  doctors: {
    all: ["doctors"] as const,
    lists: () => ["doctors", "list"] as const,
    profile: () => ["doctors", "profile"] as const,
    list: (filters: IDoctorFilter) => ["doctors", "list", filters] as const,
    adminList: (filters: IDoctorFilter) => ["doctors", "admin_list", filters] as const,
    myDoctorsList: (filters: IDoctorFilter) =>
      ["doctors", "myDoctors", "list", filters] as const,
    details: () => ["doctors", "detail"] as const,
    detail: (id: string) => ["doctors", "detail", id] as const,
    schedule: (id: string, dateRange?: DateRange) =>
      ["doctors", "detail", id, "schedule", dateRange] as const,
    reviews: (id: string) => ["doctors", "detail", id, "reviews"] as const,
    availability: (id: string, date: string) =>
      ["doctors", "detail", id, "availability", date] as const,
    stats: (id: string) => ["doctors", "detail", id, "stats"] as const,
    earnings: (id: string, period: string) =>
      ["doctors", "detail", id, "earnings", period] as const,
  },

  // ─── Patients ─────────────────────────────────────────────────────────────
  patients: {
    all: ["patients"] as const,
    lists: () => ["patients", "list"] as const,
    list: (filters: PatientFilters) => ["patients", "list", filters] as const,
    details: () => ["patients", "detail"] as const,
    detail: (id: string) => ["patients", "detail", id] as const,
    healthProfile: () => ["patients", "healthProfile"] as const,
    medicalHistory: (id: string) =>
      ["patients", "detail", id, "medical-history"] as const,
    vitals: (id: string) => ["patients", "detail", id, "vitals"] as const,
    labReports: (id: string) =>
      ["patients", "detail", id, "lab-reports"] as const,
    appointments: (id: string) =>
      ["patients", "detail", id, "appointments"] as const,
  },

  // ─── Appointments ─────────────────────────────────────────────────────────
  appointments: {
    all: ["appointments"] as const,
    lists: () => ["appointments", "list"] as const,
    list: (filters: AppointmentFilters) =>
      ["appointments", "list", filters] as const,
    myAppointmentList: (filters: AppointmentFilters) =>
      ["appointments", "myAppointments", "list", filters] as const,
    myAppointment: (id: string) =>
      ["appointments", "myAppointments", id] as const,
    details: () => ["appointments", "detail"] as const,
    detail: (id: string) => ["appointments", "detail", id] as const,
    upcoming: (userId: string, role: "doctor" | "patient") =>
      ["appointments", "upcoming", userId, role] as const,
    today: (doctorId: string) => ["appointments", "today", doctorId] as const,
    calendar: (doctorId: string, month: string) =>
      ["appointments", "calendar", doctorId, month] as const,
  },
  // ─── medical reports ─────────────────────────────────────────────────────────
  medicalReports: {
    all: ["MedicalReports"] as const,
    myMedicalReports: (filters: MedicalReportFilters) =>
      ["MedicalReports", "list", filters] as const,
    list: (filters: AppointmentFilters) =>
      ["appointments", "list", filters] as const,
    myAppointmentList: (filters: AppointmentFilters) =>
      ["appointments", "myAppointments", "list", filters] as const,
    myAppointment: (id: string) =>
      ["appointments", "myAppointments", id] as const,
    details: () => ["appointments", "detail"] as const,
    detail: (id: string) => ["appointments", "detail", id] as const,
    upcoming: (userId: string, role: "doctor" | "patient") =>
      ["appointments", "upcoming", userId, role] as const,
    today: (doctorId: string) => ["appointments", "today", doctorId] as const,
    calendar: (doctorId: string, month: string) =>
      ["appointments", "calendar", doctorId, month] as const,
  },
  bookings: {
    all: ["bookings"] as const,
    doctorSchedules: (id: string) => ["bookings", "schedules", id] as const,
  },

  schedules: {
    all: ["schedules"] as const,
    list: (filters: DoctorAvailableSchedulesFilters) =>
      ["schedules", "list", filters] as const,
    doctorAvailableSchedules: (
      doctorAvailableSchedulesFilters: DoctorAvailableSchedulesFilters,
    ) =>
      [
        "schedules",
        "doctorAvailableSchedules",
        doctorAvailableSchedulesFilters,
      ] as const,
    doctorSelectedSchedules: (
      doctorAvailableSchedulesFilters: DoctorAvailableSchedulesFilters,
      id : string
    ) =>
      [
        "schedules",
        "doctorSelectedSchedules",
        doctorAvailableSchedulesFilters,
        id
      ] as const,
    doctorScheduledSchedules: (
      doctorAvailableSchedulesFilters: DoctorAvailableSchedulesFilters,
    ) =>
      [
        "schedules",
        "doctorScheduledSchedules",
        doctorAvailableSchedulesFilters,
      ] as const,
  },

  // ─── Prescriptions ────────────────────────────────────────────────────────
  prescriptions: {
    all: ["prescriptions"] as const,
    lists: () => ["prescriptions", "list"] as const,
    list: (filters: PrescriptionFilters) =>
      ["prescriptions", "list", filters] as const,
    detail: (id: string) => ["prescriptions", "detail", id] as const,
    byPatient: () => ["prescriptions", "patient"] as const,
    myPrescriptions: (filters: PrescriptionFilters) =>
      ["prescriptions", "patient", "myPrescriptions", filters] as const,
    byAppointment: (appointmentId: string) =>
      ["prescriptions", "appointment", appointmentId] as const,
  },

  meta: {
    patientMeta: ["patientMeta"] as const,
    doctorMeta: ["doctorMeta"] as const,
    adminMeta: ["patientMeta"] as const,
  },

  // ─── Notifications ────────────────────────────────────────────────────────
  notifications: {
    all: ["notifications"] as const,
    list: (userId: string) => ["notifications", userId] as const,
    unreadCount: (userId: string) =>
      ["notifications", userId, "unread-count"] as const,
  },

  // ─── Dashboard ────────────────────────────────────────────────────────────
  dashboard: {
    all: ["dashboard"] as const,
    doctorSummary: (doctorId: string) =>
      ["dashboard", "doctor", doctorId] as const,
    adminStats: () => ["dashboard", "admin"] as const,
    revenue: (period: string) => ["dashboard", "revenue", period] as const,
  },

  // ─── Specialties & Tags ───────────────────────────────────────────────────
  specialties: {
    all: ["specialties"] as const,
    list: () => ["specialties", "list"] as const,
  },

  // ─── Health Tips ───────────────────────────────────────────────────
  healthTips: {
    all: ["health-tips"] as const,
    list: (filters: IHealthTipFilter) =>
      ["health-tips", "list", filters] as const,
    detail: (slug: string) => ["health-tips", "detail", slug] as const,
  },

  // ─── reviews ───────────────────────────────────────────────────
  reviews: {
    all: ["reviews"] as const,
    myReviewlist: (filters: IReviewFilter) =>
      ["reviews", "my-reviews", "list", filters] as const,
  },

  // ─── Payments ─────────────────────────────────────────────────────────────
  payments: {
    all: ["payments"] as const,
    list: (filters: PaymentFilters) => ["payments", "list", filters] as const,
    patientPayments: (filters: PaymentFilters) =>
      ["payments", "list", "patient", filters] as const,
    myEarnings: (filters: PaymentFilters) =>
      ["payments", "list", "my-earnings", filters] as const,
    detail: (id: string) => ["payments", "detail", id] as const,
    byPatient: (patientId: string) =>
      ["payments", "patient", patientId] as const,
  },
} as const;

// ─── Types (shared filter shapes) ────────────────────────────────────────────

export interface DateRange {
  from: string;
  to: string;
}

export interface PatientFilters {
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export interface DoctorAvailableSchedulesFilters {
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
export interface IReviewFilter {
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
}
export interface AppointmentFilters {
  searchTerm?: string;
  paymentStatus?: PaymentStatus;
  status?: AppointmentStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface MedicalReportFilters {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface PrescriptionFilters {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface PaymentFilters {
  searchTerm?: string;
  status?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
  startDate?: string;
  endDate?: string;
}
