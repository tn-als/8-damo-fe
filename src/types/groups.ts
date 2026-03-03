export interface GroupSummary {
    id: string;
    name: string;
    introduction?: string;
    imagePath?: string;
    diningCountPerMonth?: number;
}

export interface GroupSummaryPage {
  items: GroupSummary[];
  nextCursor: string | null;
}