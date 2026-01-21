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
    <header
      className={cn(
        "flex h-14 items-center justify-between px-4 sm:h-16 sm:px-5",
        className
      )}
    >
      {/* 왼쪽: 뒤로가기 버튼 */}
      <div className="flex w-9 items-center justify-start sm:w-10">
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
      <h1 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
        {title}
      </h1>

      {/* 오른쪽: 더보기 버튼 */}
      <div className="flex w-9 items-center justify-end sm:w-10">
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
