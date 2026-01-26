"use server";

import { getAccessToken } from "../cookie";

interface CreateGroupRequest {
  name: string;
  introduction: string;
  latitude: number;
  longitude: number;
}

interface CreateGroupResponse {
  success: boolean;
  groupId?: string;
  error?: string;
}

const ALLOWED_IMAGE_CONTENT_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
]);

interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
  directory: string;
}

interface PresignedUrlData {
  presignedUrl: string;
  objectKey: string;
  expiresIn: number;
}

interface PresignedUrlResponse {
  success: boolean;
  data?: PresignedUrlData;
  error?: string;
}

export async function createGroup(
  data: CreateGroupRequest
): Promise<CreateGroupResponse> {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("[createGroup] Missing API base URL env");
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, error: "인증 토큰이 없습니다." };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const payload = await response.json().catch(() => null);
    const inner = payload?.data;
    const innerData = inner?.data;

    if (!response.ok) {
      return {
        success: false,
        error:
          inner?.errorMessage ||
          payload?.errorMessage ||
          `요청 실패 (${response.status})`,
      };
    }

    if (!innerData?.groupId) {
      return { success: false, error: "groupId를 확인할 수 없습니다." };
    }

    return { success: true, groupId: innerData.groupId };
  } catch (error) {
    console.error("[createGroup] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}

export async function getGroupProfilePresignedUrl(
  data: PresignedUrlRequest
): Promise<PresignedUrlResponse> {
  if (!ALLOWED_IMAGE_CONTENT_TYPES.has(data.contentType)) {
    return {
      success: false,
      error: "허용되지 않는 파일 형식입니다.",
    };
  }

  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    console.error("[getGroupProfilePresignedUrl] Missing API base URL env");
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return { success: false, error: "인증 토큰이 없습니다." };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/s3/presigned-url`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const payload = await response.json().catch(() => null);
    const inner = payload?.data;
    const innerData = inner?.data;

    if (!response.ok) {
      return {
        success: false,
        error:
          inner?.errorMessage ||
          payload?.errorMessage ||
          `요청 실패 (${response.status})`,
      };
    }

    if (!innerData) {
      return {
        success: false,
        error: inner?.errorMessage || "presigned url을 받을 수 없습니다.",
      };
    }

    return {
      success: true,
      data: {
        presignedUrl: innerData.presignedUrl,
        objectKey: innerData.objectKey,
        expiresIn: innerData.expiresIn,
      },
    };
  } catch (error) {
    console.error("[getGroupProfilePresignedUrl] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}
