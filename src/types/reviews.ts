export interface ReviewSatisfaction {
  id: number;
  category: string;
}

export interface ReviewSummary {
  reviewId: number;
  diningId: number;
  groupName: string;
  restaurantName: string;
  starRating: number;
  satisfactions: ReviewSatisfaction[];
  createdAt: string;
}

export interface ReviewDetail extends ReviewSummary {
  content: string;
}
