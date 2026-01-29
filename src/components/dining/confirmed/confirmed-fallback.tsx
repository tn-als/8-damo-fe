import { EmptyState } from "@/src/components/ui/empty-state";
import { Utensils } from "lucide-react";

interface ConfirmedFallbackProps {
  description: string;
}

export function ConfirmedFallback({ description }: ConfirmedFallbackProps) {
  return (
    <EmptyState
      icon={Utensils}
      title="회식 장소를 확인할 수 없어요."
      description={description}
    />
  );
}
