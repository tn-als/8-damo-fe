"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface UpdateBasicInfoRequest {
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
  if (!API_BASE_URL) {
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, error: "인증 토큰이 없습니다." };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/users/me/basic`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.message || `요청 실패 (${response.status})`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}
