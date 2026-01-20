"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const sizeStyles = {
  sm: "size-10 sm:size-12",
  md: "size-14 sm:size-16",
  lg: "size-16 sm:size-20",
  xl: "size-20 sm:size-24",
};

const textSizeStyles = {
  sm: "text-sm sm:text-base",
  md: "text-base sm:text-lg",
  lg: "text-lg sm:text-xl",
  xl: "text-xl sm:text-2xl",
};

interface AvatarProps {
  src?: string | null;
  alt: string;
  fallbackText?: string;
  size?: keyof typeof sizeStyles;
  shape?: "circle" | "rounded";
  showBorder?: boolean;
  className?: string;
}

export function Avatar({
  src,
  alt,
  fallbackText,
  size = "md",
  shape = "circle",
  showBorder = true,
  className,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

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

  const showFallback = !src || hasError;

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-muted",
        sizeStyles[size],
        shape === "circle" ? "rounded-full" : "rounded-xl",
        showBorder && "border-2 border-muted-foreground/30",
        className
      )}
    >
      {showFallback ? (
        <div
          className={cn(
            "flex size-full items-center justify-center font-semibold text-muted-foreground",
            textSizeStyles[size]
          )}
        >
          {initials}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
