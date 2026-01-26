"use client";

import { cn } from "@/src/lib/utils";
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
        <Image
          src={src!}
          alt={alt}
          fill 
          className="object-cover"
          onError={()=>setHasError(true)}
        />
      )}

      {renderType === "fallbackImage" && (
        <Image
          src={fallbackUrl!}
          alt={alt}
          fill 
          className="object-cover"
          onError={()=>setHasFallbackError(true)}
        />
      )}

      {renderType === "initials" && (
        <div
          className={cn(
            "flex size-full items-center justify-center font-semibold text-muted-foreground",
            textSizeStyles[size]
          )}
        >
          {initials}
        </div>
      )}
    </div>
  );
}
