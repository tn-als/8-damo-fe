"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GroupDetailHeaderContainer } from "@/src/components/groups/group-detail-header-container";
import { GroupDetailInformationContainer } from "@/src/components/groups/group-detail-information-container";
import { GroupDetailCreateDiningButton } from "@/src/components/groups/group-detail-create-dining-button";
import { getGroupDetail } from "@/src/lib/actions/groups";

interface GroupDetailState {
  name: string;
  introduction: string;
  participantsCount: number;
  isGroupLeader: boolean;
}

interface GroupDetailContentProps {
  groupId: string;
  diningSection: ReactNode;
}

export function GroupDetailContent({
  groupId,
  diningSection,
}: GroupDetailContentProps) {
  const router = useRouter();
  const [group, setGroup] = useState<GroupDetailState | null>(null);

  useEffect(() => {
    let isActive = true;

    const run = async () => {
      const result = await getGroupDetail(groupId);

      if (!isActive) return;

      if (!result.success) {
        console.error(
          "[GroupDetailContent] Failed to load group detail",
          result.error
        );
        setGroup(null);
        return;
      }

      setGroup(result.data ?? null);
    };

    run();

    return () => {
      isActive = false;
    };
  }, [groupId]);

  const handleBack = () => {
    router.push("/groups");
  };

  const handleMoreClick = () => {
    // TODO: 더보기 메뉴 열기
  };

  const handleCreateDining = () => {
    // TODO: 회식 생성 페이지로 이동
    router.push(`/groups/${groupId}/dining/create`);
  };

  const handleShareQR = () => {
    router.push(`/groups/${groupId}/qr-share`);
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-white">
      <GroupDetailHeaderContainer
        groupName={group?.name ?? ""}
        onBack={handleBack}
        onMoreClick={handleMoreClick}
      />

      {/* Header spacer */}
      <div className="h-14 sm:h-16" />

      <GroupDetailInformationContainer
        description={group?.introduction ?? ""}
        memberCount={group?.participantsCount ?? 0}
      />

      {diningSection}

      <GroupDetailCreateDiningButton
        onCreateDining={handleCreateDining}
        onShareQR={handleShareQR}
      />
    </div>
  );
}
