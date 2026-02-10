import { Input } from "@/src/components/ui/input";

interface LightningDescriptionInputProps {
  value: string;
  count: number;
  maxLength: number;
  onChange: (value: string) => void;
}

export function LightningDescriptionInput({
  value,
  count,
  maxLength,
  onChange,
}: LightningDescriptionInputProps) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <label htmlFor="lightning-description" className="text-sm font-semibold text-[#444444]">
          번개 설명
        </label>
        <span className="text-xs text-muted-foreground">
          {count} / {maxLength}
        </span>
      </div>
      <Input
        id="lightning-description"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="저녁 같이 드실 분"
        className="h-11 rounded-xl border-[#d1d1d6] bg-white"
        maxLength={maxLength * 2}
      />
    </section>
  );
}
