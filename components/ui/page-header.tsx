import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  onBack?: () => void;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  onBack,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-5 px-5 pt-10", className)}>
      {onBack && (
        <button
          onClick={onBack}
          className="flex size-6 items-center justify-center text-muted-foreground"
          aria-label="뒤로 가기"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold leading-8 text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-base font-semibold leading-[22px] text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
