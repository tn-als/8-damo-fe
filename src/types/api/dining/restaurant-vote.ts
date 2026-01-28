// types/api/dining/restaurant-vote.ts

import { RestaurantVoteOption } from "./enums";

export interface RestaurantVoteResponse {
  recommendRestaurantsId: number;
  restaurantsName: string;
  reasoningDescription: string;
  restaurantVoteStatus: string;
  phoneNumber: string;
  latitude: string;
  longitude: string;
  likeCount: number;
  dislikeCount: number;
}

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface RestaurantVoteSummary {
  likeCount: number;
  dislikeCount: number;
  myVote: RestaurantVoteOption | null;
}
