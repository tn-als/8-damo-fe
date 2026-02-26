import { NextRequest, NextResponse } from "next/server";
import { type ApiResponse } from "@/src/app/bff/_lib";

interface WsTokenData {
  accessToken: string | null;
}

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value ?? null;

  return NextResponse.json<ApiResponse<WsTokenData>>(
    {
      httpStatus: "200",
      data: { accessToken },
      errorMessage: null,
    },
    { status: 200 }
  );
}
