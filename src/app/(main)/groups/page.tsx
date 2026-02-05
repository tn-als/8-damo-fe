import { GroupsPageContent } from '@/src/components/groups/list/groups-page-content';
import { getMyGroups } from '@/src/lib/actions/groups';

export default async function GroupsPage() {
  const result = await getMyGroups();
  const groups = result.success && result.data ? result.data : [];

  return <GroupsPageContent groups={groups} />
}