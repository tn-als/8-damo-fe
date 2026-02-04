interface AttendanceVotePromptProps {
  diningDate: string;
}

export function AttendanceVotePrompt({
  diningDate,
}: AttendanceVotePromptProps) {
  return (
    <div className="flex w-full flex-col items-center gap-8 sm:gap-10">
      <p className="sr-only">회식 날짜 {diningDate}</p>
      <p className="text-center text-lg font-bold leading-7 text-[#333333] sm:text-[20px]">
        회식에 참석하시겠습니까?
      </p>
    </div>
  );
}
