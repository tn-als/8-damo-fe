"use server";

import { fetchWithAuthRetry } from "../api/fetch-with-auth-retry";
import { getErrorMessage } from "../api/error-handler";
import { ALLOWED_IMAGE_CONTENT_TYPES } from "@/src/constants/s3/mime";
import type { ApiResponse } from "@/src/types/api/common";

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
    process.env.NEXT_PUBLIC_API_URL;

  if (!API_BASE_URL) {
    return { success: false, error: "API base URL이 설정되지 않았습니다." };
  }

  try {
    const response = await fetchWithAuthRetry(
      `${API_BASE_URL}/api/v1/s3/presigned-url`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const payload = (await response.json().catch(() => null)) as
      | ApiResponse<PresignedUrlData>
      | null;

    if (!response.ok) {
      return {
        success: false,
        error: getErrorMessage(payload, response.status),
      };
    }

    if (!payload?.data) {
      return {
        success: false,
        error: "presigned url을 받을 수 없습니다.",
      };
    }

    return {
      success: true,
      data: {
        presignedUrl: payload.data.presignedUrl,
        objectKey: payload.data.objectKey,
        expiresIn: payload.data.expiresIn,
      },
    };
  } catch (error) {
    console.error("[getPresignedUrl] Request failed", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
    };
  }
}
