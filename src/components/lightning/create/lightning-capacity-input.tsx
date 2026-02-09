import { Minus, Plus } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface LightningCapacityInputProps {
  value: number;
  onChange: (value: number) => void;
}

const MIN_CAPACITY = 1;
const MAX_CAPACITY = 8;

export function LightningCapacityInput({
  value,
  onChange,
}: LightningCapacityInputProps) {
  const handleDecrease = () => {
    onChange(Math.max(MIN_CAPACITY, value - 1));
  };

  const handleIncrease = () => {
    onChange(Math.min(MAX_CAPACITY, value + 1));
  };

  return (
    <section className="space-y-2">
      <label className="text-sm font-semibold text-[#444444]">
        모집 인원
      </label>
      <div className="flex h-11 items-center justify-between rounded-xl border border-[#d1d1d6] bg-white px-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleDecrease}
          disabled={value <= MIN_CAPACITY}
          aria-label="모집 인원 감소"
          className="size-8 rounded-lg"
        >
          <Minus className="size-4" />
        </Button>
        <p className="text-base font-semibold text-[#111111]">{value}명</p>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleIncrease}
          disabled={value >= MAX_CAPACITY}
          aria-label="모집 인원 증가"
          className="size-8 rounded-lg"
        >
          <Plus className="size-4" />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">1명부터 8명까지 설정할 수 있습니다.</p>
    </section>
  );
}
