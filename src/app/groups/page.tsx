<<<<<<< HEAD
import { MyGroupHeader } from '@/src/components/groups/MyGroupHeader';
import { MyGroupList } from '@/src/components/groups/MyGroupList';
import { MyGroupActionsFAB } from '@/src/components/groups/MyGroupActionsFAB';
import { GROUP_SUMMARY_MOCK_LIST } from '@/src/constants/mock-data/group-summary';

export default function GroupsPage() {
  const groups = GROUP_SUMMARY_MOCK_LIST;

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background">
      <MyGroupHeader />
      <MyGroupList groupSummaryList={groups} />
      <MyGroupActionsFAB />
    </div>
  );
}
