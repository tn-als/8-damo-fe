interface RecommendationPendingMessageProps {
  title?: string;
  description?: string;
}

const DEFAULT_TITLE = "식당 찾는 중이에요 🍽️";
const DEFAULT_DESCRIPTION = "조금만 기다려주세요! 금방 추천드릴게요 ✨";

export function RecommendationPendingMessage({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
}: RecommendationPendingMessageProps) {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-[15px] font-semibold leading-5 text-[#333] sm:text-base">
        {title}
      </h2>
      <p className="text-[13px] leading-5 text-[#8e8e93] sm:text-sm">
        {description}
      </p>
    </div>
  );
}
