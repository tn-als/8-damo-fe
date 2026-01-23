"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { AlertTriangle, LoaderCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { EmptyState } from "@/src/components/ui/empty-state";
import { PageHeader } from "@/src/components/ui/page-header";

type OnboardingStatus = "BASIC" | "CHARACTERISTIC" | "DONE";

type State = 
    | { status: "loading"}
    | { status: "error"; message: string}

export function KakaoCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const [state, setState] = useState<State>({ status: "loading"});

  useEffect(() => {

    // 1. oauth 자체 에러 
    if (error) {
        setState({
          status: "error", 
          message: errorDescription
          ? `${error}: ${errorDescription}`
          : `오류: ${error}`
        });
        return;
    }

    // 2. 인가 코드 없음 
    if(!code){
      setState({
        status: "error", 
        message: "인가코드가 전달되지 않았습니다.",
      });
      return;
    }

    // 3. 정상 흐름 
    const run = async () => {
      try{
        const response = await axios.post(
          "/api/v1/auth/oauth",
          { code}, 
          {withCredentials: true}
        );

        const onboardingStatus =
          response.data?.data?.onboardingStatus as OnboardingStatus;

        switch (onboardingStatus){
          case "BASIC":
            router.replace("/onboarding/basic");
            return;
          case "CHARACTERISTIC":
            router.replace("/onboarding/characteristic");
            return;
          case "DONE":
            router.replace("/");
            return;
          default:
            throw new Error("알 수 없는 온보딩 상태입니다.");
        }
      } catch (e) {
        const message = 
          axios.isAxiosError(e)
            ? e.response?.data?.errorMessage || e.message
            : e instanceof Error 
              ? e.message
              : "요청에 실패했습니다.";
        setState({ status: "error", message});
      }
    };

    run();
  }, [code, error, errorDescription, router]);

    return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background px-4 sm:px-0">
      <PageHeader
        title="카카오 로그인 처리"
        subtitle="인가 코드를 확인 중입니다."
      />

      <main className="flex flex-1 flex-col px-5 pb-10 pt-6">
        {state.status === "loading" && (
          <EmptyState
            icon={LoaderCircle}
            title="로그인 처리 중"
            description="카카오 로그인 정보를 확인하고 있어요."
            className="py-10"
          />
        )}

        {state.status === "error" && (
          <EmptyState
            icon={AlertTriangle}
            title="로그인 실패"
            description={state.message}
            action={
              <Button variant="kakao" onClick={() => router.replace("/login")}>
                다시 로그인하기
              </Button>
            }
            className="py-10"
          />
        )}
      </main>
    </div>
  );
}