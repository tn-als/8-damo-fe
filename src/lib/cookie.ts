import "server-only";

import { cookies } from "next/headers";

export async function getCookieValue(name: string): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value ?? null;
}

export async function getAccessToken(): Promise<string | null> {
  return getCookieValue("access_token");
}
