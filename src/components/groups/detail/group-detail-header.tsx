import { Header } from "@/src/components/layout";

interface GroupDetailHeaderProps {
  groupName: string;
  onBack?: () => void;
}

export function GroupDetailHeader({
  groupName,
  onBack,
}: GroupDetailHeaderProps) {
  return (
    <Header
        title={groupName}
        showBackButton={true}
        showMoreButton={false}
        onBack = {onBack}
      />
  );
}
