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
            <main className="flex flex-col gap-6 px-4 pt-4 pb-20 sm:pt-4">
                {/* 광고 배너 섹션 */}
                <AdBannerSection/>

                {/* 이번 주 회식 일정 섹션 */}
                <WeeklyDiningScheduleSection dinings={mockWeeklyDinings} />

                {/* 이번주 인기 식당 섹션 */}
                <section>
                    <h2 className="mb-4 text-lg font-bold">이번 주 인기 식당</h2>
                    <WeeklyPopularRestaurantsSection />
                </section>

            </main>
            <BottomNavigationBar />
        </>
    );
}
