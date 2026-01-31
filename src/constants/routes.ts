export const ROUTES = {
  LOGIN: '/login',
  KAKAO_CALLBACK: '/kakao/callback',
  ONBOARDING: {
    BASIC: '/onboarding/basic',
    CHARACTERISTIC: '/onboarding/characteristic',
  },
  MAIN: '/',
  GROUPS: '/groups',
} as const;

export const PUBLIC_ROUTES = {
  LOGIN: ROUTES.LOGIN,
  KAKAO: ROUTES.KAKAO_CALLBACK
};

const PUBLIC_ROUTE_VALUES = Object.values(PUBLIC_ROUTES);

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTE_VALUES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}