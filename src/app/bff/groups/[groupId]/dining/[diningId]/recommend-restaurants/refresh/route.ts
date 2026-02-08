import { NextRequest } from "next/server";
import { AxiosError } from "axios";
import { bffAxios, passthroughResponse, errorResponse } from "@/src/app/bff/_lib";

interface RouteParams {
  params: Promise<{
    groupId: string;
    diningId: string;
  }>;
}

// POST - 추천 식당 새로고침
export async function POST(_: NextRequest, { params }: RouteParams) {
  try {
    const { groupId, diningId } = await params;

    const response = await bffAxios.post(
      `/api/v1/groups/${groupId}/dining/${diningId}/recommend-restaurant/refresh`
    );
    return passthroughResponse(response.data, response.status);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return passthroughResponse(error.response.data, error.response.status);
    }
    return errorResponse("요청 중 오류가 발생했습니다.", 500);
  }
}
