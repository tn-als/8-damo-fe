'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUserStore } from '@/src/stores/user-store';
import { getRedirectPath, isGuardBypassRoute } from '@/src/lib/route-guard/route-access';

const RETURN_URL_KEY = 'returnUrl';

interface RouteGuardProps {
  children: ReactNode;
}

function getAndClearReturnUrl(): string | null {
  if (typeof window === 'undefined') return null;

  const returnUrl = sessionStorage.getItem(RETURN_URL_KEY);
  sessionStorage.removeItem(RETURN_URL_KEY);

  if (!returnUrl) return null;

  // 보안: 내부 URL만 허용 (외부 URL 방지)
  if (!returnUrl.startsWith('/')) return null;

  return returnUrl;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isInitialized } = useUserStore();

  useEffect(() => {
    // 초기화 전이면 대기
    if (!isInitialized) return;

    // 예외 경로는 Guard 검사 건너뜀
    if (isGuardBypassRoute(pathname)) return;

    // DONE 상태이고 returnUrl이 있으면 해당 URL로 이동
    if (user?.onboardingStep === 'DONE') {
      const returnUrl = getAndClearReturnUrl();
      if (returnUrl && pathname !== returnUrl) {
        router.replace(returnUrl);
        return;
      }
    }

    // 리다이렉트가 필요한지 확인
    const redirectPath = getRedirectPath(pathname, user);
    if (redirectPath) {
      router.replace(redirectPath);
    }
  }, [pathname, user, isInitialized, router]);

  // 초기화 전이면 로딩 표시
  if (!isInitialized) {
    return <RouteGuardSkeleton />;
  }

  // 예외 경로는 즉시 렌더링
  if (isGuardBypassRoute(pathname)) {
    return <>{children}</>;
  }

  // 리다이렉트가 필요하면 로딩 표시
  const redirectPath = getRedirectPath(pathname, user);
  if (redirectPath) {
    return <RouteGuardSkeleton />;
  }

  return <>{children}</>;
}

function RouteGuardSkeleton() {
  return (
    <div className="flex h-[100dvh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}
