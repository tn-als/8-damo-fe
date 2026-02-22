import { Avatar } from "@/src/components/ui/avatar";

interface ParticipantAvatarProps {
  src?: string | null;
  nickname: string;
}

export function ParticipantAvatar({ src, nickname }: ParticipantAvatarProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#f7f7fa] px-3 py-2">
      <Avatar
        src={src}
        alt={nickname}
        fallbackText={nickname}
        size="sm"
        shape="circle"
        showBorder={false}
        className="bg-[#ffd9b3] text-[#9a4c00]"
      />
      <span className="text-sm font-medium text-[#1f2937]">{nickname}</span>
    </div>
  );
}
