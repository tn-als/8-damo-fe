"use client";

import { Users } from "lucide-react";
import { Button } from "../../ui/button";
import { GroupSummary } from "@/src/types/groups";

interface GroupJoinPreviewSectionProps {
  group: GroupSummary;
  onJoinClick: () => void;
  onRescan: () => void;
  isLoading?: boolean;
}

export function GroupJoinPreviewSection({
  group,
  onJoinClick,
  onRescan,
  isLoading = false,
}: GroupJoinPreviewSectionProps) {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-6 sm:px-6 sm:py-8">
      {/* 그룹 이미지 */}
      <div className="relative size-20 overflow-hidden rounded-2xl bg-muted sm:size-24">
        <div className="flex items-center justify-center w-full h-full">
            <Users className="size-9 text-muted-foreground sm:size-10" />
        </div>
      </div>

      {/* 그룹 정보 */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-lg font-bold text-foreground sm:text-xl">{group.name}</h2>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {group.diningCountPerMonth != null && (
            <span>이번달 회식 횟수 {group.diningCountPerMonth}회</span>
            )}
        </div>
        </div>


      {/* 안내 텍스트 */}
      <p className="text-sm text-muted-foreground text-center">
        이 그룹이 맞나요?
      </p>

      {/* 액션 버튼 */}
      <div className="flex w-full flex-col gap-3">
        <Button
          onClick={onJoinClick}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "확인 중..." : "참여하기"}
        </Button>
        <Button
          variant="outline"
          onClick={onRescan}
          disabled={isLoading}
          className="w-full"
        >
          다시 스캔
        </Button>
      </div>
    </div>
  );
}
