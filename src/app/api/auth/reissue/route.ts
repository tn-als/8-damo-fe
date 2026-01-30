import { cookies } from "next/headers";

/**
 * POST /api/auth/reissue
 * 백엔드 reissue 엔드포인트 프록시
 * - 현재 요청의 쿠키를 백엔드로 전달
 * - 백엔드 응답의 Set-Cookie를 클라이언트로 forward
 */
export async function POST() {
  const API_BASE_URL =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!API_BASE_URL) {
    return new Response(
      JSON.stringify({ error: "API base URL이 설정되지 않았습니다." }),
      { status: 500 }
    );
  }

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/reissue`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (!response.ok) {
      return new Response(null, { status: response.status });
    }

    // 백엔드의 Set-Cookie를 클라이언트로 forward
    const setCookieHeader = response.headers.get("set-cookie");

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
