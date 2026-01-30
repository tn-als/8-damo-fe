import { useQuery } from "@tanstack/react-query";
import { diningApi } from "@/src/lib/api/dining";
import type {
  DiningStatus,
  RestaurantVoteResponse,
  AttendanceVoteResponse,
  ConfirmedRestaurantResponse,
} from "@/src/types/api/dining";

export const diningKeys = {
  all: ["dining"] as const,
  summaries: (groupId: string, status: DiningStatus) =>
    [...diningKeys.all, "summaries", groupId, status] as const,
  detail: (groupId: string, diningId: string) =>
    [...diningKeys.all, "detail", groupId, diningId] as const,
  common: (groupId: string, diningId: string) =>
    [...diningKeys.detail(groupId, diningId), "common"] as const,
  restaurantVote: (groupId: string, diningId: string) =>
    [...diningKeys.detail(groupId, diningId), "restaurant-vote"] as const,
  attendanceVote: (groupId: string, diningId: string) =>
    [...diningKeys.detail(groupId, diningId), "attendance-vote"] as const,
  confirmed: (groupId: string, diningId: string) =>
    [...diningKeys.detail(groupId, diningId), "confirmed"] as const,
};

export function useDiningSummaries(groupId: string, status: DiningStatus) {
  return useQuery({
    queryKey: diningKeys.summaries(groupId, status),
    queryFn: () => diningApi.getGroupDiningSummaries(groupId, status),
  });
}

export function useDiningCommon(groupId: string, diningId: string) {
  return useQuery({
    queryKey: diningKeys.common(groupId, diningId),
    queryFn: () => diningApi.getDiningCommon(groupId, diningId),
  });
}

export function useDiningRestaurantVote(
  groupId: string,
  diningId: string,
  options?: { enabled?: boolean }
) {
  return useQuery<RestaurantVoteResponse[], Error>({
    queryKey: diningKeys.restaurantVote(groupId, diningId),
    queryFn: () => diningApi.getDiningRestaurantVote(groupId, diningId),
    ...options,
  });
}

export function useDiningAttendanceVote(
  groupId: string,
  diningId: string,
  options?: { enabled?: boolean }
) {
  return useQuery<AttendanceVoteResponse, Error>({
    queryKey: diningKeys.attendanceVote(groupId, diningId),
    queryFn: () => diningApi.getDiningAttendanceVote(groupId, diningId),
    ...options,
  });
}

export function useDiningConfirmed(
  groupId: string,
  diningId: string,
  options?: { enabled?: boolean }
) {
  return useQuery<ConfirmedRestaurantResponse, Error>({
    queryKey: diningKeys.confirmed(groupId, diningId),
    queryFn: () => diningApi.getDiningConfirmed(groupId, diningId),
    ...options,
  });
}
