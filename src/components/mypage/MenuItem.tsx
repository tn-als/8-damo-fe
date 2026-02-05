import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface MenuItemProps {
  href: string;
  label: string;
}

export function MenuItem({ href, label }: MenuItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between border-b border-border px-5 py-5"
    >
      <span className="text-xl font-bold text-foreground">{label}</span>
      <ChevronRight className="size-6 text-muted-foreground" />
    </Link>
  );
}
