"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { BasicInfoForm } from "@/src/components/onboarding/basic/basic-info-form";
import { CharacteristicsForm } from "@/src/components/onboarding/characteristics";
import { Button } from "@/src/components/ui/button";
import { EmptyState } from "@/src/components/ui/empty-state";
import { PageHeader } from "@/src/components/ui/page-header";

type OnboardingStep = "basic" | "characteristic";

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = (searchParams.get("step") || "").toLowerCase() as OnboardingStep;

  const header = useMemo(() => {
    if (step === "basic") {
      return {
        title: "기본 정보 입력",
        subtitle: undefined,
      };
    }

    if (step === "characteristic") {
      return {
        title: (
          <>
            아래 해당하는 상태가 있다면
            <br />
            선택해 주세요.
          </>
        ),
        subtitle: (
          <>
            알레르기가 있거나 선호하는 음식이 있다면 피해서
            <br />
            추천해 드릴게요.
          </>
        ),
      };
    }

    return null;
  }, [step]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background px-4 sm:px-0">
      {header ? (
        <>
          <PageHeader title={header.title} subtitle={header.subtitle} />
          <main className="flex flex-1 flex-col px-5 pb-10 pt-6">
            {step === "basic" && <BasicInfoForm />}
            {step === "characteristic" && (
              <CharacteristicsForm onSubmit={() => router.replace("/")} />
            )}
          </main>
        </>
      ) : (
        <main className="flex min-h-screen flex-col items-center justify-center px-5">
          <EmptyState
            icon={AlertTriangle}
            title="잘못된 접근"
            description="올바르지 않은 온보딩 단계입니다."
            action={
              <Button onClick={() => router.replace("/login")}>
                로그인으로 돌아가기
              </Button>
            }
          />
        </main>
      )}
    </div>
  );
}
