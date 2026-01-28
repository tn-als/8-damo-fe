import { GroupSummary } from "@/src/types/groups";

export const GROUP_SUMMARY_MOCK_LIST: GroupSummary[] = [
  {
    id: '1',
    name: "개발팀 점심모임",
    introduction: "매주 수요일 점심 모임",
  },
  {
    id: '2',
    name: "디자인팀",
    introduction: "",
  },
  {
    id: '3',
    name: "마케팅팀 회식",
  },
  {
    id: '4',
    name: "신입 온보딩",
    introduction: "설명이 길어지는 경우 줄바꿈이나 말줄임 처리를 확인하기 위한 테스트용 텍스트입니다.",
  }
];

export const GROUP_SUMMARY_MOCK_BY_ID = GROUP_SUMMARY_MOCK_LIST.reduce<
  Record<string, GroupSummary>
>((acc, group) => {
  acc[group.id] = group;
  return acc;
}, {});
