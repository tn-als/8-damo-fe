"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { EmptyState } from "@/src/components/ui/empty-state";
import { PageHeader } from "@/src/components/ui/page-header";
import { processKakaoOAuth } from "@/src/lib/api/client/auth";
import { getMe } from "@/src/lib/api/client/user";
import { KakaoCallbackError } from "./kakao-callback-error";
import { useUserStore } from "@/src/stores/user-store";
import { useRouter } from "next/navigation";

interface KakaoCallbackContentProps {
  code: string;
  redirectPath?: string;
}

function normalizeRedirectPath(path?: string): string | null {
  if (!path) return null;
  return path.startsWith("/") ? path : null;
}

export function KakaoCallbackContent({
  code,
  redirectPath,
}: KakaoCallbackContentProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUserStore();

  useEffect(() => {
    const run = async () => {
      try {
        await processKakaoOAuth(code);

        // OAuth 성공 후 getMe로 사용자 정보 조회하여 setUser
        // RouteGuard가 user 상태 변경을 감지하여 자동으로 리다이렉트 처리
        const meResult = await getMe();
        if (meResult.data) {
          setUser(meResult.data);
          const fallbackUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "/";
          const nextPath = normalizeRedirectPath(redirectPath);
          window.location.replace(nextPath ?? fallbackUrl);
        } else {
          setError("사용자 정보를 불러올 수 없습니다.");
        }
      } catch {
        setError("카카오 로그인 처리 중 오류가 발생했습니다.");
      }
    };

    run();
  }, [code, redirectPath, setUser]);

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
