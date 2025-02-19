import { useQuery } from "@tanstack/react-query";
import { getAdminSubsribe } from "../apis/adminManagement/adminSubscribe";

function useGetAdminSubsribe() {
  return useQuery({
    queryKey: ["adminSubscribeManagement"],
    queryFn: () => getAdminSubsribe(),
  });
}

export { useGetAdminSubsribe };
