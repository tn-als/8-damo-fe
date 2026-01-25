import { redirect } from "next/navigation";
import { processKakaoOAuth } from "@/src/lib/actions/auth";
import { KakaoCallbackError } from "./kakao-callback-error";

interface KakaoCallbackPageProps {
  searchParams: Promise<{
    code?: string;
    error?: string;
    error_description?: string;
  }>;
}

export default async function KakaoCallbackPage({
  searchParams,
}: KakaoCallbackPageProps) {
  const params = await searchParams;
  const { code, error, error_description } = params;

  // 1. OAuth 자체 에러
  if (error) {
    const message = error_description
      ? `${error}: ${error_description}`
      : `오류: ${error}`;
    return <KakaoCallbackError message={message} />;
  }

  // 2. 인가 코드 없음
  if (!code) {
    return <KakaoCallbackError message="인가코드가 전달되지 않았습니다." />;
  }

  // 3. 백엔드 인증 처리
  const result = await processKakaoOAuth(code);

  if (!result.success) {
    return <KakaoCallbackError message={result.error} />;
  }

  // 4. 온보딩 상태에 따른 리디렉션
  switch (result.onboardingStep) {
    case "BASIC":
      redirect("/onboarding/basic");
    case "CHARACTERISTIC":
      redirect("/onboarding/characteristic");
    case "DONE":
      redirect("/");
  }
}
