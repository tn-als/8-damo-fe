"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function HeaderBackButtonClient() {
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="sm:size-10"
      onClick={() => router.back()}
      aria-label="뒤로 가기"
    >
      <ArrowLeft className="size-6 text-[#8e8e93]" />
    </Button>
  );
}
