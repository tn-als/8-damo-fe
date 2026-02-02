'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore, OnboardingStatus } from '@/src/stores/user-store';
import { ROUTES } from '@/src/constants/routes';

interface OnboardingGuardProps {
  children: ReactNode;
}

const ONBOARDING_REDIRECT_MAP: Record<
  Exclude<OnboardingStatus, 'DONE'>,
  string
> = {
  BASIC: ROUTES.ONBOARDING.BASIC,
  CHARACTERISTIC: ROUTES.ONBOARDING.CHARACTERISTIC,
};

export function OnboardingGuard({ children }: OnboardingGuardProps) {
  const router = useRouter();
  const { user, isLoading, isInitialized } = useUserStore();

  useEffect(() => {
    if (!isInitialized || isLoading) return;

    // 인증되지 않은 사용자는 로그인으로
    if (!user) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    if (user.onboardingStep === 'DONE') return;

    const redirectPath = ONBOARDING_REDIRECT_MAP[user.onboardingStep];
    if (redirectPath) {
      router.replace(redirectPath);
    }
  }, [user, isLoading, isInitialized, router]);

  if (!isInitialized || isLoading) {
    return <OnboardingGuardSkeleton />;
  }

  // user가 null이면 로그인으로 리다이렉트 중
  if (!user) {
    return <OnboardingGuardSkeleton />;
  }

  if (user.onboardingStep !== 'DONE') {
    return <OnboardingGuardSkeleton />;
  }

  return <>{children}</>;
}

function OnboardingGuardSkeleton() {
  return (
    <div className="flex h-[100dvh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}
