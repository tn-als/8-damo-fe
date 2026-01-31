import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_ROUTES } from '@/src/constants/routes';

export function proxy(request: NextRequest) {
  
  const { pathname, search } = request.nextUrl;
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