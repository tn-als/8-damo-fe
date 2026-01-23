import { Suspense } from "react";
import { KakaoCallbackContent } from "./kakao-callback-content";

export default function KakaoCallbackPage() {
  return (
    <Suspense>
      <KakaoCallbackContent />
    </Suspense>
  );
}