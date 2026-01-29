"use client";

import { useMemo, useState } from "react";
import { cn } from "@/src/lib/utils";
import type { WeeklyDining } from "@/src/types/home";
import { WeeklyCalendar, type WeekDay } from "./weekly-calendar";
import { DiningScheduleCard } from "./dining-schedule-card";

interface WeeklyDiningScheduleSectionProps {
    dinings: WeeklyDining[];
    className?: string;
}

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

function getWeekDays(dinings: WeeklyDining[]): WeekDay[] {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));

    const diningDates = new Set(dinings.map((d) => d.date));

    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);

        const dateStr = date.toISOString().split("T")[0];

        return {
            date,
            dayLabel: DAY_LABELS[date.getDay()],
            dateLabel: date.getDate(),
            hasDining: diningDates.has(dateStr),
        };
    });
}

function formatDateToString(date: Date): string {
    return date.toISOString().split("T")[0];
}

export function WeeklyDiningScheduleSection({
    dinings,
    className,
}: WeeklyDiningScheduleSectionProps) {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const weekDays = useMemo(() => getWeekDays(dinings), [dinings]);

    const selectedDinings = useMemo(() => {
        const dateStr = formatDateToString(selectedDate);
        return dinings.filter((d) => d.date === dateStr);
    }, [dinings, selectedDate]);

    const hasAnyDining = dinings.length > 0;

    return (
        <section className={cn("w-full max-w-[430px] flex flex-col gap-4", className)}>
            <h2 className="text-lg font-bold">이번 주 회식</h2>

            <WeeklyCalendar
                weekDays={weekDays}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
            />

            <div className="flex flex-col gap-2">
                {hasAnyDining ? (
                    selectedDinings.length > 0 ? (
                        selectedDinings.map((dining) => (
                            <DiningScheduleCard
                                key={dining.id}
                                dining={dining}
                            />
                        ))
                    ) : (
                        <p className="py-4 text-center text-sm text-muted-foreground">
                            선택한 날짜에 예정된 회식이 없습니다
                        </p>
                    )
                ) : (
                    <p className="py-4 text-center text-sm text-muted-foreground">
                        이번 주 예정된 회식이 없습니다
                    </p>
                )}
            </div>
        </section>
    );
}
