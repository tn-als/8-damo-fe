import { OnboardingGuard } from "@/src/components/guards/OnboardingGuard";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OnboardingGuard>
      <div className="flex h-[100dvh] flex-col overflow-hidden">
        {/* 스크롤 영역 */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </OnboardingGuard>
  );
}
