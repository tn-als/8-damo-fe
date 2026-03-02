import { NextRequest } from "next/server";
import { AxiosError } from "axios";
import { bffAxios, passthroughResponse, errorResponse } from "@/src/app/bff/_lib";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const params: Record<string, string> = {};
    if (searchParams.get("lastLightningId")) {
      params.lastLightningId = searchParams.get("lastLightningId")!;
    }
    if (searchParams.get("size")) {
      params.size = searchParams.get("size")!;
    }

    const response = await bffAxios.get("/api/v1/users/me/lightning", {
      params,
    });
    return passthroughResponse(response.data, response.status);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return passthroughResponse(error.response.data, error.response.status);
    }
    return errorResponse("요청 중 오류가 발생했습니다.", 500);
  }
}
