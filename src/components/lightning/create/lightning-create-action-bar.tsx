import { Button } from "@/src/components/ui/button";

interface LightningCreateActionBarProps {
  disabled: boolean;
  isSubmitting: boolean;
}

export function LightningCreateActionBar({
  disabled,
  isSubmitting,
}: LightningCreateActionBarProps) {
  return (
    <div className="sticky bottom-0 border-t border-[#ececf0] bg-background px-4 py-3">
      <Button
        type="submit"
        disabled={disabled || isSubmitting}
        className="h-12 w-full rounded-xl bg-[#ff8d28] text-base font-semibold text-white active:bg-[#ff8d28]/90 disabled:opacity-50"
      >
        {isSubmitting ? "생성 중..." : "번개 생성하기"}
      </Button>
    </div>
  );
}
