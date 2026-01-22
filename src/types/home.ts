// 광고 배너
export interface AdBanner {
    id: string;
    imageUrl: string;
    title: string;
    linkUrl?: string;
}

// 주간 회식 일정
export interface WeeklyDining {
    id: string;
    date: string; // "2025-01-21" ISO 형식
    time: string; // "18:30"
    groupName: string;
    restaurantName: string;
}

// 최근 회식 요약
export interface LateDiningSummary {
    id: string;
    restaurantName: string;
    restaurantAddress: string;
    description?: string;
    mapImageUrl?: string;
    diningDate: string; // "2025-01-20" ISO 형식
}

// 네비게이션 아이템
export interface NavigationItem {
    id: string;
    label: string;
    href: string;
    disabled?: boolean;
}
