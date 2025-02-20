import { useMutation, useQuery } from "@tanstack/react-query";
import { getAdminCoins, putAdminCoins } from "../apis/adminManagement/adminCoin";
import { TAdminCoins } from "../types/adminCoint";

function useGetCoinInfo() {
  return useQuery({
    queryKey: ["adminCoinsManagement"],
    queryFn: () => getAdminCoins(),
  });
}

function usePutAdminCoins() {
  return useMutation({
    mutationFn: (data: TAdminCoins[]) => putAdminCoins(data),
    mutationKey: ["editAdminSubsribe"],
  });
}

export { useGetCoinInfo, usePutAdminCoins };
