"use server";

import { getAccessToken } from "../cookie";

interface UpdateCharacteristicsRequest {
  allergies: string[];
  likeFoods: string[];
  likeIngredients: string[];
  otherCharacteristics: string;
}

interface UpdateCharacteristicsResponse {
  success: boolean;
  error?: string;
}

export async function updateCharacteristics(
  data: UpdateCharacteristicsRequest
): Promise<UpdateCharacteristicsResponse> {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("[updateCharacteristics] Missing API base URL env");
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, error: "인증 토큰이 없습니다." };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/users/me/characteristics`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
    console.error("[updateCharacteristics] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}
