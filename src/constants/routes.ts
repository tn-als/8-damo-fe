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

export const PUBLIC_ROUTES = [ROUTES.LOGIN, ROUTES.KAKAO_CALLBACK] as const;

export const ONBOARDING_ROUTES = [
  ROUTES.ONBOARDING.BASIC,
  ROUTES.ONBOARDING.CHARACTERISTIC,
] as const;
