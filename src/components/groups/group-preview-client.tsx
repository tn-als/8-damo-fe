"use client";

import { Header } from "@/src/components/layout";
import { GroupJoinPreviewPageContent } from "@/src/components/groups/group-join-preview-page-content";
import { useRouter } from "next/navigation";

export default function GroupPreviewClient({ groupId }: { groupId: string }) {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-4">
      <Header title="그룹 참여" onBack={() => router.push("/groups")} />
      <GroupJoinPreviewPageContent groupId={groupId} />
    </main>
  );
}
