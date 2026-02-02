"use server";

import { fetchWithAuthRetry } from "../api/fetch-with-auth-retry";
import type { User } from "@/src/stores/user-store";

interface GetMeResponse {
  httpStatus: string;
  data?: User;
  error?: string;
}

export async function getMe(): Promise<GetMeResponse> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    return { httpStatus: "400", error: "API base URL이 설정되지 않았습니다." };
  }

  try {
    const response = await fetchWithAuthRetry(
      `${API_BASE_URL}/api/v1/users/me/basic`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = (await response.json().catch(() => null)) as
      | { httpStatus?: string; data?: User; errorMessage?: string }
      | null;

    if (!response.ok) {
      return {
        httpStatus: data?.httpStatus ?? String(response.status),
        error: data?.errorMessage ?? `HTTP ${response.status}`,
      };
    }
    return {
      httpStatus: data?.httpStatus ?? "200 OK",
      data: data?.data,
    };
  } catch (error) {
    console.error("[getMe] Request failed", error);
    return {
      httpStatus: "400",
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}
