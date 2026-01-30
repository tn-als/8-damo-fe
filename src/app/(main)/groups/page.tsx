import { GroupsPageContent } from '@/src/components/groups/groups-page-content';
import { getMyGroups } from '@/src/lib/actions/groups';

export default async function GroupsPage() {
  const result = await getMyGroups();
  const groups = result.success && result.data ? result.data : [];

  return <main className="flex min-h-screen flex-col items-center justify-center gap-6">
    <GroupsPageContent groups={groups} />
  </main>
}