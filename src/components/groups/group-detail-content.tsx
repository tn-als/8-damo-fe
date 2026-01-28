"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { GROUP_DETAIL_MOCK_BY_ID } from "@/src/constants/mock-data";
import { GroupDetailHeader } from "@/src/components/groups/group-detail-header";
import { GroupDetailInformationSection } from "@/src/components/groups/group-detail-information-section";
import { GroupDetailDiningSection } from "@/src/components/groups/group-detail-dining-section";
import { GroupDetailCreateDiningButton } from "@/src/components/groups/group-detail-create-dining-button";
import type { DiningStatus, DiningSummary } from "@/src/types/api/dining";
import { getGroupDiningSummaries } from "@/src/lib/actions/dining";

interface GroupDetailContentProps {
  groupId: string;
  status: DiningStatus;
  onStatusChange: (status: DiningStatus) => void;
}

export function GroupDetailContent({
  groupId,
  status,
  onStatusChange,
}: GroupDetailContentProps) {
  const router = useRouter();
  const numericGroupId = Number(groupId);
  const group =
    GROUP_DETAIL_MOCK_BY_ID[numericGroupId] ?? GROUP_DETAIL_MOCK_BY_ID[1];
  const {
    data: dinings = [],
    error,
  } = useQuery<DiningSummary[]>({
    queryKey: ["groupDiningSummaries", groupId, status],
    queryFn: async () => {
      const result = await getGroupDiningSummaries(groupId, status);

      if (!result.success) {
        throw new Error(result.error ?? "회식 목록을 불러오지 못했습니다.");
      }

      return result.data ?? [];
    },
  });

  useEffect(() => {
    if (!error) return;
    console.error("[GroupDetailContent] Failed to load dining summaries", error);
  }, [error]);

  const handleBack = () => {
    router.push("/groups");
  };

  const handleMoreClick = () => {
    // TODO: 더보기 메뉴 열기
  };

  const handleDiningClick = (diningId: string) => {
    router.push(`/groups/${groupId}/dining/${diningId}`);
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

      <GroupDetailDiningSection
        dinings={dinings}
        status={status}
        onStatusChange={onStatusChange}
        onDiningClick={handleDiningClick}
      />

      <GroupDetailCreateDiningButton
        onCreateDining={handleCreateDining}
        onShareQR={handleShareQR}
      />
    </div>
  );
}
