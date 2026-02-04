import { Avatar } from "@/src/components/ui/avatar";
import { PROFILE_FALLBACK_IMAGE } from "@/src/constants/image";
import { cn } from "@/src/lib/utils";

interface ProfileCardErrorProps {
  className?: string;
}

export function ProfileCardError({ className }: ProfileCardErrorProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-2xl border border-border bg-card p-4",
        className
      )}
    >
      <Avatar
        src={null}
        alt="프로필"
        fallbackUrl={PROFILE_FALLBACK_IMAGE}
        size="lg"
      />
      <span className="text-sm text-muted-foreground">
        정보를 불러올 수 없습니다
      </span>
    </div>
  );
}
