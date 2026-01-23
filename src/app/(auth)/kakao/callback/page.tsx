"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { AlertTriangle, LoaderCircle } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { EmptyState } from "@/src/components/ui/empty-state";
import { PageHeader } from "@/src/components/ui/page-header";

type RequestStatus = "idle" | "loading" | "success" | "error";

type OnboardingStatus = "BASIC" | "CHARACTERISTIC" | "DONE";

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [responseBody, setResponseBody] = useState("");
  const lastRequestKeyRef = useRef<string | null>(null);

  const requestBody = useMemo(() => {
    return code ? JSON.stringify({ code }, null, 2) : "";
  }, [code]);

  useEffect(() => {
    if (error) {
      setStatus("error");
      setErrorMessage(
        errorDescription ? `${error}: ${errorDescription}` : `오류: ${error}`
      );
      return;
    }

    if (!code) {
      setStatus("error");
      setErrorMessage("인가 코드가 전달되지 않았습니다.");
      return;
    }

    if (lastRequestKeyRef.current === code) {
      return;
    }
    lastRequestKeyRef.current = code;

    const sendCode = async () => {
      setStatus("loading");
      setErrorMessage("");
      setResponseBody("");

      try {
        const response = await axios.post(
          "/api/v1/auth/oauth",
          { code },
          { withCredentials: true }
        );

        const onboardingStatus =
          response.data?.data?.onboardingStatus as OnboardingStatus | undefined;

        if (onboardingStatus === "BASIC") {
          router.replace("/onboarding/basic");
          return;
        }
        if (onboardingStatus === "CHARACTERISTIC") {
          router.replace("/onboarding/characteristic");
          return;
        }
        if (onboardingStatus === "DONE") {
          router.replace("/");
          return;
        }

        setResponseBody(JSON.stringify(response.data, null, 2));
        setStatus("success");
      } catch (requestError) {
        const message =
          axios.isAxiosError(requestError)
            ? requestError.response?.data?.errorMessage || requestError.message
            : requestError instanceof Error
              ? requestError.message
              : "요청에 실패했습니다.";

        setStatus("error");
        setErrorMessage(message || "요청에 실패했습니다.");
      }
    };

    sendCode();
  }, [code, error, errorDescription, router]);

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background px-4 sm:px-0">
      <PageHeader
        title="카카오 로그인 처리"
        subtitle="인가 코드를 확인 중입니다."
      />
      <main className="flex flex-1 flex-col px-5 pb-10 pt-6">
        {status === "loading" && (
          <EmptyState
            icon={LoaderCircle}
            title="로그인 처리 중"
            description="카카오 로그인 정보를 확인하고 있어요."
            className="py-10"
          />
        )}

        {status === "error" && (
          <EmptyState
            icon={AlertTriangle}
            title="로그인 실패"
            description={errorMessage}
            action={
              <Button
                variant="kakao"
                onClick={() => router.replace("/login")}
              >
                다시 로그인하기
              </Button>
            }
            className="py-10"
          />
        )}

        {status === "success" && (
          <div className="rounded-xl border border-border bg-card p-4 text-sm text-foreground">
            <p className="mb-3 text-sm font-semibold">응답 확인</p>
            <pre className="whitespace-pre-wrap break-all text-xs text-muted-foreground">
              {responseBody || requestBody}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
