import { Loader2 } from "lucide-react";
import { RecommendationPendingMessage } from "./recommendation-pending-message";

export function RecommendationPendingSection() {
  return (
    <section className="w-full min-h-[120px] rounded-[20px] bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <RecommendationPendingMessage />
        <div className="flex items-center gap-2">
          <Loader2 className="size-5 animate-spin text-[#ff8d28]" />
        </div>
      </div>
    </section>
  );
}
