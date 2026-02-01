"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { EmptyState } from "@/src/components/ui/empty-state";
import { PageHeader } from "@/src/components/ui/page-header";
import { processKakaoOAuth } from "@/src/lib/actions/auth";
import { KakaoCallbackError } from "./kakao-callback-error";

interface KakaoCallbackContentProps {
  code: string;
}

const RETURN_URL_KEY = "returnUrl";

function getAndClearReturnUrl(): string | null {
  if (typeof window === "undefined") return null;

  const returnUrl = sessionStorage.getItem(RETURN_URL_KEY);
  sessionStorage.removeItem(RETURN_URL_KEY);

  if (!returnUrl) return null;

  // 보안: 내부 URL만 허용 (외부 URL 방지)
  if (!returnUrl.startsWith("/")) return null;

  return returnUrl;
}

export function KakaoCallbackContent({ code }: KakaoCallbackContentProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const result = await processKakaoOAuth(code);

      if (!result.success) {
        setError(result.error);
        return;
      }

      switch (result.onboardingStep) {
        case "BASIC":
          router.replace("/onboarding/basic");
          return;
        case "CHARACTERISTIC":
          router.replace("/onboarding/characteristic");
          return;
        case "DONE": {
          const returnUrl = getAndClearReturnUrl();
          router.replace(returnUrl ?? "/");
          return;
        }
      }
    };

    run();
  }, [code, router]);

  if (error) {
    return <KakaoCallbackError message={error} />;
  }

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background px-4 sm:px-0">
      <PageHeader
        title="카카오 로그인 처리"
        subtitle="인가 코드를 확인 중입니다."
      />

      <main className="flex flex-1 flex-col px-5 pb-10 pt-6">
        <EmptyState
          icon={LoaderCircle}
          title="로그인 처리 중"
          description="카카오 로그인 정보를 확인하고 있어요."
          className="py-10"
        />
      </main>
    </div>
  );
}
