import {
    HomeHeader,
    AdBannerSection,
    WeeklyDiningScheduleSection,
    LateDiningSummarySection,
} from "@/src/components/home";
import {
    mockAdBanner,
    mockWeeklyDinings,
    mockLateDiningSummaries,
} from "@/src/constants/mock-data";

export default function HomePage() {
    return (
        <>
            <HomeHeader appName="다모"/>

            <main className="flex flex-col gap-6 px-4 pt-14 pb-20 sm:pt-16">
                {/* 광고 배너 섹션 */}
                <AdBannerSection banner={mockAdBanner} />

                {/* 이번 주 회식 일정 섹션 */}
                <WeeklyDiningScheduleSection dinings={mockWeeklyDinings} />

                {/* 최근 회식 요약 섹션 */}
                <LateDiningSummarySection dinings={mockLateDiningSummaries} />
            </main>
        </>
    );
}
