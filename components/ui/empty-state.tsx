import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 py-16 sm:px-5 sm:py-20",
        className
      )}
    >
      {Icon && (
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted sm:size-20">
          <Icon className="size-8 text-muted-foreground sm:size-10" />
        </div>
      )}

      {title && (
        <h3 className="mb-2 text-lg font-semibold text-foreground sm:text-xl">
          {title}
        </h3>
      )}

      <p className="text-center text-sm text-muted-foreground sm:text-base">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
