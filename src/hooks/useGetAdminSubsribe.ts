import { useMutation, useQuery } from "@tanstack/react-query";
import { getAdminSubsribe, putAdminSubsribe } from "../apis/adminManagement/adminSubscribe";
import { TAdminSubsribe } from "../types/adminSubsribe";

function useGetAdminSubsribe() {
  return useQuery({
    queryKey: ["adminSubscribeManagement"],
    queryFn: () => getAdminSubsribe(),
  });
}

function usePutAdminSubscribe() {
  return useMutation({
    mutationFn: (data: TAdminSubsribe[]) => putAdminSubsribe(data),
    mutationKey: ["editAdminSubsribe"],
  });
}

export { useGetAdminSubsribe, usePutAdminSubscribe };
