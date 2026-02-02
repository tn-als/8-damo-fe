import { useUserStore, type OnboardingStatus } from '@/src/stores/user-store';

/**
 * 온보딩 단계 전이를 위한 훅
 * - Zustand 상태만 갱신하고, 실제 라우팅은 RouteGuard가 처리
 */
export function useCompleteOnboarding() {
  const { updateOnboardingStep } = useUserStore();

  /**
   * 다음 온보딩 단계로 전이
   * @param nextStep 다음 온보딩 상태
   */
  const advanceToNextStep = (nextStep: OnboardingStatus) => {
    updateOnboardingStep(nextStep);
  };

  return { advanceToNextStep };
}
