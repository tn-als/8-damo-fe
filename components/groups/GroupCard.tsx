import { cn } from "@/lib/utils";

interface GroupCardProps {
  id: string;
  name: string;
  description?: string;
  meetingCount?: number;
  imageUrl?: string;
  status?: string;
  className?: string;
}

export function GroupCard({
  name,
  description,
  meetingCount = 0,
  imageUrl,
  status = "활성",
  className,
}: GroupCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-5 rounded-2xl border border-border bg-card p-6",
        className
      )}
    >
      {/* 그룹 이미지 */}
      <div className="size-20 shrink-0 overflow-hidden rounded-full border-2 border-muted-foreground/30 bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${name} 그룹 이미지`}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <svg
              className="size-8 text-muted-foreground/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* 그룹 정보 */}
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="text-xl font-bold leading-tight text-foreground">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <p className="text-sm text-muted-foreground">
          이번 달 회식 {meetingCount}회
        </p>
      </div>

      {/* 상태 배지 */}
      <div className="shrink-0 rounded-full bg-muted px-4 py-2">
        <span className="text-sm font-medium text-foreground">{status}</span>
      </div>
    </div>
  );
}
