import type { LateDiningSummary } from "@/src/types/home";

// 정상 케이스 - 최근 완료된 회식들
export const mockLateDiningSummaries: LateDiningSummary[] = [
    {
        id: "late-dining-1",
        restaurantName: "맛있는 삼겹살집",
        restaurantAddress: "서울시 강남구 테헤란로 123",
        description: "분위기 좋고 고기 질이 좋았어요",
        mapImageUrl: "/images/maps/map-placeholder-1.png",
        diningDate: "2025-01-18",
    },
    {
        id: "late-dining-2",
        restaurantName: "프리미엄 한정식",
        restaurantAddress: "서울시 서초구 반포대로 45",
        description: "정갈하고 깔끔한 한식 코스",
        mapImageUrl: "/images/maps/map-placeholder-2.png",
        diningDate: "2025-01-15",
    },
    {
        id: "late-dining-3",
        restaurantName: "이탈리안 비스트로",
        restaurantAddress: "서울시 마포구 와우산로 78",
        description: "파스타와 와인이 훌륭했습니다",
        mapImageUrl: "/images/maps/map-placeholder-3.png",
        diningDate: "2025-01-12",
    },
    {
        id: "late-dining-4",
        restaurantName: "루프탑 바베큐",
        restaurantAddress: "서울시 용산구 이태원로 234",
        description: "야경이 예쁜 곳",
        mapImageUrl: "/images/maps/map-placeholder-4.png",
        diningDate: "2025-01-10",
    },
    {
        id: "late-dining-5",
        restaurantName: "전통 막걸리집",
        restaurantAddress: "서울시 종로구 인사동길 56",
        description: "안주가 푸짐하고 막걸리 종류가 다양해요",
        mapImageUrl: "/images/maps/map-placeholder-5.png",
        diningDate: "2025-01-08",
    },
];

// 지도 이미지 없는 케이스
export const mockLateDiningsNoMap: LateDiningSummary[] = [
    {
        id: "late-dining-no-map-1",
        restaurantName: "동네 맛집",
        restaurantAddress: "서울시 강동구 천호대로 89",
        description: "숨은 맛집이에요",
        diningDate: "2025-01-17",
    },
    {
        id: "late-dining-no-map-2",
        restaurantName: "회사 근처 식당",
        restaurantAddress: "서울시 강남구 역삼로 12",
        diningDate: "2025-01-14",
    },
];

// 설명 없는 케이스
export const mockLateDiningsMinimal: LateDiningSummary[] = [
    {
        id: "late-dining-minimal-1",
        restaurantName: "간단한 점심",
        restaurantAddress: "서울시 송파구 올림픽로 300",
        diningDate: "2025-01-16",
    },
];

// 빈 케이스 - 최근 완료된 회식이 없는 경우
export const mockEmptyLateDiningSummaries: LateDiningSummary[] = [];
