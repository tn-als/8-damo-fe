import { NextRequest } from "next/server";
import { AxiosError } from "axios";
import { bffAxios, passthroughResponse, errorResponse } from "@/src/app/bff/_lib";
import { ALLOWED_IMAGE_CONTENT_TYPES } from "@/src/constants/s3/mime";

// PUT - Presigned URL 발급
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // 클라이언트 측 validation
    if (!ALLOWED_IMAGE_CONTENT_TYPES.has(body.contentType)) {
      return errorResponse("허용되지 않는 파일 형식입니다.", 400);
    }

    const response = await bffAxios.put("/api/v1/s3/presigned-url", body);
    return passthroughResponse(response.data, response.status);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return passthroughResponse(error.response.data, error.response.status);
    }
    return errorResponse("요청 중 오류가 발생했습니다.", 500);
  }
}
