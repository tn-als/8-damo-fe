"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

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
    <div className="fixed bottom-8 right-8 flex flex-col items-end gap-3">
      <div
        className={`flex flex-col items-end gap-2 transition-all duration-200 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-2"
        }`}
      >
        <button
          type="button"
          onClick={handleJoinClick}
          className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          그룹 참여하기
        </button>
        <button
          type="button"
          onClick={handleCreateClick}
          className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-md transition-transform hover:scale-105 active:scale-95"
        >
          그룹 생성하기
        </button>
      </div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="그룹 액션 열기"
        aria-expanded={isOpen}
      >
        <Plus className={`size-6 transition-transform ${isOpen ? "rotate-45" : ""}`} />
      </button>
    </div>
  );
}
