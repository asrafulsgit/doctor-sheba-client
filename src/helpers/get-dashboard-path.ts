import { UserRole } from "@/types/user";

export function getDashboardPath(role: UserRole): string {
  if (role === "PATIENT") return "/patient/dashboard";
  if (role === "DOCTOR") return "/doctor/dashboard";
  if (role === "ADMIN" || role === "SUPER_ADMIN") return "/admin/dashboard";
  return "/";
}
