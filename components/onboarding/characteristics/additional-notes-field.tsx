import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AdditionalNotesFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function AdditionalNotesField({
  value,
  onChange,
  disabled,
}: AdditionalNotesFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label className="text-lg font-bold text-foreground">
        추가적으로 전달하고 싶은 내용이 있나요?
      </Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="예) 매운 음식은 잘 못 먹어요."
        disabled={disabled}
        className="min-h-[100px] rounded-lg border-none bg-muted px-4 py-4 text-base font-semibold placeholder:text-muted-foreground"
      />
    </div>
  );
}
