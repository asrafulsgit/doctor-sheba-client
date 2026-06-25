import { UserRole } from "@/types/user";

// ─── Auth routes ───────────────────
export const AUTH_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify-email",
];

// ─── Public routes  ───────────────────

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/doctors",
  "/faq",
  "/health-tips",
  "/specialties",
  "/contact",
  "/terms",
  "/privacy",
];

// ─── Role home pages (after login redirect) ────────────────────────────────

export const ROLE_HOME: Record<UserRole, string> = {
  [UserRole.PATIENT]: "/patient/dashboard",
  [UserRole.DOCTOR]: "/doctor/dashboard",
  [UserRole.ADMIN]: "/admin/dashboard",
  [UserRole.SUPER_ADMIN]: "/admin/dashboard",
};

export interface RouteConfig {
  /** Roles that can access this route prefix. Empty = public. */
  allowedRoles: UserRole[];
  /** Redirect destination if access is denied (logged-in user, wrong role). */
  deniedRedirect?: string;
}

// ─── Protected route prefixes → allowed roles ──────────────────────────────
// SUPER_ADMIN intentionally inherits /admin/* access.

export const PROTECTED_ROUTES: Record<string, RouteConfig> = {
  "/patient": {
    allowedRoles: [UserRole.PATIENT],
    deniedRedirect: undefined,
  },
  "/doctor": {
    allowedRoles: [UserRole.DOCTOR],
    deniedRedirect: undefined,
  },
  "/admin": {
    allowedRoles: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
    deniedRedirect: undefined,
  },
};

// ─── Cookie names ───────────────────────────────────────────────────────────

export const COOKIE_NAMES = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
} as const;
