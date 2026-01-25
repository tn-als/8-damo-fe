"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { EmptyState } from "@/src/components/ui/empty-state";
import { PageHeader } from "@/src/components/ui/page-header";

interface KakaoCallbackErrorProps {
  message: string;
}

export function KakaoCallbackError({ message }: KakaoCallbackErrorProps) {
  const router = useRouter();

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background px-4 sm:px-0">
      <PageHeader
        title="카카오 로그인 처리"
        subtitle="로그인 중 문제가 발생했습니다."
      />

      <main className="flex flex-1 flex-col px-5 pb-10 pt-6">
        <EmptyState
          icon={AlertTriangle}
          title="로그인 실패"
          description={message}
          action={
            <Button variant="kakao" onClick={() => router.replace("/login")}>
              다시 로그인하기
            </Button>
          }
          className="py-10"
        />
      </main>
    </div>
  );
}
