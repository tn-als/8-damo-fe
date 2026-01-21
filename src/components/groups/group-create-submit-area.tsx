"use client";

import { Button } from "@/src/components/ui/button";

interface GroupCreateSubmitAreaProps {
  isSubmitting?: boolean;
  isValid?: boolean;
}

export function GroupCreateSubmitArea({
  isSubmitting = false,
  isValid = true,
}: GroupCreateSubmitAreaProps) {
  return (
    <div className="pt-8">
      <Button
        type="submit"
        disabled={isSubmitting || !isValid}
        className="h-14 w-full rounded-lg bg-primary text-base font-semibold text-white shadow-md hover:bg-primary/90 sm:h-16"
      >
        {isSubmitting ? "생성 중..." : "그룹 생성하기"}
      </Button>
    </div>
  );
}
