import { UserRole } from "@/types/user";
import {
  AUTH_ROUTES,
  PROTECTED_ROUTES,
  PUBLIC_ROUTES,
  ROLE_HOME,
  RouteConfig,
} from "./config"; 

export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
}

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
}

export function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    /\.(png|jpg|jpeg|svg|ico|webp|woff2?|ttf|css|js|map)$/.test(pathname)
  );
}

// ─── Longest prefix match for protected routes ──────────────────────────────

export function matchProtectedRoute(pathname: string): RouteConfig | null {
  let bestMatch: string | null = null;

  for (const prefix of Object.keys(PROTECTED_ROUTES)) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) {
      if (!bestMatch || prefix.length > bestMatch.length) {
        bestMatch = prefix;
      }
    }
  }

  return bestMatch ? PROTECTED_ROUTES[bestMatch] : null;
}

// ─── Role access check ──────────────────────────────────────────────────────

export function canRoleAccess(role: UserRole, config: RouteConfig): boolean {
  return config.allowedRoles.includes(role);
}

// ─── Redirect destinations ──────────────────────────────────────────────────

export function getRoleHome(role: UserRole): string {
  return ROLE_HOME[role] ?? "/";
}

export function getDeniedRedirect(role: UserRole,config: RouteConfig): string {
  return config.deniedRedirect ?? getRoleHome(role);
}
