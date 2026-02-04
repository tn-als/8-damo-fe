"use client";

import { useUserStore } from "@/src/stores/user-store";
import {
  ProfileCard,
  ProfileCardSkeleton,
  ProfileCardError,
} from "@/src/components/mypage";
import { BottomNavigationBar } from "@/src/components/layout";

export default function MyPage() {
  const { user, isLoading } = useUserStore();

  return (
    <>
      <main className="flex min-h-screen flex-col gap-6 px-4 py-8 pb-24">
        <h1 className="text-xl font-bold">마이페이지</h1>

        {isLoading && <ProfileCardSkeleton />}

        {!isLoading && !user && <ProfileCardError />}

        {!isLoading && user && (
          <ProfileCard
            userId={user.userId}
            nickname={user.nickname ?? ""}
            gender={user.gender ?? ""}
            ageGroup={user.ageGroup ?? ""}
            imagePath={user.imagePath}
          />
        )}
      </main>
      <BottomNavigationBar />
    </>
  );
}
