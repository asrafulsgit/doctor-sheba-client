import { User } from "@/types/user";

export const user: User = {
  id: "usr_004",
  email: "patient@example.com",
  role: "PATIENT",
  needPasswordChange: false,
  status: "ACTIVE",
  createdAt: "2026-06-15T10:30:00.000Z",
  updatedAt: "2026-06-15T10:30:00.000Z",
};

export const doctor: User = {
  id: "usr_003",
  email: "doctor@doctorsheba.com",
  role: "DOCTOR",
  needPasswordChange: false,
  status: "ACTIVE",
  createdAt: "2026-06-15T10:20:00.000Z",
  updatedAt: "2026-06-15T10:20:00.000Z",
};

export const admin: User = {
  id: "usr_001",
  email: "superadmin@doctorsheba.com",
  role: "SUPER_ADMIN",
  needPasswordChange: false,
  status: "ACTIVE",
  createdAt: "2026-06-15T10:00:00.000Z",
  updatedAt: "2026-06-15T10:00:00.000Z",
};

export const activatedDashboard = admin;
