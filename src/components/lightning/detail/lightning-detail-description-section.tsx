import { SectionCard } from "@/src/components/ui/section-card";

interface LightningDetailDescriptionSectionProps {
  description: string;
}
export function LightningDetailDescriptionSection(
  { description }: LightningDetailDescriptionSectionProps
) {
  return (
    <section className="mt-5">
      <SectionCard className="space-y-2.5">
        <h2 className="text-sm font-semibold tracking-[0.01em] text-[#111111]">
          모임 설명
        </h2>
        <p className="whitespace-pre-line text-sm leading-6 text-[#374151]">
          {description}
        </p>
      </SectionCard>
    </section>
  );
}
