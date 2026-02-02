'use client';

import { OnboardingPageGuard } from '@/src/components/guards/OnboardingPageGuard';

export default function CharacteristicOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingPageGuard requiredStatus="CHARACTERISTIC">
      {children}
    </OnboardingPageGuard>
  );
}
