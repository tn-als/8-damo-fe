import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_ROUTES, isPublicRoute } from '@/src/constants/routes';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!refreshToken) {
    const loginUrl = new URL(PUBLIC_ROUTES.LOGIN, request.nextUrl.origin);
    loginUrl.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};