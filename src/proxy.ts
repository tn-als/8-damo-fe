import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_ROUTES, isPublicRoute } from '@/src/constants/routes';
import { parseCookie } from './lib/parse-cookie';

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  // refresh_token도 없으면 로그인 페이지로
  if (!refreshToken) {
    const loginUrl = new URL(PUBLIC_ROUTES.LOGIN, request.nextUrl.origin);
    loginUrl.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  // access_token이 없고 refresh_token이 있으면 갱신 시도
  if (!accessToken && refreshToken) {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const reissueResponse = await fetch(`${API_BASE_URL}/api/v1/auth/reissue`, {
        method: "POST",
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
      });

      if (reissueResponse.ok) {
        const setCookieHeader = reissueResponse.headers.get("set-cookie");

        if (setCookieHeader) {
          // Set-Cookie에서 모든 쿠키 파싱
          const cookieStrings = setCookieHeader.split(/,(?=\s*\w+=)/);
          const requestHeaders = new Headers(request.headers);

          for (const cookieString of cookieStrings) {
            const parsed = parseCookie(cookieString.trim());
            if (parsed) {
              // 각 쿠키를 헤더로 전달
              requestHeaders.set(parsed.name, parsed.value);
            }
          }

          const response = NextResponse.next({
            request: { headers: requestHeaders },
          });

          // 브라우저에 쿠키 설정 (다음 요청부터 사용)
          response.headers.set("Set-Cookie", setCookieHeader);

          return response;
        }

        return NextResponse.next();
      } else {
        const loginUrl = new URL(PUBLIC_ROUTES.LOGIN, request.nextUrl.origin);
        loginUrl.searchParams.set("redirect", `${pathname}${search}`);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      console.error("[proxy] Token reissue failed:", error);
      const loginUrl = new URL(PUBLIC_ROUTES.LOGIN, request.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};