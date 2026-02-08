import { cookies } from "next/headers";
import { parseCookie } from "@/src/lib/cookie";

/**
 * POST /api/auth/reissue
 * 백엔드 reissue 엔드포인트 프록시
 * - 현재 요청의 쿠키를 백엔드로 전달
 * - 백엔드 응답의 Set-Cookie를 클라이언트로 forward
 */
export async function POST(request: Request) {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!API_BASE_URL) {
    return new Response(
      JSON.stringify({ error: "API base URL이 설정되지 않았습니다." }),
      { status: 500 }
    );
  }

  const cookieHeader = request.headers.get("Cookie");

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/auth/reissue`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader ?? "",
      },
    });

    await response.json().catch(() => null);

    if (!response.ok) {
      return new Response(null, { status: 401 });
    }

    // Set-Cookie 헤더 파싱 및 쿠키 설정
    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookieStore = await cookies();

      // 여러 쿠키가 있을 수 있으므로 분리하여 처리
      const cookieStrings = setCookieHeader.split(/,(?=\s*\w+=)/);

      for (const cookieString of cookieStrings) {
        const parsed = parseCookie(cookieString.trim());
        if (parsed) {
          cookieStore.set(parsed.name, parsed.value, parsed.options);
        }
      }
    }

    return new Response(null, {
      status: 204,
      headers: setCookieHeader ? { "Set-Cookie": setCookieHeader } : undefined,
    });
  } catch (error) {
    console.error("[/api/auth/reissue] Request failed", error);
    return new Response(
      JSON.stringify({ error: "토큰 재발급 요청 실패" }),
      { status: 500 }
    );
  }
}
