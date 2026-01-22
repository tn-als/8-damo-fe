import { MyGroupHeader } from '@/src/components/groups/my-group-header';
import { MyGroupList } from '@/src/components/groups/my-group-list';
import { MyGroupActionsFAB } from '@/src/components/groups/my-group-actions-fab';
import { GROUP_SUMMARY_MOCK_LIST } from '@/src/constants/mock-data/group-summary';

export default function GroupsPage() {
  const groups = GROUP_SUMMARY_MOCK_LIST;

  return (
    <>
        <main className="flex flex-col gap-6 px-4 py-4 sm:pt-4">
            <MyGroupList groupSummaryList={groups} />
            <MyGroupActionsFAB />
        </main>
    </>
  );
}
