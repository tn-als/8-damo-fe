"use server";

import { fetchWithAuthRetry } from "../api/fetch-with-auth-retry";
import { getErrorMessage } from "../api/error-handler";
import type { ApiResponse } from "@/src/types/api/common";

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
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  try {
    const response = await fetchWithAuthRetry(
      `${API_BASE_URL}/api/v1/users/me/characteristics`,
      {
        method: "POST",
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
    console.error("[updateCharacteristics] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}
