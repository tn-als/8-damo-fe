import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";

interface AdditionalNotesFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  showLabel?: boolean;
}

export function AdditionalNotesField({
  value,
  onChange,
  disabled,
  showLabel = true,
}: AdditionalNotesFieldProps) {
  return (
    <div className="flex flex-col gap-3">
      {showLabel && (
        <Label className="text-lg font-bold text-foreground">
          추가적으로 전달하고 싶은 내용이 있나요?
        </Label>
      )}
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
