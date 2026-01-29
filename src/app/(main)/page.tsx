import {
    AdBannerSection,
    WeeklyDiningScheduleSection,
    LateDiningSummarySection,
    WeeklyPopularRestaurantsSection,
} from "@/src/components/home";
import { BottomNavigationBar } from "@/src/components/layout";
import {
    mockAdBanner,
    mockWeeklyDinings,
    mockLateDiningSummaries,
} from "@/src/constants/mock-data";

export default function HomePage() {
    return (
        <>
            <main className="flex min-h-screen flex-col items-center gap-6 px-4 py-8 pb-24">
                {/* 광고 배너 섹션 */}
                <AdBannerSection/>

                {/* 이번 주 회식 일정 섹션 */}
                <WeeklyDiningScheduleSection dinings={mockWeeklyDinings} />

                {/* 이번주 인기 식당 섹션 */}
                <WeeklyPopularRestaurantsSection />

            </main>
            <BottomNavigationBar />
        </>
    );
}
