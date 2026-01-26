import { MyGroupHeader } from '@/src/components/groups/my-group-header';
import { MyGroupList } from '@/src/components/groups/my-group-list';
import { MyGroupActionsFAB } from '@/src/components/groups/my-group-actions-fab';
import { BottomNavigationBar } from '@/src/components/layout';
import { GROUP_SUMMARY_MOCK_LIST } from '@/src/constants/mock-data/group-summary';

export default function GroupsPage() {
  const groups = GROUP_SUMMARY_MOCK_LIST;

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-app-background">
      <MyGroupHeader />
      <MyGroupList groupSummaryList={groups} />
      <MyGroupActionsFAB />
      <BottomNavigationBar />
    </div>
  );
}
