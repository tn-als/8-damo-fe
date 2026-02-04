"use client";

import { useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface GroupDetailCreateDiningButtonProps {
  isGroupLeader?: boolean;
  onCreateDining?: () => void;
  onShareQR?: () => void;
}

export function GroupDetailCreateDiningButton({
  isGroupLeader = false,
  onCreateDining,
  onShareQR,
}: GroupDetailCreateDiningButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMainClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCreateDining = () => {
    onCreateDining?.();
    setIsExpanded(false);
  };

  const handleShareQR = () => {
    onShareQR?.();
    setIsExpanded(false);
  };

  return (
    <div className="
      fab-above-nav 
      absolute
      right-4 sm:right-5
      flex flex-col items-end gap-2.5
      ">
      {/* 펼쳐진 메뉴 */}
      <div
        className={cn(
          "flex flex-col items-end gap-2.5 transition-all duration-200 sm:gap-3",
          isExpanded
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        {/* QR 공유하기 */}
        <div className="flex items-center gap-3">
          <span className="text-[15px] font-bold leading-[21px] text-[#333] sm:text-base sm:leading-[22px]">
            QR 공유하기
          </span>
          <button
            type="button"
            onClick={handleShareQR}
            className="flex size-12 items-center justify-center rounded-full bg-[#ffdcbd] shadow-[2px_2px_12px_0px_rgba(0,0,0,0.08)] sm:size-14"
          >
            <ChevronRight className="size-6 text-[#ff8d28] sm:size-7" />
          </button>
        </div>

        {isGroupLeader ? (
          <div className="flex items-center gap-3">
            <span className="text-[15px] font-bold leading-[21px] text-[#333] sm:text-base sm:leading-[22px]">
              회식 생성하기
            </span>
            <button
              type="button"
              onClick={handleCreateDining}
              className="flex size-12 items-center justify-center rounded-full bg-[#ffdcbd] shadow-[2px_2px_12px_0px_rgba(0,0,0,0.08)] sm:size-14"
            >
              <Plus className="size-5 text-[#ff8d28] sm:size-6" />
            </button>
          </div>
        ) : null}
      </div>

      {/* 메인 FAB */}
      <button
        type="button"
        onClick={handleMainClick}
        className={cn(
          "flex size-12 items-center justify-center rounded-full bg-[#ff8d28] shadow-[2px_2px_12px_0px_rgba(0,0,0,0.08)] transition-transform duration-200 sm:size-14",
          isExpanded && "rotate-45"
        )}
      >
        <Plus className="size-5 text-white sm:size-6" />
      </button>
    </div>
  );
}
