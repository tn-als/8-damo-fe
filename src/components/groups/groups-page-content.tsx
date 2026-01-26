'use client';
import { MyGroupHeader } from "./my-group-header";
import { MyGroupList } from "./my-group-list";
import { MyGroupActionsFAB } from "./my-group-actions-fab";
import { BottomNavigationBar } from "../layout";
import { GroupSummary } from "@/src/types/groups";

interface GroupsPageContentProps {
  groups: GroupSummary[];
}

export function GroupsPageContent({ groups }: GroupsPageContentProps) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-app-background">
      <MyGroupHeader />
      <MyGroupList groupSummaryList={groups} />
      <MyGroupActionsFAB />
      <BottomNavigationBar />
    </div>
  );
}