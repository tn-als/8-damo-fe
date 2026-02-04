"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GroupJoinPreviewSection } from "./group-join-preview-section";
import { getGroupDetail, joinGroup } from "@/src/lib/actions/groups";
import type { GroupSummary } from "@/src/types/groups";

interface GroupJoinPreviewPageContentProps {
  groupId: string;
}

export function GroupJoinPreviewPageContent({
  groupId,
}: GroupJoinPreviewPageContentProps) {
  const router = useRouter();
  const [group, setGroup] = useState<GroupSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    let isActive = true;

    const run = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      const result = await getGroupDetail(groupId);

      if (!isActive) return;

      if (!result.success || !result.data) {
        setGroup(null);
        setErrorMessage(result.error ?? "그룹 정보를 불러오지 못했습니다.");
        setIsLoading(false);
        return;
      }

      setGroup({
        id: groupId,
        name: result.data.name,
        introduction: result.data.introduction,
      });
      setIsLoading(false);
    };

    run();

    return () => {
      isActive = false;
    };
  }, [groupId]);

  const handleRescan = () => {
    router.push("/groups/join");
  };

  const handleJoin = async () => {
    if (!group) return;

    setIsJoining(true);

    const result = await joinGroup(groupId);

    if (!result.success) {
      toast.error(result.error ?? "그룹 참여에 실패했습니다. 다시 시도해주세요.");
      setIsJoining(false);
      return;
    }

    toast.success(`${group.name} 그룹에 참여했습니다!`);
    router.push(`/groups/${groupId}`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 sm:px-6">
        <p className="text-sm text-muted-foreground">그룹 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 sm:px-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-base font-medium text-destructive">
            {errorMessage ?? "존재하지 않는 그룹입니다. QR 코드를 확인해주세요."}
          </p>
        </div>
        <button
          onClick={handleRescan}
          className="text-sm font-medium text-primary underline"
        >
          다시 스캔하기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-center py-6 sm:py-8">
      <GroupJoinPreviewSection
        group={group}
        onJoinClick={handleJoin}
        onRescan={handleRescan}
        isLoading={isJoining}
      />
    </div>
  );
}
