import { Header } from "@/components/layout";

interface GroupDetailHeaderProps {
  groupName: string;
  onMoreClick?: () => void;
}

export function GroupDetailHeader({
  groupName,
  onMoreClick,
}: GroupDetailHeaderProps) {
  return (
    <Header
      title={groupName}
      showBackButton={true}
      showMoreButton={true}
      onMoreClick={onMoreClick}
    />
  );
}
