"use server";

import { fetchWithAuthRetry } from "../api/fetch-with-auth-retry";

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
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("[updateBasicInfo] Missing API base URL env");
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

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `요청 실패 (${response.status})`,
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
