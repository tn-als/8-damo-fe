"use client";

import { cn } from "@/src/lib/utils";

interface WeekDay {
    date: Date;
    dayLabel: string;
    dateLabel: number;
    hasDining: boolean;
}

interface WeeklyCalendarProps {
    weekDays: WeekDay[];
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
}

export function WeeklyCalendar({
    weekDays,
    selectedDate,
    onSelectDate,
}: WeeklyCalendarProps) {
    const isSameDay = (date1: Date, date2: Date) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const isToday = (date: Date) => {
        return isSameDay(date, new Date());
    };

    const getDayColor = (date: Date, isSelected: boolean) => {
        if (isSelected) return "text-primary-foreground";
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0) return "text-destructive"; // 일요일 - 빨간색
        if (dayOfWeek === 6) return "text-blue-500"; // 토요일 - 파란색
        return "text-muted-foreground";
    };

    const getDateColor = (date: Date, isSelected: boolean, isToday: boolean) => {
        if (isSelected) return "";
        if (isToday) return "text-primary";
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0) return "text-destructive"; // 일요일 - 빨간색
        if (dayOfWeek === 6) return "text-blue-500"; // 토요일 - 파란색
        return "";
    };

    return (
        <div className="flex justify-between gap-1">
            {weekDays.map((day) => {
                const selected = isSameDay(day.date, selectedDate);
                const today = isToday(day.date);

                return (
                    <button
                        key={day.date.toISOString()}
                        type="button"
                        onClick={() => onSelectDate(day.date)}
                        aria-label={`${day.date.getMonth() + 1}월 ${day.dateLabel}일 ${day.hasDining ? "(회식 있음)" : ""} ${selected ? "선택됨" : "선택"}`}
                        aria-pressed={selected}
                        className={cn(
                            "flex flex-1 flex-col items-center gap-1 rounded-lg py-2 transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            selected
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted"
                        )}
                    >
                        <span
                            className={cn(
                                "text-xs",
                                getDayColor(day.date, selected)
                            )}
                        >
                            {day.dayLabel}
                        </span>
                        <span
                            className={cn(
                                "text-sm font-medium",
                                getDateColor(day.date, selected, today)
                            )}
                        >
                            {day.dateLabel}
                        </span>
                        <div
                            aria-hidden="true"
                            className={cn(
                                "size-1.5 rounded-full",
                                day.hasDining
                                    ? selected
                                        ? "bg-primary-foreground"
                                        : "bg-primary"
                                    : "bg-transparent"
                            )}
                        />
                    </button>
                );
            })}
        </div>
    );
}

export type { WeekDay };
