import { Header } from "@/src/components/layout";

interface GroupDetailHeaderProps {
  groupName: string;
  onBack?: () => void;
  onMoreClick?: () => void;
}

export function GroupDetailHeader({
  groupName,
  onBack,
  onMoreClick,
}: GroupDetailHeaderProps) {
  return (
    <Header
        title={groupName}
        showBackButton={true}
        showMoreButton={true}
        onBack = {onBack}
        onMoreClick={onMoreClick}
      />
  );
}
