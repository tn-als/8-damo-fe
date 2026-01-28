import { GROUP_SUMMARY_MOCK_BY_ID } from "./group-summary";
import { type DiningStatus } from "@/src/types/api/dining";

export type AttendanceVoteStatus = "ATTEND" | "NON_ATTEND" | null;
export type RestaurantVoteAction = "LIKE" | "DISLIKE" | null;

export interface DiningRestaurant {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
}

export interface DiningParticipant {
  userId: number;
  nickname: string;
  profileImageUrl?: string | null;
}

export interface DiningDetailMock {
  id: number;
  groupId: number;
  groupName: string;
  date: string;
  phase: DiningStatus;
  progress: {
    totalCount: number;
    voteCount: number;
  };
  restaurant: DiningRestaurant;
  restaurantVotes: {
    likeCount: number;
    dislikeCount: number;
    myVote: RestaurantVoteAction;
  }[];
  permissions: {
    canDecideRestaurant: boolean;
    canAttendAdditional: boolean;
  };
  reviewStatus: "INCOMPLETED" | "COMPLETED";
  participants: DiningParticipant[];
}

export const DINING_DETAIL_MOCK_LIST: DiningDetailMock[] = [
  {
    id: 1,
    groupId: 1,
    groupName: GROUP_SUMMARY_MOCK_BY_ID[1]?.name ?? "그룹명",
    date: "2024-12-25 18:00",
    phase: "ATTENDANCE_VOTING",
    progress: {
      totalCount: 15,
      voteCount: 5,
    },
    restaurant: {
      id: 1,
      name: "음식점 1",
      phoneNumber: "음식점 1 전화번호",
      description: "음식점 1 설명",
    },
    restaurantVotes: [
      {
        likeCount: 10,
        dislikeCount: 2,
        myVote: null,
      },
    ],
    permissions: {
      canDecideRestaurant: true,
      canAttendAdditional: true,
    },
    reviewStatus: "INCOMPLETED",
    participants: [
      { userId: 1, nickname: "참석자 1", profileImageUrl: null },
      { userId: 2, nickname: "참석자 2", profileImageUrl: null },
      { userId: 3, nickname: "참석자 3", profileImageUrl: null },
    ],
  },
  {
    id: 2,
    groupId: 1,
    groupName: GROUP_SUMMARY_MOCK_BY_ID[1]?.name ?? "그룹명",
    date: "2024-12-25 18:00",
    phase: "RESTAURANT_VOTING",
    progress: {
      totalCount: 12,
      voteCount: 9,
    },
    restaurant: {
      id: 2,
      name: "음식점 2",
      phoneNumber: "음식점 2 전화번호",
      description: "음식점 2 설명",
    },
    restaurantVotes: [
      {
        likeCount: 7,
        dislikeCount: 1,
        myVote: null,
      },
    ],
    permissions: {
      canDecideRestaurant: true,
      canAttendAdditional: true,
    },
    reviewStatus: "INCOMPLETED",
    participants: [
      { userId: 1, nickname: "참석자 1", profileImageUrl: null },
      { userId: 4, nickname: "참석자 4", profileImageUrl: null },
    ],
  },
  {
    id: 3,
    groupId: 2,
    groupName: GROUP_SUMMARY_MOCK_BY_ID[2]?.name ?? "그룹명",
    date: "2024-12-25 18:00",
    phase: "CONFIRMED",
    progress: {
      totalCount: 8,
      voteCount: 8,
    },
    restaurant: {
      id: 3,
      name: "음식점 3",
      phoneNumber: "음식점 3 전화번호",
      description: "음식점 3 설명",
    },
    restaurantVotes: [
      {
        likeCount: 10,
        dislikeCount: 2,
        myVote: "DISLIKE",
      },
    ],
    permissions: {
      canDecideRestaurant: false,
      canAttendAdditional: false,
    },
    reviewStatus: "INCOMPLETED",
    participants: [
      { userId: 5, nickname: "참석자 5", profileImageUrl: null },
      { userId: 6, nickname: "참석자 6", profileImageUrl: null },
      { userId: 7, nickname: "참석자 7", profileImageUrl: null },
    ],
  },
  {
    id: 4,
    groupId: 3,
    groupName: GROUP_SUMMARY_MOCK_BY_ID[3]?.name ?? "그룹명",
    date: "2024-12-25 18:00",
    phase: "COMPLETE",
    progress: {
      totalCount: 9,
      voteCount: 9,
    },
    restaurant: {
      id: 4,
      name: "음식점 4",
      phoneNumber: "음식점 4 전화번호",
      description: "음식점 4 설명",
    },
    restaurantVotes: [
      {
        likeCount: 5,
        dislikeCount: 0,
        myVote: "LIKE",
      },
    ],
    permissions: {
      canDecideRestaurant: false,
      canAttendAdditional: false,
    },
    reviewStatus: "COMPLETED",
    participants: [
      { userId: 8, nickname: "참석자 8", profileImageUrl: null },
      { userId: 9, nickname: "참석자 9", profileImageUrl: null },
    ],
  },
];

export const DINING_DETAIL_MOCK_BY_ID = DINING_DETAIL_MOCK_LIST.reduce<
  Record<number, DiningDetailMock>
>((acc, dining) => {
  acc[dining.id] = dining;
  return acc;
}, {});
