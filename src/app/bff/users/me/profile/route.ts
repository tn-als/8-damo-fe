import { NextRequest } from "next/server";
import { AxiosError } from "axios";
import { bffAxios, passthroughResponse, errorResponse } from "@/src/app/bff/_lib";

// GET - 내 프로필 조회
export async function GET() {
  try {
    const response = await bffAxios.get("/api/v1/users/me/profile");
    return passthroughResponse(response.data, response.status);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return passthroughResponse(error.response.data, error.response.status);
    }
    return errorResponse("요청 중 오류가 발생했습니다.", 500);
  }
}

// PATCH - 프로필 수정
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await bffAxios.patch("/api/v1/users/me/characteristics", body);
    return passthroughResponse(response.data, response.status);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return passthroughResponse(error.response.data, error.response.status);
    }
    return errorResponse("요청 중 오류가 발생했습니다.", 500);
  }
}
