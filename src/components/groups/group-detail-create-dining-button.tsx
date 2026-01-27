"use client";

import { useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface GroupDetailCreateDiningButtonProps {
  onCreateDining?: () => void;
  onShareQR?: () => void;
}

export function GroupDetailCreateDiningButton({
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
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      {/* 펼쳐진 메뉴 */}
      <div
        className={cn(
          "flex flex-col items-end gap-3 transition-all duration-200",
          isExpanded
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        {/* QR 공유하기 */}
        <div className="flex items-center gap-3">
          <span className="text-base font-bold leading-[22px] text-[#333]">
            QR 공유하기
          </span>
          <button
            type="button"
            onClick={handleShareQR}
            className="flex size-14 items-center justify-center rounded-full bg-[#ffdcbd] shadow-[2px_2px_12px_0px_rgba(0,0,0,0.08)]"
          >
            <ChevronRight className="size-7 text-[#ff8d28]" />
          </button>
        </div>

        {/* 회식 생성하기 */}
        <div className="flex items-center gap-3">
          <span className="text-base font-bold leading-[22px] text-[#333]">
            회식 생성하기
          </span>
          <button
            type="button"
            onClick={handleCreateDining}
            className="flex size-14 items-center justify-center rounded-full bg-[#ffdcbd] shadow-[2px_2px_12px_0px_rgba(0,0,0,0.08)]"
          >
            <Plus className="size-6 text-[#ff8d28]" />
          </button>
        </div>
      </div>

      {/* 메인 FAB */}
      <button
        type="button"
        onClick={handleMainClick}
        className={cn(
          "flex size-14 items-center justify-center rounded-full bg-[#ff8d28] shadow-[2px_2px_12px_0px_rgba(0,0,0,0.08)] transition-transform duration-200",
          isExpanded && "rotate-45"
        )}
      >
        <Plus className="size-6 text-white" />
      </button>
    </div>
  );
}