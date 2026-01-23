import axios from "axios";
import { NextResponse } from "next/server";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: Request) {
  if (!apiBaseUrl) {
    return NextResponse.json(
      { errorMessage: "API base URL이 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  let body: { code?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { errorMessage: "요청 본문이 올바르지 않습니다." },
      { status: 400 }
    );
  }

  if (!body.code) {
    return NextResponse.json(
      { errorMessage: "인가 코드가 없습니다." },
      { status: 400 }
    );
  }

  try {
    const endpoint = new URL("/api/v1/auth/oauth", apiBaseUrl).toString();
    const response = await axios.post(
      endpoint,
      { code: body.code },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      if (Array.isArray(setCookieHeader)) {
        setCookieHeader.forEach((cookie) => {
          nextResponse.headers.append("set-cookie", cookie);
        });
      } else {
        nextResponse.headers.set("set-cookie", setCookieHeader);
      }
    }

    return nextResponse;
  } catch (requestError) {
    if (axios.isAxiosError(requestError)) {
      const status = requestError.response?.status ?? 500;
      const payload =
        requestError.response?.data ??
        ({ errorMessage: requestError.message } as const);

      return NextResponse.json(payload, { status });
    }

    return NextResponse.json(
      { errorMessage: "요청 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
