import { cn } from "@/src/lib/utils";

interface DetailInfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

export function DetailInfoRow({
  icon,
  label,
  value,
  className,
}: DetailInfoRowProps) {
  return (
    <div
      className={cn(
        "flex min-h-[78px] items-start gap-3 rounded-2xl border border-[#ececf0] bg-white px-3.5 py-3 shadow-[0_3px_10px_rgba(17,17,17,0.03)]",
        className
      )}
    >
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#fff1e4] text-[#ff8d28] ring-1 ring-[#ffd9b3]">
        {icon}
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-[11px] font-semibold tracking-[0.02em] text-[#8e8e93]">
          {label}
        </span>
        <span className="mt-1 text-sm font-semibold leading-5 text-[#111111]">
          {value}
        </span>
      </div>
    </div>
  );
}
