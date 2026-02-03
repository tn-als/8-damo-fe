import { NextResponse } from "next/server";
import { getAccessToken } from "@/src/lib/cookie";

interface RouteParams {
  params: Promise<{
    groupId: string;
    diningId: string;
  }>;
}

export async function GET(_: Request, { params }: RouteParams) {
  const { groupId, diningId } = await params;
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    return NextResponse.json(
      { errorMessage: "API base URL이 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json(
      { errorMessage: "인증 토큰이 없습니다." },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/groups/${groupId}/dining/${diningId}/restaurant-vote`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const payload = await response.json().catch(() => null);

    return NextResponse.json(payload ?? { errorMessage: null }, {
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        errorMessage:
          error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
