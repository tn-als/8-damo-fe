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
  console.log(groupId);
  const numericGroupId = Number(groupId);
  // const numericGroupId = 0;
  const group = GROUP_DETAIL_MOCK_BY_ID[numericGroupId] ?? GROUP_DETAIL_MOCK_BY_ID[1];
  const dinings = GROUP_DININGS_MOCK_BY_GROUP_ID[numericGroupId] ?? [];

  console.log(dinings);

  const handleMoreClick = () => {
    // TODO: 더보기 메뉴 열기
    console.log("More clicked");
  };

  const handleDiningClick = (diningId: string) => {
    // TODO: 회식 상세 페이지로 이동
    console.log("Dining clicked:", diningId);
    router.push(`${groupId}/dining/${diningId}`);
  };

    return (
    <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-background">
      <GroupDetailHeader
        groupName={group.name}
        onMoreClick={handleMoreClick}
      />

     <GroupDetailInformationSection
        description={group.description}
        memberCount={group.memberCount}
     />

     <GroupDetailDiningSection
        dinings={dinings}
        onDiningClick={handleDiningClick}
     />

      <GroupDetailCreateDiningButton/>

    </div>
  );

}
