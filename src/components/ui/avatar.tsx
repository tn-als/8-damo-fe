"use client";

import { cn } from "@/src/lib/utils";
import { useState } from "react";

const COLORS = [
  "#f7a649", // muted orange
  "#ff6b6b", // muted red
  "#35f5ce", // muted teal
  "#489aff", // muted blue
  "#7d60fc", // muted violet
  "#6cff9f", // muted green
  "#fb70bf", // muted pink
  "#748ffb", // muted indigo
  "#f9d855", // muted amber
  "#5eecfc", // muted cyan
] as const;

function pickColor(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
    hash |= 0;
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

const sizeStyles = {
  sm: "size-10 sm:size-12",
  md: "size-14 sm:size-16",
  lg: "size-16 sm:size-20",
  xl: "size-20 sm:size-24",
  "2xl": "size-[120px] sm:size-[135px] md:size-[147px]",
};

const textSizeStyles = {
  sm: "text-sm sm:text-base",
  md: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl",
  xl: "text-xl sm:text-2xl",
  "2xl": "text-3xl sm:text-4xl",
};

interface AvatarProps {
  src?: string | null;
  alt: string;
  fallbackText?: string;
  fallbackUrl?: string;
  size?: keyof typeof sizeStyles;
  shape?: "circle" | "rounded";
  showBorder?: boolean;
  className?: string;
}

type RenderType = "image" | "fallbackImage" | "initials"; 

export function Avatar({
  src,
  alt,
  fallbackText,
  fallbackUrl,
  size = "md",
  shape = "circle",
  showBorder = true,
  className,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);
  const [hasFallbackError, setHasFallbackError] = useState(false);

  const initials = fallbackText
    ? fallbackText
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : alt
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
    
    let renderType: RenderType;

    if (src && !hasError){
        renderType = "image";
    } else if (fallbackUrl && !hasFallbackError){
        renderType = "fallbackImage";
    } else {
        renderType = "initials";
    }

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-background",
        sizeStyles[size],
        shape === "circle" ? "rounded-full" : "rounded-xl",
        showBorder && "border-2 border-accent-foreground/30",
        className
      )}
    >
      {renderType === "image" && (
        <img
          src={src!}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      )}

      {renderType === "fallbackImage" && (
        <img
          src={fallbackUrl!}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setHasFallbackError(true)}
        />
      )}

      {renderType === "initials" && (
        <div
          style={{ background: pickColor(fallbackText ?? alt) }}
          className={cn(
            "flex size-full items-center justify-center font-bold text-white",
            textSizeStyles[size]
          )}
        >
          {initials}
        </div>
      )}
    </div>
  );
}
