import { getMyGroups } from '@/src/lib/api/groups';
import { GroupsPageContent } from '@/src/components/groups/groups-page-content';
import { GROUP_SUMMARY_MOCK_LIST } from '@/src/constants/mock-data';

export default async function GroupsPage() {
  // const result = await getMyGroups();
  const result = { success: true, data: GROUP_SUMMARY_MOCK_LIST};
  const groups = result.success && result.data ? result.data : [];

  return <GroupsPageContent groups={groups} />;
}