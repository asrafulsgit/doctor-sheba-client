import jwt from "jsonwebtoken";
import { UserRole } from "@/types/user";
import { COOKIE_NAMES } from "./config";

// ─── JWT Payload ────────────────────────────────────────────────────────────

export interface JWTPayload {
  sub: string; // userId
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
  jti?: string; // JWT ID (for revocation checks)
}

const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET;

// decode access and refresh tokens
export function decodeJWT(
  token: string,
  name: string,
): { payload: JWTPayload | null; verification: boolean } {
  let secret: string | undefined =
    name === COOKIE_NAMES.ACCESS_TOKEN ? accessTokenSecret
    : name === COOKIE_NAMES.REFRESH_TOKEN ? refreshTokenSecret
    : undefined;
  try {
    if (!secret) {
      throw new Error("Token secret not found");
    }
    const verifiedToken = jwt.verify(token, secret) as JWTPayload;
    if (verifiedToken) {
      return { payload: verifiedToken, verification: true };
    }
    return { payload: null, verification: false };
  } catch {
    return { payload: null, verification: false };
  }
}
