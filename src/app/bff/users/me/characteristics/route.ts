import { NextRequest } from "next/server";
import { AxiosError } from "axios";
import { bffAxios, passthroughResponse, errorResponse } from "@/src/app/bff/_lib";

// POST - 특성 정보 저장 (온보딩)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await bffAxios.post("/api/v1/users/me/characteristics", body);
    return passthroughResponse(response.data, response.status);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return passthroughResponse(error.response.data, error.response.status);
    }
    return errorResponse("요청 중 오류가 발생했습니다.", 500);
  }
}
