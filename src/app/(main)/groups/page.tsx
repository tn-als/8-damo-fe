import { GroupsPageContent } from '@/src/components/groups/list/groups-page-content';
import { getMyGroups } from '@/src/lib/api/server/groups';

export default async function GroupsPage() {
  const groups = await getMyGroups();

  return <GroupsPageContent groups={groups} />
}