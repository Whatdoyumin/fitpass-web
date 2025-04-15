import { useQuery } from "@tanstack/react-query";
import { getOwnerDashboardNotices, getOwnerDashboardSettlements, getOwnerDashboardUsages } from "../apis/owner/dashboard";

// 공지사항 3개 불러오기
export const useGetOwnerDashboardNotices = () => {
  return useQuery({
    queryKey: ["ownerDashboardNotices"],
    queryFn: getOwnerDashboardNotices,
  });
};

// 이번달 정산 내역 불러오기
export const useGetOwnerDashboardSettlements = (fitnessId: string | null) => {
  return useQuery({
    queryKey: ["ownerDashboardSettlements", fitnessId],
    queryFn: () => getOwnerDashboardSettlements(fitnessId!),
    enabled: !!fitnessId,
  });
};

// 이용 내역 3개 불러오기
export const useGetOwnerDashboardUsages = (fitnessId: string | null) => {
  return useQuery({
    queryKey: ["ownerDashboardUsages", fitnessId],
    queryFn: () => getOwnerDashboardUsages(fitnessId!),
    enabled: !!fitnessId,
  });
};
