export function DetailInfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-[#f7f7fa] px-3 py-3">
      <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#fff1e4] text-[#ff8d28]">
        {icon}
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-xs font-medium text-[#8e8e93]">{label}</span>
        <span className="text-sm font-semibold leading-5 text-[#111111]">
          {value}
        </span>
      </div>
    </div>
  );
}