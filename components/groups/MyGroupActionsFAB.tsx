"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/utils";

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
    <div className="fixed bottom-5 right-4 flex flex-col items-end gap-2 sm:bottom-6 sm:right-5 sm:gap-3 md:bottom-7 md:right-6 lg:bottom-8 lg:right-8">
      <div
        className={cn(
          "flex flex-col items-end gap-2 transition-all duration-200 sm:gap-2.5",
          isOpen
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-2"
        )}
      >
        <Button
          variant="outline"
          onClick={handleJoinClick}
          className="rounded-full px-3 py-2 text-xs font-semibold shadow-md transition-transform hover:scale-105 active:scale-95 sm:px-4 sm:text-sm"
        >
          그룹 참여하기
        </Button>
        <Button
          variant="outline"
          onClick={handleCreateClick}
          className="rounded-full px-3 py-2 text-xs font-semibold shadow-md transition-transform hover:scale-105 active:scale-95 sm:px-4 sm:text-sm"
        >
          그룹 생성하기
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
          "rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95",
          isOpen && "[&_svg]:rotate-45"
        )}
      />
    </div>
  );
}
