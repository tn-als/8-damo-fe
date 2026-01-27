"use client";

export type DiningEventPhase =
  | "ATTENDANCE_VOTING"
  | "RESTAURANT_VOTING"
  | "RESTAURANT_CONFIRMED"
  | "DINING_COMPLETED";

interface DiningEventSectionProps {
  phase: DiningEventPhase;
  children: React.ReactNode;
}

export function DiningEventSection({ phase, children }: DiningEventSectionProps) {
  return (
    <section
      data-phase={phase}
      className="flex w-full flex-col items-center"
    >
      {children}
    </section>
  );
}
