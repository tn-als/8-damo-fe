import type { WeeklyDining } from "@/src/types/home";

// 현재 주의 날짜들을 동적으로 생성하는 헬퍼 함수
function getThisWeekDate(dayOffset: number): string {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

    const targetDate = new Date(monday);
    targetDate.setDate(monday.getDate() + dayOffset);

    return targetDate.toISOString().split("T")[0];
}

// 정상 케이스 - 이번 주에 여러 회식이 있는 경우
export const mockWeeklyDinings: WeeklyDining[] = [
    {
        id: "dining-1",
        date: getThisWeekDate(0), // 월요일
        time: "18:30",
        groupName: "개발팀",
        restaurantName: "맛있는 삼겹살",
    },
    {
        id: "dining-2",
        date: getThisWeekDate(0), // 월요일 (같은 날 다른 회식)
        time: "19:00",
        groupName: "디자인팀",
        restaurantName: "분위기 좋은 이탈리안",
    },
    {
        id: "dining-3",
        date: getThisWeekDate(2), // 수요일
        time: "18:00",
        groupName: "전체 회식",
        restaurantName: "프리미엄 한정식",
    },
    {
        id: "dining-4",
        date: getThisWeekDate(4), // 금요일
        time: "19:30",
        groupName: "마케팅팀",
        restaurantName: "루프탑 바베큐",
    },
];

// 오늘만 회식이 있는 케이스
export const mockTodayOnlyDining: WeeklyDining[] = [
    {
        id: "dining-today",
        date: new Date().toISOString().split("T")[0],
        time: "18:30",
        groupName: "개발팀",
        restaurantName: "오늘의 회식 장소",
    },
];

// 빈 케이스 - 이번 주 회식이 없는 경우
export const mockEmptyWeeklyDinings: WeeklyDining[] = [];
