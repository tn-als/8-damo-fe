import { NextRequest } from "next/server";
import { AxiosError } from "axios";
import { bffAxios, passthroughResponse, errorResponse } from "@/src/app/bff/_lib";

interface RouteParams {
  params: Promise<{ groupId: string }>;
}

// GET - 그룹 회식 목록 조회
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { groupId } = await params;
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const response = await bffAxios.get(`/api/v1/groups/${groupId}/dining`, {
      params: status ? { status } : undefined,
    });
    return passthroughResponse(response.data, response.status);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return passthroughResponse(error.response.data, error.response.status);
    }
    return errorResponse("요청 중 오류가 발생했습니다.", 500);
  }
}

// POST - 회식 생성
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { groupId } = await params;
    const body = await request.json();

    const response = await bffAxios.post(`/api/v1/groups/${groupId}/dining`, body);
    return passthroughResponse(response.data, response.status);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return passthroughResponse(error.response.data, error.response.status);
    }
    return errorResponse("요청 중 오류가 발생했습니다.", 500);
  }
}
