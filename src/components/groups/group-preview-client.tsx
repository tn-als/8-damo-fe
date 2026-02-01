"use client";

import { Header } from "@/src/components/layout";
import { GroupJoinPreviewPageContent } from "@/src/components/groups/group-join-preview-page-content";
import { LoginButton } from "@/src/components/login/login-button";
import { useRouter } from "next/navigation";

interface GroupPreviewClientProps {
  groupId: string;
  isAuthenticated: boolean;
}

export default function GroupPreviewClient({
  groupId,
  isAuthenticated,
}: GroupPreviewClientProps) {
  const router = useRouter();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-4">
    
      {/* 비로그인 시 상단 오버레이 */}
      {!isAuthenticated && (
        <>
        <Header title="그룹 참여" showBackButton={false} />
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[160px]">
          <div className="w-full max-w-md rounded-2xl bg-white px-8 py-10 shadow-xl">
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-xl font-semibold">
                로그인하고 그룹에 참여하세요
              </h2>

              <p className="text-sm leading-relaxed text-gray-600">
                이 그룹에 참여하려면 로그인이 필요합니다.
                <br />
                로그인 후 바로 참여할 수 있어요.
              </p>

              <LoginButton className="h-14 w-full px-6 text-base font-medium" />
            </div>
          </div>
        </div>
        </>
      )}

      {isAuthenticated &&(
        <>
        <Header title="그룹 참여" onBack={() => router.push("/groups")} />
        <GroupJoinPreviewPageContent groupId={groupId} />
        </>
      )}

    </main>
  );
}
