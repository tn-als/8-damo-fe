"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";
import type { LateDiningSummary } from "@/src/types/home";
import { LateDiningCard } from "./late-dining-card";

interface LateDiningSummarySectionProps {
    dinings: LateDiningSummary[];
    className?: string;
}

export function LateDiningSummarySection({
    dinings,
    className,
}: LateDiningSummarySectionProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const hasAnyDining = dinings.length > 0;
    const visibleDinings = dinings.slice(0, 5);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const handleScroll = () => {
            const scrollLeft = scrollContainer.scrollLeft;
            const cardWidth = scrollContainer.offsetWidth;
            const newIndex = Math.round(scrollLeft / cardWidth);
            setCurrentIndex(newIndex);
        };

        scrollContainer.addEventListener("scroll", handleScroll);
        return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }, []);

    const handleIndicatorClick = (index: number) => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const cardWidth = scrollContainer.offsetWidth;
        scrollContainer.scrollTo({
            left: cardWidth * index,
            behavior: "smooth",
        });
    };

    return (
        <section className={cn("flex flex-col gap-4", className)}>
            <h2 className="text-lg font-bold">최근 회식</h2>

            {hasAnyDining ? (
                <>
                    <div
                        ref={scrollRef}
                        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-hide"
                    >
                        {visibleDinings.map((dining) => (
                            <div
                                key={dining.id}
                                className="w-full flex-shrink-0 snap-center"
                            >
                                <LateDiningCard dining={dining} />
                            </div>
                        ))}
                    </div>

                    {/* 인디케이터 */}
                    {visibleDinings.length > 1 && (
                        <div className="flex justify-center gap-1.5">
                            {visibleDinings.map((dining, index) => (
                                <button
                                    key={dining.id}
                                    type="button"
                                    onClick={() => handleIndicatorClick(index)}
                                    className={cn(
                                        "size-2 rounded-full transition-colors",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                        index === currentIndex
                                            ? "bg-primary"
                                            : "bg-muted-foreground/30"
                                    )}
                                    aria-label={`${index + 1}번째 회식으로 이동`}
                                    aria-current={index === currentIndex ? "true" : undefined}
                                />
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <p className="py-4 text-center text-sm text-muted-foreground">
                    최근 진행한 회식이 없습니다
                </p>
            )}
        </section>
    );
}
