"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";

interface AdBannerSectionProps {
    className?: string;
}

const BANNER_IMAGES = [
    "/images/banner/image1.png",
    "/images/banner/image2.png",
    "/images/banner/image3.png",
];

const AUTO_SLIDE_INTERVAL = 3000;

export function AdBannerSection({ className }: AdBannerSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % BANNER_IMAGES.length);
        }, AUTO_SLIDE_INTERVAL);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={cn("relative w-full", className)}>
            {/* 배너 이미지 */}
            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-xl bg-muted">
                {BANNER_IMAGES.map((src, index) => (
                    <div
                        key={src}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-500",
                            index === currentIndex
                                ? "opacity-100"
                                : "opacity-0"
                        )}
                    >
                        <Image
                            src={src}
                            alt={`배너 ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 430px) 100vw, 430px"
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* 인디케이터 */}
            <div className="mt-2 flex justify-center gap-1.5">
                {BANNER_IMAGES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                            "h-1.5 rounded-full transition-all",
                            index === currentIndex
                                ? "w-4 bg-primary"
                                : "w-1.5 bg-muted-foreground/30"
                        )}
                        aria-label={`${index + 1}번 배너로 이동`}
                    />
                ))}
            </div>
        </div>
    );
}
