"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { toast } from "@/src/components/ui/sonner";
import { processAuthTest } from "@/src/lib/actions/auth";

export default function LoginTestPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAuthTest = () => {
    startTransition(async () => {
      const result = await processAuthTest();

      if (!result.success) {
        toast.error(result.error || "로그인 테스트에 실패했습니다.");
        return;
      }

      router.replace("/");
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-4">
      <Button
        type="button"
        className="w-full"
        onClick={handleAuthTest}
        disabled={isPending}
      >
        {isPending ? "처리 중..." : "인증 테스트"}
      </Button>
    </main>
  );
}
