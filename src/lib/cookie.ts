import "server-only";

import { cookies, headers } from "next/headers";

export async function getCookieValue(name: string): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value ?? null;
}

export async function getAccessToken(): Promise<string | null> {
  // 1. 헤더에서 먼저 확인 (proxy에서 토큰 갱신 시 전달)
  const headerStore = await headers();
  const tokenFromHeader = headerStore.get("access_token");
  if (tokenFromHeader) {
    return tokenFromHeader;
  }

  // 2. 쿠키에서 확인
  return getCookieValue("access_token");
}

export async function getRefreshToken(): Promise<string | null> {
  return getCookieValue("refresh_token");
}

export async function deleteRefreshToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("refresh_token");
}

export { parseCookie } from "./parse-cookie";
