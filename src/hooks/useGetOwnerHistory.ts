import { useQuery } from "@tanstack/react-query";
import { getMonthHistory, getUsageHistory } from "../apis/owner/history";

export const useGetMonthHistory = (fitnessId: string, page: number = 0, size: number = 10) => {
  return useQuery({
    queryKey: ["month-history", fitnessId, page, size],
    queryFn: () => getMonthHistory(fitnessId, page, size),
  });
};

export const useGetUsageHistory = (fitnessId: string, page: number = 0, size: number = 10) => {
  return useQuery({
    queryKey: ["usage-history", fitnessId, page, size],
    queryFn: () => getUsageHistory(fitnessId, page, size),
  });
};
