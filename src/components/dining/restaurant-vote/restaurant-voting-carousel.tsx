"use client";

import { Children, useEffect, useRef, useState } from "react";

interface RestaurantVotingCarouselProps {
  children: React.ReactNode;
}

export function RestaurantVotingCarousel({
  children,
}: RestaurantVotingCarouselProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = Children.count(children);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const updateIndex = () => {
      const width = viewport.clientWidth || 1;
      const nextIndex = Math.round(viewport.scrollLeft / width);
      setActiveIndex(Math.max(0, Math.min(total - 1, nextIndex)));
    };

    updateIndex();
    viewport.addEventListener("scroll", updateIndex, { passive: true });
    window.addEventListener("resize", updateIndex);

    return () => {
      viewport.removeEventListener("scroll", updateIndex);
      window.removeEventListener("resize", updateIndex);
    };
  }, []);

  return (
    <div className="w-full">
      <div ref={viewportRef} className="w-full overflow-x-auto snap-x snap-mandatory">
        <div className="flex w-full">
          {Children.map(children, (child, index) => (
            <div key={index} className="w-full shrink-0 snap-center px-5 pb-2">
              <div className="flex w-full justify-center">{child}</div>
            </div>
          ))}
        </div>
      </div>
      {total > 1 && (
        <div className="mt-2 flex w-full items-center justify-center gap-2">
          {Array.from({ length: total }).map((_, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${
                index === activeIndex ? "bg-primary" : "bg-black/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
