"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GroupDetailContent } from "@/src/components/groups/group-detail-content";
import type { DiningStatus } from "@/src/types/api/dining";

interface GroupDetailPageClientProps {
  groupId: string;
}

export default function GroupDetailPageClient({
  groupId,
}: GroupDetailPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [queryClient] = useState(() => new QueryClient());

  const status = useMemo(
    () =>
      (searchParams.get("status") ?? "ATTENDANCE_VOTING") as DiningStatus,
    [searchParams]
  );

  const handleStatusChange = (nextStatus: DiningStatus) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set("status", nextStatus);
    router.push(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GroupDetailContent
        groupId={groupId}
        status={status}
        onStatusChange={handleStatusChange}
      />
    </QueryClientProvider>
  );
}
