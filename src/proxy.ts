import { NextResponse, type NextRequest } from "next/server";
import {
  canRoleAccess,
  getDeniedRedirect,
  getRoleHome,
  isAuthRoute,
  isPublicRoute,
  isStaticAsset,
  matchProtectedRoute,
} from "./proxyHelpers/matcher";
import { COOKIE_NAMES } from "./proxyHelpers/config";
import { decodeJWT, JWTPayload } from "./proxyHelpers/jwt";
import {
  attemptTokenRefresh,
  clearAuthCookies,
} from "./proxyHelpers/refresh-token"; 
import { UserRole } from "./types/user";

// ─── Middleware entry point ──────────────────────────────────────────────────

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // ── 1. Skip static assets entirely ─────────────────────────────────────
  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  // ── 2. Base response that will be modified and returned ─────────────────
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  // ── 3. Public routes — pass through unconditionally ─────────────────────
  if (isPublicRoute(pathname)) {
    return response;
  }

  // ── 4. Parse tokens from cookies ────────────────────────────────────────
  const accessTokenRaw = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshTokenRaw = request.cookies.get(
    COOKIE_NAMES.REFRESH_TOKEN,
  )?.value;

  let authObject: {
    payload: JWTPayload | null;
    verification: boolean;
  } = accessTokenRaw
    ? decodeJWT(accessTokenRaw, COOKIE_NAMES.ACCESS_TOKEN)
    : { payload: null, verification: false };

  // ── 5. Token refresh pipeline ───────────────────────────────────────────
  //    Trigger if:
  //      (a) access token is fully expired but we have a refresh token, OR
  //      (b) access token expires soon (proactive refresh to avoid mid-session expiry)
  if (!authObject.verification && refreshTokenRaw) {
    const jwtDecoded = decodeJWT(refreshTokenRaw, COOKIE_NAMES.REFRESH_TOKEN);
    const refreshResult = await attemptTokenRefresh();
    if (jwtDecoded.verification && refreshResult.success) {
      authObject.verification = refreshResult.success;
      authObject.payload = jwtDecoded.payload;
    } else {
      clearAuthCookies(response);
      authObject.verification = false;
    }
  }

  const userRole = authObject?.payload?.role;

  // ── 6. Auth routes — redirect logged-in users to their dashboard ─────────
  if (isAuthRoute(pathname)) {
    if (authObject && userRole) {
      const dest = getRoleHome(userRole as UserRole);
      return buildRedirect(request, dest, response);
    }
    // Not authenticated → allow access to login/register/etc.
    return response;
  }

  // ── 7. Protected route guard ────────────────────────────────────────────
  const routeConfig = matchProtectedRoute(pathname);

  if (routeConfig) {
    // 7a. Not authenticated → redirect to login with return URL
    if (!authObject.verification || !userRole) { 
      return buildRedirect(request, "/auth/login", response);
    }

    // 7b. Authenticated but wrong role → redirect to their own dashboard
    if (!canRoleAccess(userRole as UserRole, routeConfig)) {
      const dest = getDeniedRedirect(routeConfig);
      return buildRedirect(request, dest, response);
    }

    return response;
  }

  return response;
}


// ─── Redirect helper — preserves security headers ───────────────────────────

function buildRedirect(
  request: NextRequest,
  destination: string,
  sourceResponse: NextResponse,
): NextResponse {
  const url = new URL(destination, request.url).toString();

  const redirectResponse = NextResponse.redirect(url);

  // Copy security headers + request ID onto the redirect response
  sourceResponse.headers.forEach((value, key) => {
    redirectResponse.headers.set(key, value);
  });

  return redirectResponse;
}

// ─── Matcher — defines which paths this middleware runs on ──────────────────
//    Excludes /_next/* and static files at the framework level for performance.

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|map)$).*)",
  ],
};
