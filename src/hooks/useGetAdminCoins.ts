import { useMutation, useQuery } from "@tanstack/react-query";
import { getAdminCoins, putAdminCoins } from "../apis/adminManagement/adminCoint";
import { TAdminCoins } from "../types/adminCoint";

function useGetAdminCoins() {
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

export { useGetAdminCoins, usePutAdminCoins };
