import { type DiningStatus } from "@/src/types/api/dining";

interface DiningEventSectionProps {
  phase: DiningStatus;
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
