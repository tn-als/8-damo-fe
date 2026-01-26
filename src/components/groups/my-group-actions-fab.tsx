"use client";

import { useState } from "react";
import { ArrowRight, Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { IconButton } from "@/src/components/ui/icon-button";
import { cn } from "@/src/lib/utils";

interface MyGroupActionsFABProps {
  onJoinClick?: () => void;
  onCreateClick?: () => void;
}

export function MyGroupActionsFAB({
  onJoinClick,
  onCreateClick,
}: MyGroupActionsFABProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleJoinClick = () => {
    if (onJoinClick) {
      onJoinClick();
    } else {
      router.push("/groups/join");
    }
    setIsOpen(false);
  };

  const handleCreateClick = () => {
    if (onCreateClick) {
      onCreateClick();
    } else {
      router.push("/groups/create");
    }
    setIsOpen(false);
  };

  return (
    <div className="fab-above-nav fixed right-4 z-[60] flex flex-col items-end gap-2">
      <div
        className={cn(
          "flex flex-col items-end gap-2 transition-all duration-200 sm:gap-2.5",
          isOpen
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-2"
        )}
      >
        <Button
          variant="ghost"
          onClick={handleJoinClick}
          className="group flex h-10 items-center gap-2 rounded-full bg-background px-3 text-xs font-semibold text-foreground shadow-sm transition-transform hover:bg-background active:scale-95 sm:h-12 sm:px-3.5 sm:text-sm"
        >
          <span>그룹 참여하기</span>
          <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground sm:size-10">
            <ArrowRight className="size-4 sm:size-4.5" />
          </span>
        </Button>
        <Button
          variant="ghost"
          onClick={handleCreateClick}
          className="group flex h-10 items-center gap-2 rounded-full bg-background px-3 text-xs font-semibold text-foreground shadow-sm transition-transform hover:bg-background active:scale-95 sm:h-12 sm:px-3.5 sm:text-sm"
        >
          <span>그룹 생성하기</span>
          <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground sm:size-10">
            <Users className="size-4 sm:size-5" />
          </span>
        </Button>
      </div>
      <IconButton
        icon={Plus}
        aria-label={isOpen ? "그룹 액션 닫기" : "그룹 액션 열기"}
        aria-expanded={isOpen}
        variant="default"
        size="lg"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "size-12 rounded-full shadow-lg transition-transform active:scale-95 sm:size-14 [&_svg]:size-6 sm:[&_svg]:size-7",
          isOpen && "[&_svg]:rotate-45"
        )}
      />
    </div>
  );
}
