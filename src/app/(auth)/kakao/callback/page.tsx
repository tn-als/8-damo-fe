import { KakaoCallbackContent } from "./kakao-callback-content";
import { KakaoCallbackError } from "./kakao-callback-error";

interface KakaoCallbackPageProps {
  searchParams: Promise<{
    code?: string;
    error?: string;
    error_description?: string;
    state?: string;
  }>;
}

export default async function KakaoCallbackPage({
  searchParams,
}: KakaoCallbackPageProps) {
  const params = await searchParams;
  const { code, error, error_description, state } = params;

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

  // 3. 클라이언트 컴포넌트에서 서버 액션 호출
  return <KakaoCallbackContent code={code} redirectPath={state} />;
}
