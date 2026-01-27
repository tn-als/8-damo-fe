import { type DiningStatus } from "@/src/types/dining";

export interface GroupDetailMock {
  id: number;
  name: string;
  description: string;
  memberCount: number;
}

export interface GroupDiningMock {
  id: string;
  groupId: number;
  date: string;
  attendeeCount: number;
  status: DiningStatus;
}

export const GROUP_DETAIL_MOCK_LIST: GroupDetailMock[] = [
  {
    id: 1,
    name: "개발팀 점심모임",
    description: "매주 수요일 점심 모임",
    memberCount: 10,
  },
  {
    id: 2,
    name: "디자인팀",
    description: "디자인팀 정기 회식",
    memberCount: 8,
  },
  {
    id: 3,
    name: "마케팅팀 회식",
    description: "마케팅팀 월간 회식",
    memberCount: 12,
  },
  {
    id: 4,
    name: "신입 온보딩",
    description: "입사 3개월 이내 구성원",
    memberCount: 5,
  },
  {
    id: 5,
    name: "기획·운영팀 장기 프로젝트 스터디",
    description:
      "설명이 길어지는 경우 줄바꿈이나 말줄임 처리를 확인하기 위한 테스트용 텍스트입니다.",
    memberCount: 15,
  },
];

export const GROUP_DETAIL_MOCK_BY_ID = GROUP_DETAIL_MOCK_LIST.reduce<
  Record<number, GroupDetailMock>
>((acc, group) => {
  acc[group.id] = group;
  return acc;
}, {});

export const GROUP_DININGS_MOCK_LIST: GroupDiningMock[] = [
  {
    id: "1",
    groupId: 1,
    date: "2024-03-15",
    attendeeCount: 8,
    status: "ATTENDANCE_VOTING",
  },
  {
    id: "2",
    groupId: 1,
    date: "2024-03-08",
    attendeeCount: 6,
    status: "RESTAURANT_VOTING",
  },
  {
    id: "3",
    groupId: 1,
    date: "2024-03-01",
    attendeeCount: 7,
    status: "CONFIRMED",
  },
  {
    id: "4",
    groupId: 1,
    date: "2024-02-22",
    attendeeCount: 7,
    status: "COMPLETED",
  },
  {
    id: "5",
    groupId: 2,
    date: "2024-03-12",
    attendeeCount: 5,
    status: "ATTENDANCE_VOTING",
  },
  {
    id: "6",
    groupId: 2,
    date: "2024-03-05",
    attendeeCount: 6,
    status: "COMPLETED",
  },
  {
    id: "7",
    groupId: 3,
    date: "2024-03-10",
    attendeeCount: 10,
    status: "RESTAURANT_VOTING",
  },
];

export const GROUP_DININGS_MOCK_BY_ID = GROUP_DININGS_MOCK_LIST.reduce<
  Record<string, GroupDiningMock>
>((acc, dining) => {
  acc[dining.id] = dining;
  return acc;
}, {});

export const GROUP_DININGS_MOCK_BY_GROUP_ID = GROUP_DININGS_MOCK_LIST.reduce<
  Record<number, GroupDiningMock[]>
>((acc, dining) => {
  if (!acc[dining.groupId]) {
    acc[dining.groupId] = [];
  }
  acc[dining.groupId].push(dining);
  return acc;
}, {});
