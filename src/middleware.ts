import { NextRequest, NextResponse } from 'next/server';
import { ROUTES } from '@/src/constants/routes';

const PUBLIC_ROUTES = ['/login'];
const ONBOARDING_ROUTES = ['/onboarding'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isOnboardingRoute = ONBOARDING_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  /**
   * 1️⃣ 비로그인 사용자가 보호 페이지 접근
   */
  if (!accessToken && !isPublicRoute && !isOnboardingRoute) {
    const loginUrl = new URL(ROUTES.LOGIN, request.nextUrl.origin);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  /**
   * 2️⃣ 로그인 사용자가 login 페이지 접근
   */
  if (accessToken && pathname === ROUTES.LOGIN) {
    const homeUrl = new URL(ROUTES.MAIN, request.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }

  /**
   * 3️⃣ 나머지는 그대로 통과
   */
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};