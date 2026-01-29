import { Header } from "@/src/components/layout";
import type { DiningStatus } from "@/src/types/api/dining";
import { DiningDate } from "./dining-date";
import { DiningStatusBadge } from "./dining-status-badge";

interface DiningHeaderProps {
  diningDate: string;
  diningStatus: DiningStatus;
  onBack?: () => void;
}

export function DiningHeader({
  diningDate,
  diningStatus,
  onBack,
}: DiningHeaderProps) {
  return (
    <Header
      title={<DiningDate date={diningDate} />}
      onBack={onBack}
      rightElement={<DiningStatusBadge status={diningStatus} />}
    />
  );
}
