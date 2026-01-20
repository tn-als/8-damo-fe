import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const AGE_GROUPS = [
  { value: "10s", label: "10대" },
  { value: "20s", label: "20대" },
  { value: "30s", label: "30대" },
  { value: "40s", label: "40대" },
  { value: "50s", label: "50대" },
  { value: "60s+", label: "60대 이상" },
];

interface AgeGroupFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function AgeGroupField({ value, onChange }: AgeGroupFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label className="text-lg font-bold text-foreground">연령대</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex h-[54px] w-full items-center justify-between rounded-lg bg-muted px-4"
          >
            <span
              className={cn(
                "text-base font-semibold",
                value ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {AGE_GROUPS.find((ag) => ag.value === value)?.label ||
                "연령대를 선택해 주세요."}
            </span>
            <ChevronDown className="size-5 text-muted-foreground/50" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-[--radix-dropdown-menu-trigger-width]"
        >
          {AGE_GROUPS.map((ag) => (
            <DropdownMenuItem
              key={ag.value}
              onClick={() => onChange(ag.value)}
              className={cn(
                "cursor-pointer py-3 text-base font-semibold",
                value === ag.value && "bg-primary/10 text-primary"
              )}
            >
              {ag.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
