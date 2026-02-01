"use server";

import { fetchWithAuthRetry } from "../api/fetch-with-auth-retry";
import { getErrorMessage } from "../api/error-handler";
import type { ApiResponse } from "@/src/types/api/common";

interface UpdateBasicInfoRequest {
  imagePath: string;
  nickname: string;
  gender: "MALE" | "FEMALE";
  ageGroup: "TWENTIES" | "THIRTIES" | "FORTIES" | "FIFTIES_PLUS";
}

interface UpdateBasicInfoResponse {
  success: boolean;
  error?: string;
}

export async function updateBasicInfo(
  data: UpdateBasicInfoRequest
): Promise<UpdateBasicInfoResponse> {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  try {
    const response = await fetchWithAuthRetry(
      `${API_BASE_URL}/api/v1/users/me/basic`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const payload = (await response.json().catch(() => null)) as
      | ApiResponse<unknown>
      | null;

    if (!response.ok) {
      return {
        success: false,
        error: getErrorMessage(payload, response.status),
      };
    }

    return { success: true };
  } catch (error) {
    console.error("[updateBasicInfo] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}
