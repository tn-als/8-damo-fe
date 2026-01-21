"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SegmentedTabsProps {
  tabs: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedTabs({
  tabs,
  value,
  onChange,
  className,
}: SegmentedTabsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-xl bg-muted p-0.5",
        className
      )}
    >
      {tabs.map((tab, index) => (
        <React.Fragment key={tab.value}>
          <button
            type="button"
            onClick={() => onChange(tab.value)}
            className={cn(
              "flex-1 rounded-[10px] px-3 py-2 text-sm font-semibold transition-all",
              value === tab.value
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
          {index < tabs.length - 1 && (
            <div className="h-3 w-px bg-border" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
