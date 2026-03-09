import { SectionCard } from "../../ui/section-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface AnalyzingPanelProps {
  previewUrl: string;
  imageAlt?: string;
  title?: string;
  description?: string;
}

export function AnalyzingPanel({
  previewUrl,
  imageAlt = "분석 중인 영수증",
  title = "영수증 검증 중...",
  description = "AI가 영수증을 분석하고 있습니다",
}: AnalyzingPanelProps) {
  return (
    <>
      <SectionCard tone="muted" className="rounded-2xl bg-[#f2f2f7] p-4 shadow-none">
        <Image
          src={previewUrl}
          alt={imageAlt}
          width={640}
          height={380}
          unoptimized
          className="h-[190px] w-full rounded-xl object-cover"
        />
      </SectionCard>

      <SectionCard tone="muted" className="rounded-2xl bg-[#f2f2f7] p-8 shadow-none">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-10 animate-spin text-[#ff8d28]" />
          <p className="text-[28px] font-bold tracking-[-0.02em] text-[#111111]">
            {title}
          </p>
          <p className="text-sm text-[#8e8e93]">{description}</p>
        </div>
      </SectionCard>
    </>
  );
}
