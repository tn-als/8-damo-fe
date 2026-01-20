"use client";

import { cn } from "@/lib/utils";

interface CharacterGroupProps {
  columns?: 2 | 3 | 4;
  spacing?: number;
  size?: "sm" | "md" | "lg";
  values: string[];
  onValueChange: (values: string[]) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}

const sizeStyles = {
  sm: "h-10 text-sm",
  md: "h-12 text-base",
  lg: "h-14 text-base",
};

export function CharacterGroup({
  columns = 3,
  spacing = 12,
  size = "md",
  values,
  onValueChange,
  options,
  disabled = false,
}: CharacterGroupProps) {
  const toggleSelection = (itemValue: string) => {
    if (disabled) return;
    if (values.includes(itemValue)) {
      onValueChange(values.filter((v) => v !== itemValue));
    } else {
      onValueChange([...values, itemValue]);
    }
  };

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div
      className={cn("grid w-full", gridCols[columns])}
      style={{ gap: `${spacing}px` }}
    >
      {options.map((item) => {
        const isSelected = values.includes(item.value);
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => toggleSelection(item.value)}
            disabled={disabled}
            className={cn(
              "flex w-full items-center justify-center rounded-lg font-semibold transition-colors",
              sizeStyles[size],
              isSelected
                ? "border-2 border-primary/50 bg-primary/15 text-primary"
                : "bg-muted text-foreground",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
