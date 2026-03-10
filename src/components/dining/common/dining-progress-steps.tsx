import { UserCheck, Lightbulb, Vote, Calendar } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { DiningStatus } from "@/src/types/api/dining";

const STEPS = [
  {
    icon: UserCheck,
    label: "참석 투표",
    description: "참석 여부를 투표해주세요",
  },
  {
    icon: Lightbulb,
    label: "장소 추천",
    description: "참석 투표 완료 후 진행",
  },
  {
    icon: Vote,
    label: "장소 투표",
    description: "장소 추천 완료 후 진행",
  },
  {
    icon: Calendar,
    label: "회식 확정",
    description: "장소 투표 완료 후 확정",
  },
] as const;

function getActiveStepIndex(diningStatus: DiningStatus): number {
  switch (diningStatus) {
    case "ATTENDANCE_VOTING":
      return 0;
    case "RECOMMENDATION_PENDING":
      return 1;
    case "RESTAURANT_VOTING":
      return 2;
    case "CONFIRMED":
    case "COMPLETE":
      return 3;
  }
}

interface DiningProgressStepsProps {
  diningStatus: DiningStatus;
}

export function DiningProgressSteps({ diningStatus }: DiningProgressStepsProps) {
  const activeIndex = getActiveStepIndex(diningStatus);

  return (
    <section className="w-full rounded-[20px] bg-white p-5">
      <h2 className="mb-4 text-lg font-bold leading-6 text-[#101828]">
        진행 단계
      </h2>
      <div className="flex flex-col gap-4">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === activeIndex;

          return (
            <div key={step.label} className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                  isActive ? "bg-[#ff8d28]" : "bg-[#e5e7eb]"
                )}
              >
                <div
                  className={cn(
                    "size-3 rounded-full",
                    isActive ? "bg-white" : "bg-[#9ca3af]"
                  )}
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Icon className="size-4 text-[#4a5565]" />
                  <p className="text-base font-semibold leading-6 text-[#101828]">
                    {step.label}
                  </p>
                </div>
                <p className="text-sm leading-5 text-[#4a5565]">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
