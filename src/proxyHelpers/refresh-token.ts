import { NextResponse } from "next/server";
import { COOKIE_NAMES } from "./config";

const REFRESH_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`;

// ─── Attempt token refresh ──────────────────────────────────────────────────

export async function attemptTokenRefresh(): Promise<{ success: boolean }> {
  try {
    const response = await fetch(REFRESH_ENDPOINT, {
      credentials: "include",
    });

    if (!response.ok) return { success: false };

    return { success: true };
  } catch {
    return { success: false };
  }
}

// ─── Clear all auth cookies (logout) ───────────────────────────────────────

export function clearAuthCookies(response: NextResponse): void {
  response.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN);
  response.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);
}
