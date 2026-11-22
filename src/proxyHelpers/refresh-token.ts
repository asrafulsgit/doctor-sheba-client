"use server";
import { NextResponse } from "next/server";
import { COOKIE_NAMES } from "./config";

const REFRESH_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`;

//  Attempt token refresh

export async function attemptTokenRefresh(
  token: string,
): Promise<{ success: boolean; cookies?: string[] }> {
  try {
    const response = await fetch(REFRESH_ENDPOINT, {
      headers: {
        Cookie: `${COOKIE_NAMES.REFRESH_TOKEN}=${token}`,
      },
    });

    if (!response.ok) return { success: false };
    const cookies = response.headers.getSetCookie();

    return { success: true, cookies };
  } catch {
    return { success: false };
  }
}

// Clear all auth cookies (logout)

export function clearAuthCookies(response: NextResponse): void {
  response.cookies.delete(COOKIE_NAMES.ACCESS_TOKEN);
  response.cookies.delete(COOKIE_NAMES.REFRESH_TOKEN);
}
