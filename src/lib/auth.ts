import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "admin" | "vendor" | "customer";
  affiliationType?: string | null;
  studentId?: string | null;
  employeeId?: string | null;
  department?: {
    id: string;
    name: string;
    code: string | null;
  } | null;
  avatarUrl?: string | null;
}

const AUTH_COOKIE_NAME = "campusbite_session";

/**
 * Hash password using native scrypt with a random salt
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Verify password against stored salt:hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = scryptSync(password, salt, 64);
    return timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

/**
 * Sets an HTTP-only authentication session cookie
 */
export async function setAuthSession(user: SessionUser) {
  const cookieStore = await cookies();
  const serialized = Buffer.from(JSON.stringify(user)).toString("base64");

  cookieStore.set(AUTH_COOKIE_NAME, serialized, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Retrieves the current session user from cookies
 */
export async function getAuthSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);
    if (!sessionCookie?.value) return null;

    const decoded = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
    return JSON.parse(decoded) as SessionUser;
  } catch {
    return null;
  }
}

/**
 * Clears the session cookie (logout)
 */
export async function clearAuthSession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

