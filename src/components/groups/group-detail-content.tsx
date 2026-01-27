"use client";

import { useRouter } from "next/navigation";
import {
  GROUP_DETAIL_MOCK_BY_ID,
  GROUP_DININGS_MOCK_BY_GROUP_ID,
} from "@/src/constants/mock-data";
import { GroupDetailHeader } from "@/src/components/groups/group-detail-header";
import { GroupDetailInformationSection } from "@/src/components/groups/group-detail-information-section";
import { GroupDetailDiningSection } from "@/src/components/groups/group-detail-dining-section";
import { GroupDetailCreateDiningButton } from "@/src/components/groups/group-detail-create-dining-button";

export function GroupDetailContent({ groupId }: { groupId: string }) {
  const router = useRouter();
  const numericGroupId = Number(groupId);
  const group =
    GROUP_DETAIL_MOCK_BY_ID[numericGroupId] ?? GROUP_DETAIL_MOCK_BY_ID[1];
  const dinings = GROUP_DININGS_MOCK_BY_GROUP_ID[numericGroupId] ?? [];

  const handleBack = () => {
    router.push("/groups");
  };

  const handleMoreClick = () => {
    // TODO: 더보기 메뉴 열기
  };

  const handleDiningClick = (diningId: string) => {
    router.push(`${groupId}/dining/${diningId}`);
  };

  const handleCreateDining = () => {
    // TODO: 회식 생성 페이지로 이동
    router.push(`/groups/${groupId}/dining/create`);
  };

  const handleShareQR = () => {
    // TODO: QR 공유 기능
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-white">
      <GroupDetailHeader groupName={group.name} onBack={handleBack} onMoreClick={handleMoreClick} />

      <GroupDetailInformationSection
        description={group.description}
        memberCount={group.memberCount}
      />

      <GroupDetailDiningSection
        dinings={dinings}
        onDiningClick={handleDiningClick}
      />

      <GroupDetailCreateDiningButton
        onCreateDining={handleCreateDining}
        onShareQR={handleShareQR}
      />
    </div>
  );
}
