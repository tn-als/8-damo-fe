import { getMyGroups } from '@/src/lib/api/groups';
import { GroupsPageContent } from '@/src/components/groups/groups-page-content';

export default async function GroupsPage() {
  const result = await getMyGroups();
  const groups = result.success && result.data ? result.data : [];

  return <GroupsPageContent groups={groups} />;
}