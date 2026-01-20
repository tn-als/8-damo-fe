import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type Gender = "female" | "male" | null;

interface GenderFieldProps {
  value: Gender;
  onChange: (value: Gender) => void;
}

export function GenderField({ value, onChange }: GenderFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label className="text-lg font-bold text-foreground">성별</Label>
      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={() => onChange("female")}
          className={cn(
            "flex h-[54px] flex-1 items-center justify-center rounded-lg text-base font-semibold transition-colors",
            value === "female"
              ? "border-2 border-primary/50 bg-primary/15 text-primary"
              : "bg-muted text-foreground"
          )}
        >
          여성
        </button>
        <button
          type="button"
          onClick={() => onChange("male")}
          className={cn(
            "flex h-[54px] flex-1 items-center justify-center rounded-lg text-base font-semibold transition-colors",
            value === "male"
              ? "border-2 border-primary/50 bg-primary/15 text-primary"
              : "bg-muted text-foreground"
          )}
        >
          남성
        </button>
      </div>
    </div>
  );
}
