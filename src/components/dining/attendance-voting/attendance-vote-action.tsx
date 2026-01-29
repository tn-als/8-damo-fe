import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { type AttendanceVoteStatus } from "@/src/types/api/dining";

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
  const isDisabled = isSubmitting;

  const baseButtonStyles =
    "h-16 flex-1 rounded-lg border-2 border-transparent text-[16px] font-semibold leading-[22px] transition-colors";
  const defaultButtonStyles =
    "bg-[#f2f2f7] text-[#404040] hover:text-white";
  const selectedButtonStyles =
    "bg-[rgba(255,141,40,0.15)] text-[#ff8d28] border-[rgba(255,141,40,0.5)] hover:text-white";

  return (
    <div className="flex w-full gap-2.5">
      <Button
        type="button"
        onClick={() => onSubmit("ATTEND")}
        disabled={isDisabled}
        className={cn(
          baseButtonStyles,
          myVoteStatus === "ATTEND" ? selectedButtonStyles : defaultButtonStyles
        )}
        aria-pressed={myVoteStatus === "ATTEND"}
      >
        참석
      </Button>
      <Button
        type="button"
        onClick={() => onSubmit("NON_ATTEND")}
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
  );
}
