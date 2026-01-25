import { LoaderCircle } from "lucide-react";
import { EmptyState } from "@/src/components/ui/empty-state";
import { PageHeader } from "@/src/components/ui/page-header";

export default function KakaoCallbackLoading() {
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
