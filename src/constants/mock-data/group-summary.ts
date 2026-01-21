import { GroupSummary } from "@/src/types/groups";

export const GROUP_SUMMARY_MOCK_LIST: GroupSummary[] = [
  {
    id: "group-1",
    name: "개발팀 점심모임",
    description: "매주 수요일 점심 모임",
    memberCount: 8,
    diningCountPerMonth: 4,
  },
  {
    id: "group-2",
    name: "디자인팀",
    description: "",
    memberCount: 5,
    diningCountPerMonth: 12,
  },
  {
    id: "group-3",
    name: "마케팅팀 회식",
    memberCount: 12,
    diningCountPerMonth: 23,
  },
  {
    id: "group-4",
    name: "신입 온보딩",
    description: "입사 3개월 이내 구성원",
    diningCountPerMonth: 0,
  },
  {
    id: "group-5",
    name: "기획·운영팀 장기 프로젝트 스터디",
    description:
      "설명이 길어지는 경우 줄바꿈이나 말줄임 처리를 확인하기 위한 테스트용 텍스트입니다.",
    memberCount: 0,
    diningCountPerMonth: 3,
  },
  {
    id: "group-6",
    name: "PM/PO",
    description: "짧은 소개",
    memberCount: 2,
  },
  {
    id: "group-7",
    name: "주말 러닝크루",
    description: "다양한 조건 렌더링 확인용",
    diningCountPerMonth: 1,
  },
  {
    id: "group-8",
    name: "텍스트가 아주 긴 그룹명입니다_레이아웃_테스트",
    description: "짧",
    memberCount: 1,
    diningCountPerMonth: 1,
  },
];

export const GROUP_SUMMARY_MOCK_BY_ID = GROUP_SUMMARY_MOCK_LIST.reduce<
  Record<string, GroupSummary>
>((acc, group) => {
  acc[group.id] = group;
  return acc;
}, {});
