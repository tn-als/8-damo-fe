"use client";

import { ArrowLeft, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { Button } from "../ui/button";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
  showMoreButton?: boolean;
  onMoreClick?: () => void;
  className?: string;
}

export function Header({
  title,
  onBack,
  showBackButton = true,
  showMoreButton = false,
  onMoreClick,
  className,
}: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="relative fixed top-0 left-0 right-0 z-50 bg-background sm:h-16">
      {/* 왼쪽: 뒤로가기 버튼 */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        {showBackButton ? (
          <Button
            variant="ghost"
            size="icon"
            className="sm:size-10"
            onClick={handleBack}
            aria-label="뒤로 가기"
          >
            <ArrowLeft className="size-5 sm:size-6" />
          </Button>
        ) : (
          <div className="size-9 sm:size-10" />
        )}
      </div>

      {/* 가운데: 제목 */}
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    text-lg font-bold sm:text-xl">
        {title}
      </h1>

      {/* 오른쪽: 더보기 버튼 */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        {showMoreButton ? (
          <Button
            variant="ghost"
            size="icon"
            className="sm:size-10"
            onClick={onMoreClick}
            aria-label="더보기"
          >
            <MoreVertical className="size-5 sm:size-6" />
          </Button>
        ) : (
          <div className="size-9 sm:size-10" />
        )}
      </div>
    </header>
  );
}
