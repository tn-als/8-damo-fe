"use server";

import { getAccessToken } from "../cookie";
import { ALLOWED_IMAGE_CONTENT_TYPES } from "@/src/constants/s3/mime";

export interface PresignedUrlRequest {
  fileName: string;
  contentType: string;
  directory: string;
}

export interface PresignedUrlData {
  presignedUrl: string;
  objectKey: string;
  expiresIn: number;
}

export interface PresignedUrlResponse {
  success: boolean;
  data?: PresignedUrlData;
  error?: string;
}

export async function getPresignedUrl(
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
    const responseData = payload?.data;

    if (!response.ok) {
      return {
        success: false,
        error: payload?.errorMessage || `요청 실패 (${response.status})`,
      };
    }

    if (!responseData) {
      return {
        success: false,
        error: payload?.errorMessage || "presigned url을 받을 수 없습니다.",
      };
    }

    return {
      success: true,
      data: {
        presignedUrl: responseData.presignedUrl,
        objectKey: responseData.objectKey,
        expiresIn: responseData.expiresIn,
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
