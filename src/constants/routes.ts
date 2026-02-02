export const ROUTES = {
  LOGIN: '/login',
  LOGIN_TEST: '/login-test',
  KAKAO_CALLBACK: '/kakao/callback',
  ONBOARDING: {
    BASIC: '/onboarding/basic',
    CHARACTERISTIC: '/onboarding/characteristic',
  },
  MAIN: '/',
  GROUPS: '/groups',
  GROUP_PREVIEW: '/groups/preview',
} as const;

export const PUBLIC_ROUTES = {
  LOGIN: ROUTES.LOGIN,
  LOGIN_TEST: ROUTES.LOGIN_TEST,
  KAKAO: ROUTES.KAKAO_CALLBACK,
  GROUP_PREVIEW: ROUTES.GROUP_PREVIEW,
};

const PUBLIC_ROUTE_VALUES = Object.values(PUBLIC_ROUTES);

export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTE_VALUES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}