import { IDoctorFilter } from "@/types/doctors"; 
import { IHealthTipFilter } from "@/types/health-tips";

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
    list: (filters: IDoctorFilter) => ["doctors", "list", filters] as const,
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
    details: () => ["appointments", "detail"] as const,
    detail: (id: string) => ["appointments", "detail", id] as const,
    upcoming: (userId: string, role: "doctor" | "patient") =>
      ["appointments", "upcoming", userId, role] as const,
    today: (doctorId: string) => ["appointments", "today", doctorId] as const,
    calendar: (doctorId: string, month: string) =>
      ["appointments", "calendar", doctorId, month] as const,
  },

  // ─── Prescriptions ────────────────────────────────────────────────────────
  prescriptions: {
    all: ["prescriptions"] as const,
    lists: () => ["prescriptions", "list"] as const,
    list: (filters: PrescriptionFilters) =>
      ["prescriptions", "list", filters] as const,
    detail: (id: string) => ["prescriptions", "detail", id] as const,
    byPatient: (patientId: string) =>
      ["prescriptions", "patient", patientId] as const,
    byAppointment: (appointmentId: string) =>
      ["prescriptions", "appointment", appointmentId] as const,
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
    list: (filters: IHealthTipFilter) => ["health-tips", "list", filters] as const,
    detail: (slug: string) => ["health-tips", "detail", slug] as const,
  },

  // ─── Payments ─────────────────────────────────────────────────────────────
  payments: {
    all: ["payments"] as const,
    list: (filters: PaymentFilters) => ["payments", "list", filters] as const,
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
  search?: string;
  status?: "active" | "inactive";
  page?: number;
  limit?: number;
}

export interface AppointmentFilters {
  status?: "pending" | "confirmed" | "completed" | "cancelled";
  doctorId?: string;
  patientId?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface PrescriptionFilters {
  patientId?: string;
  doctorId?: string;
  status?: "active" | "expired" | "dispensed";
  page?: number;
  limit?: number;
}

export interface PaymentFilters {
  status?: "pending" | "completed" | "refunded" | "failed";
  patientId?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}
