// types/api/dining/restaurant-vote.ts

import { RestaurantVoteStatus } from "./enums";

export interface RestaurantVoteResponse {
  recommendRestaurantsId: number;
  restaurantsName: string;
  reasoningDescription: string;
  restaurantVoteStatus: RestaurantVoteStatus;
  phoneNumber: string;
  latitude: number;
  longitude: number;
  likeCount: number;
  dislikeCount: number;
}
