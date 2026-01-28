"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { GROUP_DETAIL_MOCK_BY_ID } from "@/src/constants/mock-data";
import { GroupDetailHeader } from "@/src/components/groups/group-detail-header";
import { GroupDetailInformationSection } from "@/src/components/groups/group-detail-information-section";
import { GroupDetailCreateDiningButton } from "@/src/components/groups/group-detail-create-dining-button";

interface GroupDetailContentProps {
  groupId: string;
  diningSection: ReactNode;
}

export function GroupDetailContent({
  groupId,
  diningSection,
}: GroupDetailContentProps) {
  const router = useRouter();
  const numericGroupId = Number(groupId);
  const group =
    GROUP_DETAIL_MOCK_BY_ID[numericGroupId] ?? GROUP_DETAIL_MOCK_BY_ID[1];

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
      <GroupDetailHeader
        groupName={group.name}
        onBack={handleBack}
        onMoreClick={handleMoreClick}
      />

      {/* Header spacer */}
      <div className="h-14 sm:h-16" />

      <GroupDetailInformationSection
        description={group.description}
        memberCount={group.memberCount}
      />

      {diningSection}

      <GroupDetailCreateDiningButton
        onCreateDining={handleCreateDining}
        onShareQR={handleShareQR}
      />
    </div>
  );
}
