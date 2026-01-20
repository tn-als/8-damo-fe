import { MyGroupHeader } from '@/components/groups/MyGroupHeader';
import { MyGroupList } from '@/components/groups/MyGroupList';
import { MyGroupActionsFAB } from '@/components/groups/MyGroupActionsFAB';

interface Group {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  createdAt: string;
  imageUrl?: string;
  meetingCount?: number;
  status?: string;
}

const mockGroups: Group[] = [
  {
    id: '1',
    name: '개발팀',
    description: '백엔드 개발팀',
    memberCount: 8,
    createdAt: '2024-01-15',
    meetingCount: 3,
    status: '활성',
  },
  {
    id: '2',
    name: '디자인팀',
    description: 'UI/UX 디자인팀',
    memberCount: 5,
    createdAt: '2024-02-20',
    meetingCount: 2,
    status: '활성',
  },
  {
    id: '3',
    name: '마케팅팀',
    description: '브랜드 마케팅',
    memberCount: 6,
    createdAt: '2024-03-10',
    meetingCount: 1,
    status: '대기',
  },
];

export default function GroupsPage() {
  const groups = mockGroups;

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] bg-background">
      <MyGroupHeader />
      <MyGroupList groups={groups} />
      <MyGroupActionsFAB />
    </div>
  );
}
