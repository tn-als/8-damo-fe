"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STATUS_BADGE_CONFIG } from "@/src/constants/dining-status-badge";
import {
  DINING_DETAIL_MOCK_BY_ID,
  DINING_DETAIL_MOCK_LIST,
} from "@/src/constants/mock-data";
import {
  AttendanceVotingSection,
  CompleteSection,
  ConfirmedSection,
  DiningEventSection,
  DiningParticipantList,
  RestaurantVotingSection,
} from "@/src/components/dining";
import { Header } from "@/src/components/layout";
import { Badge } from "@/src/components/ui/badge";

interface DiningDetailComponentProps{
  groupId: string,
  diningId: string
}

export default function DiningDetailComponent({
  groupId,
  diningId,
}: DiningDetailComponentProps) {
  const router = useRouter();

  /** 목업 데이터 쓰기 */
  const numDiningId = Number(diningId);
  const numGroupId = Number(groupId);
  const dining =
    DINING_DETAIL_MOCK_BY_ID[numDiningId] ??
    DINING_DETAIL_MOCK_LIST.find((item) => item.groupId === numGroupId) ??
    DINING_DETAIL_MOCK_LIST[0];
  
  const date = dining.date.split(" ")[0];
  const myVoteStatus = "NON_ATTEND";

  const badgeConfig = STATUS_BADGE_CONFIG[dining.phase];

  const handleBack = () => {
    router.push(`/groups/${groupId}`);
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background">
      <Header
        title={date}
        showBackButton
        onBack={handleBack}
        rightElement={
          <Badge variant={badgeConfig.variant} size="dining">
            {badgeConfig.label}
          </Badge>
        }
      />

      <main className="flex flex-col gap-8 px-5 pb-12 pt-16">
        <DiningEventSection phase={dining.phase}>
          {dining.phase === "ATTENDANCE_VOTING" && (
            <AttendanceVotingSection
              progress={dining.progress}
              diningDate={date}
              myVoteStatus={myVoteStatus}
            />
          )}
          {dining.phase === "RESTAURANT_VOTING" && (
            <RestaurantVotingSection
              restaurants={[dining.restaurant]}
              voteSummary={dining.restaurantVotes}
              permissions={dining.permissions}
            />
          )}
          {dining.phase === "CONFIRMED" && (
            <ConfirmedSection
              restaurant={dining.restaurant}
              voteSummary={dining.restaurantVotes[0]}
            />
          )}
          {dining.phase === "COMPLETE" && (
            <CompleteSection
              restaurant={dining.restaurant}
              voteSummary={dining.restaurantVotes[0]}
              reviewStatus={dining.reviewStatus}
            />
          )}
        </DiningEventSection>

        <DiningParticipantList participants={dining.participants} />
      </main>
    </div>
  );
}