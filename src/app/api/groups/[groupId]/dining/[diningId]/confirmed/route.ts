import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ groupId: string; diningId: string }> }
) {
  const { groupId, diningId } = await params;

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    return NextResponse.json(
      { errorMessage: "API base URL이 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { errorMessage: "인증 토큰이 없습니다." },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/groups/${groupId}/dining/${diningId}/confirmed`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("[API Route] getDiningConfirmed error:", error);
    return NextResponse.json(
      {
        errorMessage:
          error instanceof Error ? error.message : "요청 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
