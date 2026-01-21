import { cn } from "@/src/lib/utils";

interface SelectableTagProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SelectableTag({
  label,
  selected = false,
  onClick,
  className,
}: SelectableTagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-[54px] w-[120px] items-center justify-center rounded-lg text-base font-semibold transition-colors",
        selected
          ? "border-2 border-primary/50 bg-primary/15 text-primary"
          : "bg-muted text-foreground",
        className
      )}
    >
      {label}
    </button>
  );
}
