import { cn } from "@/src/lib/utils";

interface NoPreferencesFieldProps {
  value: boolean;
  onChange?: (value: boolean) => void;
}

export function NoPreferencesField({
  value,
  onChange,
}: NoPreferencesFieldProps) {
  return (
    <button
      type="button"
      onClick={() => onChange?.(!value)}
      className={cn(
        "flex h-16 w-full items-center justify-center rounded-lg text-base font-semibold transition-colors",
        value
          ? "border-2 border-primary/50 bg-primary/15 text-primary"
          : "bg-muted text-foreground"
      )}
    >
      해당사항 없음
    </button>
  );
}
