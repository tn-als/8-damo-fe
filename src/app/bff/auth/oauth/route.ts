import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios, { AxiosError } from "axios";
import { parseCookie } from "@/src/lib/cookie";
import { passthroughResponse, errorResponse, type ApiResponse } from "@/src/app/bff/_lib";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface OAuthData {
  onboardingStep: "BASIC" | "CHARACTERISTIC" | "DONE";
}

export async function POST(request: NextRequest) {
  if (!API_BASE_URL) {
    return errorResponse("API base URL이 설정되지 않았습니다.", 500);
  }

  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return errorResponse("인가 코드가 필요합니다.", 400);
    }

    const response = await axios.post<ApiResponse<OAuthData>>(
      `${API_BASE_URL}/api/v1/auth/oauth`,
      { code },
      {
        headers: { "Content-Type": "application/json" },
        validateStatus: () => true,
      }
    );

    // Set-Cookie 헤더 파싱 및 쿠키 설정
    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      const cookieStore = await cookies();

      for (const cookieString of setCookieHeader) {
        const parsed = parseCookie(cookieString.trim());
        if (parsed) {
          cookieStore.set(parsed.name, parsed.value, parsed.options);
        }
      }
    }

    return passthroughResponse(response.data, response.status);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      return passthroughResponse(error.response.data, error.response.status);
    }
    return errorResponse("요청 중 오류가 발생했습니다.", 500);
  }
}
