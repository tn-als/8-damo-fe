"use server";

import { getAccessToken } from "../cookie";

export interface CreateDiningRequest {
  diningDate?: string;
  voteDueDate?: string;
  budget?: number;
}

interface CreateDiningResponse {
  success: boolean;
  diningId?: number;
  error?: string;
}

export async function createDining(
  groupId: string,
  data: CreateDiningRequest
): Promise<CreateDiningResponse> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("[createDining] Missing API base URL env");
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, error: "인증 토큰이 없습니다." };
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/groups/${groupId}/dining`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        error: payload?.errorMessage || `요청 실패 (${response.status})`,
      };
    }

    const diningId = payload?.data;

    if (diningId === null || diningId === undefined) {
      return { success: false, error: "diningId를 확인할 수 없습니다." };
    }

    const parsedDiningId = Number(diningId);

    if (!Number.isFinite(parsedDiningId)) {
      return { success: false, error: "diningId를 확인할 수 없습니다." };
    }

    return { success: true, diningId: parsedDiningId };
  } catch (error) {
    console.error("[createDining] Request failed", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}
