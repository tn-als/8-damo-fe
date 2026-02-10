import type { LightningItem } from "@/src/types/lightning";

export const MOCK_LIGHTNING_ITEMS: LightningItem[] = [
  {
    id: 1,
    description: "홍대 맛집 투어 🍜",
    dateLabel: "2026년 2월 8일 · 오후 7:00",
    restaurantName: "홍대입구역 3번 출구",
    currentParticipants: 4,
    maxParticipants: 6,
    joined: false,
  },
  {
    id: 2,
    description: "강남 보드게임 모임",
    dateLabel: "2026년 2월 8일 · 오후 8:30",
    restaurantName: "강남역 보드게임카페",
    currentParticipants: 3,
    maxParticipants: 5,
    joined: false,
  },
  {
    id: 3,
    description: "한강 야경 산책",
    dateLabel: "2026년 2월 8일 · 오후 9:00",
    restaurantName: "여의도 한강공원",
    currentParticipants: 2,
    maxParticipants: 4,
    joined: true,
  },
  {
    id: 4,
    description: "퇴근 후 스터디 카페",
    dateLabel: "2026년 2월 9일 · 오후 6:40",
    restaurantName: "합정역 스터디카페",
    currentParticipants: 5,
    maxParticipants: 6,
    joined: true,
  },
];
