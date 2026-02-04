"use client";

import { Button } from "@/src/components/ui/button";

interface DiningCreateSubmitAreaProps {
  isSubmitting: boolean;
  isValid: boolean;
}

export function DiningCreateSubmitArea({
  isSubmitting,
  isValid,
}: DiningCreateSubmitAreaProps) {
  return (
    <Button
      type="submit"
      disabled={!isValid || isSubmitting}
      className="h-14 w-full rounded-[8px] bg-[#ff8d28] text-base font-semibold text-white active:bg-[#ff8d28]/90 disabled:opacity-50 sm:h-16"
    >
      {isSubmitting ? "생성 중..." : "생성하기"}
    </Button>
  );
}
