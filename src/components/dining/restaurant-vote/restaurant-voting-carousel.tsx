import { Children } from "react";

interface RestaurantVotingCarouselProps {
  children: React.ReactNode;
}

export function RestaurantVotingCarousel({
  children,
}: RestaurantVotingCarouselProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex w-max snap-x snap-mandatory gap-4 px-5 pb-2">
        {Children.map(children, (child, index) => (
          <div key={index} className="snap-center">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
