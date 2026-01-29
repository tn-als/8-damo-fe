import { GROUP_SUMMARY_MOCK_BY_ID } from "./group-summary";
import { type DiningStatus } from "@/src/types/api/dining";

export type AttendanceVoteStatus = "ATTEND" | "NON_ATTEND" | null;
export type RestaurantVoteAction = "LIKE" | "DISLIKE" | null;

export interface DiningRestaurant {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
  location?: {
    lat: number;
    lng: number;
  }
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

export const DINIG_DETAIL_CONFIRMED = {
  recommendRestaurantsId: 1,
  restaurantsName: "을지로 골목식당",
  reasoningDescription: "회식하기 좋은 넓은 좌석과 가성비 좋은 메뉴 구성으로 추천되었습니다.",
  phoneNumber: "02-2278-1234",
  latitude: 37.566295,
  longitude: 126.991773,
};

export const DINING_DETAIL_ATTENDANCE_VOTING = {
  attendanceVoteStatus: "PENDING",
  completedVoteCount: 8,
  totalGroupMemberCount: 20
}

export const DINIG_DETAIL_RESTAURANT_VOTING = [
  {
    "recommendRestaurantsId": 1,
    "restaurantsName": "을지로 골목식당",
    "reasoningDescription": "회식하기 좋은 넓은 좌석과 가성비 좋은 메뉴 구성으로 추천되었습니다.",
    "restaurantVoteStatus": "LIKED",
    "phoneNumber": "02-2278-1234",
    "latitude": "37.566295",
    "longitude": "126.991773",
    "likeCount": 8,
    "dislikeCount": 1
  },
  {
    "recommendRestaurantsId": 2,
    "restaurantsName": "홍대 불타는 삼겹살",
    "reasoningDescription": "고기 질이 좋고 단체 예약이 가능해 회식 장소로 적합합니다.",
    "restaurantVoteStatus": "NONE",
    "phoneNumber": "02-332-5678",
    "latitude": "37.557192",
    "longitude": "126.924321",
    "likeCount": 5,
    "dislikeCount": 2
  },
  {
    "recommendRestaurantsId": 3,
    "restaurantsName": "강남 파스타 하우스",
    "reasoningDescription": "분위기가 깔끔하고 조용해 팀 단위 식사에 적합합니다.",
    "restaurantVoteStatus": "DISLIKED",
    "phoneNumber": "02-556-8899",
    "latitude": "37.498095",
    "longitude": "127.027610",
    "likeCount": 3,
    "dislikeCount": 6
  },
  {
    "recommendRestaurantsId": 4,
    "restaurantsName": "성수 수제버거 클럽",
    "reasoningDescription": "다양한 메뉴 선택지가 있어 취향 차이를 고려한 추천입니다.",
    "restaurantVoteStatus": "LIKED",
    "phoneNumber": "02-465-7744",
    "latitude": "37.544581",
    "longitude": "127.055961",
    "likeCount": 10,
    "dislikeCount": 0
  },
  {
    "recommendRestaurantsId": 5,
    "restaurantsName": "종로 전통 한정식",
    "reasoningDescription": "연령대가 다양한 그룹에서도 무난하게 만족도가 높을 것으로 예상됩니다.",
    "restaurantVoteStatus": "NONE",
    "phoneNumber": "02-734-3321",
    "latitude": "37.572876",
    "longitude": "126.979401",
    "likeCount": 6,
    "dislikeCount": 3
  }
]


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
      location: {
        lat: 30, 
        lng: 20
      }
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
