"use client";

import { GroupDetailHeader } from "@/components/groups/GroupDetailHeader";
import { Button } from "@/components/ui/button";
import { GroupDetailInformationSection } from "@/components/groups/GroupDetailInformationSection";
import { GroupDetailDiningSection } from "@/components/groups/GroupDetailDiningSection";
import { GroupDetailCreateDiningButton } from "@/components/groups/GroupDetailCreateDiningButton";

// Mock data - 실제로는 API에서 가져올 데이터
const mockGroupDetail = {
  id: "1",
  name: "그룹명",
  description: "그룹 소개글",
  memberCount: 10,
};

const mockDinings = [
  { id: "1", date: "2024-03-15", attendeeCount: 8, status: "ATTENDANCE_VOTING"},
  { id: "2", date: "2024-03-08", attendeeCount: 6, status: "RESTAURANT_VOTING" },
  { id: "3", date: "2024-03-01", attendeeCount: 7, status: "ATTENDANCE_VOTING" },
  { id: "4", date: "2024-03-01", attendeeCount: 7, status: "DINING_COMPLETED" },
];

interface GroupDetailPageProps {
  params: Promise<{ groupId: string }>;
}

export default function GroupDetailPage({ params }: GroupDetailPageProps) {

  // TODO: groupId를 사용하여 그룹 상세 정보 가져오기
  const group = mockGroupDetail;

  const handleMoreClick = () => {
    // TODO: 더보기 메뉴 열기
    console.log("More clicked");
  };
  
  const handleDiningClick = (diningId: string) => {
    // TODO: 회식 상세 페이지로 이동
    console.log("Dining clicked:", diningId);
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
        dinings={mockDinings}
        onDiningClick={handleDiningClick}
     />

      <GroupDetailCreateDiningButton/>

    </div>
  );
}
