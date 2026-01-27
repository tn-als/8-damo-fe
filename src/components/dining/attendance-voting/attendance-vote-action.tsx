"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { cn } from "@/src/lib/utils";
import { type AttendanceVoteStatus } from "@/src/types/dining";

interface AttendanceVoteActionsProps {
  myVoteStatus: AttendanceVoteStatus;
  isSubmitting: boolean;
  onSubmit: (vote: "ATTEND" | "NON_ATTEND") => void;
}

export function AttendanceVoteActions({
  myVoteStatus,
  isSubmitting,
  onSubmit,
}: AttendanceVoteActionsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingVote, setPendingVote] = useState<"ATTEND" | "NON_ATTEND" | null>(
    null
  );

  const isDisabled = isSubmitting || myVoteStatus !== "PENDING";

  const baseButtonStyles =
    "h-16 flex-1 rounded-lg border-2 border-transparent text-[16px] font-semibold leading-[22px] transition-colors";
  const defaultButtonStyles = "bg-[#f2f2f7] text-[#404040]";
  const selectedButtonStyles =
    "bg-[rgba(255,141,40,0.15)] text-[#ff8d28] border-[rgba(255,141,40,0.5)]";

  const handleButtonClick = (vote: "ATTEND" | "NON_ATTEND") => {
    setPendingVote(vote);
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    if (pendingVote) {
      onSubmit(pendingVote);
      setIsDialogOpen(false);
      setPendingVote(null);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setPendingVote(null);
  };

  const dialogTitle =
    pendingVote === "ATTEND"
      ? "참석으로 응답하시겠습니까?"
      : "불참석으로 응답하시겠습니까?";

  return (
    <>
      <div className="flex w-full gap-2.5">
        <Button
          type="button"
          onClick={() => handleButtonClick("ATTEND")}
          disabled={isDisabled}
          className={cn(
            baseButtonStyles,
            myVoteStatus === "ATTEND"
              ? selectedButtonStyles
              : defaultButtonStyles
          )}
          aria-pressed={myVoteStatus === "ATTEND"}
        >
          참석
        </Button>
        <Button
          type="button"
          onClick={() => handleButtonClick("NON_ATTEND")}
          disabled={isDisabled}
          className={cn(
            baseButtonStyles,
            myVoteStatus === "NON_ATTEND"
              ? selectedButtonStyles
              : defaultButtonStyles
          )}
          aria-pressed={myVoteStatus === "NON_ATTEND"}
        >
          불참석
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
              응답 후에는 변경할 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              취소
            </Button>
            <Button
              type="button"
              onClick={handleConfirm}
              className="flex-1 bg-[#ff8d28] text-white hover:bg-[#ff8d28]/90"
            >
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
