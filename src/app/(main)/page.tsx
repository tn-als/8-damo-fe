import {
    AdBannerSection,
    WeeklyDiningScheduleSection,
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
                <AdBannerSection/>
                <WeeklyDiningScheduleSection dinings={mockWeeklyDinings} />
                <WeeklyPopularRestaurantsSection /> 
            </main>
            <BottomNavigationBar />
        </>
    );
}
