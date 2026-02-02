'use client';

import { OnboardingPageGuard } from '@/src/components/guards/OnboardingPageGuard';

export default function BasicOnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnboardingPageGuard requiredStatus="BASIC">{children}</OnboardingPageGuard>
  );
}
