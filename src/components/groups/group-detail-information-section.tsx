import { Users } from "lucide-react";

interface GroupDetailProps {
  description: string;
  memberCount: number;
}

export function GroupDetailInformationSection({
  description,
  memberCount,
}: GroupDetailProps) {
  return (
    <div className="flex flex-col gap-2.5 px-4 pb-4 sm:gap-3 sm:px-5 sm:pb-5">
      <p className="text-[15px] font-semibold leading-[21px] text-[#8e8e93] sm:text-base sm:leading-[22px]">
        {description}
      </p>
      <div className="flex items-center gap-1.5">
        <Users className="size-6 text-[#aeaeb2]" />
        <span className="text-[15px] font-semibold leading-[21px] text-[#404040] sm:text-base sm:leading-[22px]">
          {memberCount}명 참여 중
        </span>
      </div>
    </div>
  );
}
