'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore, OnboardingStatus } from '@/src/stores/user-store';
import { ROUTES } from '@/src/constants/routes';

interface OnboardingPageGuardProps {
  children: ReactNode;
  requiredStatus: Exclude<OnboardingStatus, 'DONE'>;
}

export function OnboardingPageGuard({
  children,
  requiredStatus,
}: OnboardingPageGuardProps) {
  const router = useRouter();
  const { user, isLoading, isInitialized } = useUserStore();

  useEffect(() => {
    if (!isInitialized || isLoading) return;

    // 인증되지 않은 사용자는 로그인으로
    if (!user) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    if (user.onboardingStep === 'DONE') {
      router.replace(ROUTES.MAIN);
      return;
    }

    if (user.onboardingStep !== requiredStatus) {
      const correctPath =
        user.onboardingStep === 'BASIC'
          ? ROUTES.ONBOARDING.BASIC
          : ROUTES.ONBOARDING.CHARACTERISTIC;
      router.replace(correctPath);
    }
  }, [user, isLoading, isInitialized, requiredStatus, router]);

  if (!isInitialized || isLoading) {
    return <OnboardingPageGuardSkeleton />;
  }

  // user가 null이면 로그인으로 리다이렉트 중
  if (!user) {
    return <OnboardingPageGuardSkeleton />;
  }

  if (user.onboardingStep === 'DONE' || user.onboardingStep !== requiredStatus) {
    return <OnboardingPageGuardSkeleton />;
  }

  return <>{children}</>;
}

function OnboardingPageGuardSkeleton() {
  return (
    <div className="flex h-[100dvh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}
