import { NextRequest, NextResponse } from 'next/server';
import { ROUTES } from '@/src/constants/routes';

const PUBLIC_ROUTES = ['/login', '/onboarding'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // ❌ 비로그인 + 보호 페이지 접근
  if (!accessToken && !isPublicRoute) {
    const loginUrl = new URL(ROUTES.LOGIN, request.nextUrl.origin);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ❌ 로그인 상태인데 login 페이지 접근
  if (accessToken && isPublicRoute) {
    const homeUrl = new URL(ROUTES.MAIN, request.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/groups/:path*', '/login'],
};