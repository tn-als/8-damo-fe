import "server-only";
import { redirect } from "next/navigation";
import { getAccessToken } from "../cookie";

export async function fetchWithAuthRetry(
  input: string | URL | Request,
  init?: RequestInit
): Promise<Response> {
  const accessToken = await getAccessToken();

  const headers = new Headers(init?.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(input, { ...init, headers });

  if (response.status === 401 || response.status === 403) {
    redirect("/login");
  }

  return response;
}
