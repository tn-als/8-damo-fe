import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NicknameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function NicknameField({ value, onChange }: NicknameFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label className="text-lg font-bold text-foreground">이름</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="이름을 작성해 주세요."
        className="h-[54px] rounded-lg border-none bg-muted px-4 text-base font-semibold placeholder:text-muted-foreground"
      />
    </div>
  );
}
