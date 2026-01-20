import { MyGroupHeader } from '@/components/groups/MyGroupHeader';
import { MyGroupList } from '@/components/groups/MyGroupList';
import { MyGroupActionsFAB } from '@/components/groups/MyGroupActionsFAB';
import { GroupSummary } from '@/types/groups';

const mockGroupSummary: GroupSummary[] = [
  {
    id: '1',
    name: '개발팀',
    description: '백엔드 개발팀',
    diningCountPerMonth: 3
  },
  {
    id: '2',
    name: '개발팀',
    description: '백엔드 개발팀',
    diningCountPerMonth: 3
  },
  {
    id: '3',
    name: '개발팀',
    description: '백엔드 개발팀',
    diningCountPerMonth: 3
  },
  {
    id: '4',
    name: '개발팀',
    description: '백엔드 개발팀',
    diningCountPerMonth: 3
  },
  {
    id: '5',
    name: '개발팀',
    description: '백엔드 개발팀',
    diningCountPerMonth: 3
  },
  {
    id: '6',
    name: '개발팀',
    description: '백엔드 개발팀',
    diningCountPerMonth: 3
  },
  {
    id: '7',
    name: '개발팀',
    description: '백엔드 개발팀',
    diningCountPerMonth: 3
  },
  {
    id: '8',
    name: '개발팀',
    description: '백엔드 개발팀',
    diningCountPerMonth: 3
  },
  {
    id: '9',
    name: '개발팀',
    description: '백엔드 개발팀',
    diningCountPerMonth: 3
  },
  {
    id: '10',
    name: '개발팀',
    description: '백엔드 개발팀',
    diningCountPerMonth: 3
  }
];

export default function GroupsPage() {
  const groups = mockGroupSummary;

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background">
      <MyGroupHeader />
      <MyGroupList groupSummaryList={groups} />
      <MyGroupActionsFAB />
    </div>
  );
}
