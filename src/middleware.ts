import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  /**
   * 모든 사용자가 메인 페이지에 바로 접근 가능
   */
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};